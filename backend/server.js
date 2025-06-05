const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser')
const SibApiV3Sdk = require("sib-api-v3-sdk");
require('dotenv').config()
const bcrypt = require("bcrypt");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://uncharted-trails.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy does not allow this origin"), false); // Block the request
    }
  },
  credentials: true
}));


const db = mysql.createConnection({
    host: `${process.env.DB_host}`,
    user: `${process.env.DB_user}`,
    password: `${process.env.DB_password}`,
    database: 'uncharted_trails', 
    port: `${process.env.DB_port}`,
});

db.connect(err => {
    if (err) console.log(err);
    else
    console.log("Database Connected");
});

app.get("/", (req, res) => {
  res.send("Welcome to Uncharted Trails Backend!");
});

app.post('/api/log-in', async (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT `email_id`, `password` FROM login_signup WHERE `email_id` = ?";
    try {
        const [data] = await db.promise().query(sql, [email]);
  
        if (data.length === 0) return res.json("Fail");
  
        const isMatch = await bcrypt.compare(password, data[0].password);
        if (!isMatch) return res.json("Fail");
  
        res.json("success");
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Database Error");
    }
});  

const generateUniqueCode = async () => {
    let isUnique = false;
    let verificationCode;

    while (!isUnique) {
        verificationCode = Math.floor(100000 + Math.random() * 900000);

        const [existingCode] = await db.promise().query(
            "SELECT verification_code FROM verification_table WHERE verification_code = ?",
            [verificationCode]
        );

        if (existingCode.length === 0) {
            isUnique = true;
        }
    }
    return verificationCode;
};

const sendEmail = async (toEmail, subject, message) => {
    try {
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = `${process.env.BREVO_API_KEY}`;

        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        sendSmtpEmail.sender = { name: "Uncharted Trails", email: `${process.env.sendSmtpEmail_sender}` };
        sendSmtpEmail.to = [{ email: toEmail }];
        sendSmtpEmail.subject = subject;
        sendSmtpEmail.textContent = message;

        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
        return response;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

app.post("/api/sign-up", async (req, res) => {
    const { username, email, phone_number, password } = req.body;
    const checkData = "SELECT `email_id` FROM login_signup WHERE `email_id` = ?";
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    try {
        const [data] = await db.promise().query(checkData, [email]);
        if (data.length > 0) {
            return res.status(400).json("Email Already Exists");
        }

        const hashedPassword = await bcrypt.hash(password, process.env.Bcrypt_salt);

        const verificationCode = await generateUniqueCode();

        const emailSent = await sendEmail(email, "Your Verification Code", `Your verification code is: ${verificationCode}`);
        if (!emailSent) {
            return res.status(500).json("Failed to send verification email");
        }

        // Insert into the 'verification_table'
        const verifySql = `
            INSERT INTO verification_table (email_id, verification_code, time_stamp)
            VALUES (?, ?, ?)
        `;
        await db.promise().query(verifySql, [email, verificationCode, currentDate]);

        // Insert into the 'login_signup' table
        const loginSignupSql = `
            INSERT INTO login_signup (email_id, password, username, phone_number, time_stamp)
            VALUES (?, ?, ?, ?, ?)
        `;
        await db.promise().query(loginSignupSql, [email, hashedPassword, username, phone_number, currentDate]);

        // Insert into the 'users' table
        const usersSql = `
            INSERT INTO users (username, email_id, phone_number, created_at)
            VALUES (?, ?, ?, ?)
        `;
        await db.promise().query(usersSql, [username, email, phone_number, currentDate]);

        res.json("Verification email sent. Please verify your email.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.post('/api/sign-up-confirmation', async (req, res) => {
    try {
        const { verificationCode, email } = req.body;
        const values = [verificationCode, email];
        
        const sql = "SELECT `verification_code`, `email_id` FROM verification_table WHERE `verification_code` = ? AND `email_id` = ?";
        
        db.query(sql, values, async (err, data) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (data.length > 0) {
                const delCodeSql = "DELETE FROM verification_table WHERE `verification_code` = ? AND `email_id` = ?";
                
                try {
                    await db.promise().query(delCodeSql, values);
                    return res.json("success");
                } catch (deleteErr) {
                    console.error("Error deleting verification code");
                    return res.status(500).json({ message: "Failed to delete verification code" });
                }
            } else {
                return res.send("No matching verification code found");
            }
        });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

app.post('/api/sign-up-code-resend', async (req, res) => {
    
    const { email } = req.body;

    // Generate a new verification code
    const newVerificationCode = await generateUniqueCode();
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    const sql = "UPDATE verification_table SET `verification_code` = ?, `time_stamp` = ? WHERE `email_id` = ?";

    try {
        // Update the verification code in the database
        const [result] = await db.promise().query(sql, [newVerificationCode, currentDate, email]);

        if (result.affectedRows === 0) {
            return res.status(404).json("Email not found");
        }

        // Send the new verification code via email
        const emailSent = await sendEmail(email, "Your New Verification Code", `Your new verification code is: ${newVerificationCode}`);

        if (!emailSent) {
            return res.status(500).json("Failed to send verification email");
        }

        res.send("success");
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
});

app.get("/api/user/:email", (req, res) => {
    const email = req.params.email;
    db.query("SELECT * FROM users WHERE email_id = ?", [email], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.length === 0) return res.status(404).json({ message: "User not found" });
      res.json(result[0]);
    });
});
  
app.post("/api/update-user", (req, res) => {
  const { username, email_id, phone_number, home_airport, street_address, city, postal_code, region, country } = req.body;

  const query = `
    INSERT INTO users (username, email_id, phone_number, home_airport, street_address, city, postal_code, region, country)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
    username = VALUES(username), 
    phone_number = VALUES(phone_number), 
    home_airport = VALUES(home_airport), 
    street_address = VALUES(street_address), 
    city = VALUES(city), 
    postal_code = VALUES(postal_code), 
    region = VALUES(region), 
    country = VALUES(country)
  `;

  db.query(query, [username, email_id, phone_number, home_airport, street_address, city, postal_code, region, country], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User information updated successfully!" });
  });
});

app.post('/api/news-letter',async (req,res)=>{
    const email_id = req.body.email_id
    const sql = "INSERT INTO news_letter (email_id) VALUES (?)";

    try {
        await db.promise().query(sql,[email_id])
        res.status(200).send("success")
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get("/api/travel-data", async (req, res) => {
    try {
        const sql = `SELECT miles, cities, world, countries FROM travel_data WHERE email="abc@gmail.com"`;
        db.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Database error" });
            }
            if (result.length === 0) {
                return res.status(404).json({ error: "No data found" });
            }
            res.json(result[0]);
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/api/booking", (req, res) => {
    const {
      fullName,
      email,
      phone,
      destination,
      travelers,
      startDate,
      endDate,
      specialRequests,
      price,
      bookingData,
    } = req.body;
  
    if (!email || !fullName || !destination || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required fields." });
    }
  
    const sql = `INSERT INTO booking 
      (fullName, email_id, phone, destination, travelers, startDate, endDate, specialRequests, price, bookingDate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    db.query(
      sql,
      [
        fullName,
        email,
        phone,
        destination,
        travelers,
        startDate,
        endDate,
        specialRequests,
        price,
        new Date(bookingData),
      ],
      (err, result) => {
        if (err) {
          console.error("Insert error:", err);
          return res.status(500).json({ message: "Booking failed. Try again." });
        }
  
        res.status(201).json({ message: "Booking successful", id: result.insertId });
      }
    );
});

app.get('/api/get-bookings/:userEmail', async (req, res) => {
    const email = req.params.userEmail;
    
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
  
    const sql = `SELECT booking_id, destination AS location, bookingDate AS orderDate, travelers, startDate, endDate, price AS cost
                 FROM booking
                 WHERE email_id = ?`;
  
    try {
      const [results] = await db.promise().query(sql, [email]);
  

      const bookings = results.map(b => {
        const endDate = new Date(b.endDate);
        const today = new Date();
      
        return {
          booking_id: b.booking_id,
          location: b.location,
          orderDate: new Date(b.orderDate).toLocaleDateString(),
          travellers: b.travelers.toString(),
          stayDates: `${new Date(b.startDate).toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
          cost: `$${b.cost}`,
          status: today <= endDate ? "In Progress" : "Completed",
        };
      });
  
      res.status(200).json(bookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      res.status(500).json({ message: "Internal server error" });
    }
});

app.delete("/api/delete-booking/:bookingId&email_id=:email", (req, res) => {
    const bookingId = req.params.bookingId;
    const email = req.params.email;
  
    const query = "DELETE FROM booking WHERE booking_id = ? AND email_id = ?";
    db.query(query, [bookingId, email], (err, result) => {
      if (err) {
        console.error("Error deleting booking:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      res.status(200).json({ message: "Booking deleted successfully" });
    });
});

if (process.env.NODE_ENV !== "production") {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;