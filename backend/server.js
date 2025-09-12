const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const SibApiV3Sdk = require("sib-api-v3-sdk");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

require('dotenv').config();

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
            callback(new Error("CORS policy does not allow this origin"), false);
        }
    },
    credentials: true
}));

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_host,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: 'uncharted_trails',
    port: process.env.DB_port,
    waitForConnections: true,
    queueLimit: 0,
    idleTimeout: 30000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function initializeDatabase() {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.query('SELECT 1 + 1 AS solution');
        console.log("Aiven MySQL Pool: Successfully connected and tested.");
    } catch (error) {
        console.error('Aiven MySQL Pool: Initial connection test failed!');
        console.error('Details:', error);
        process.exit(1);
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

initializeDatabase();

const generateToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: "Authentication token required." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token." });
        }
        req.user = user;
        next();
    });
};

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'user-profiles',
        format: async (req, file) => 'jpg',
        public_id: (req, file) => {
            const sanitizedEmail = req.user.email.replace(/[^a-zA-Z0-9]/g, '_');
            return `${sanitizedEmail}_profile_picture`;
        },
    },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
    res.send("Welcome to Uncharted Trails Backend!");
});

app.post('/api/log-in', async (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT `email_id`, `password` FROM login_signup WHERE `email_id` = ? AND `isVerified`=1";
    try {
        const [data] = await pool.query(sql, [email]);
        if (data.length === 0) {
            return res.status(401).json({ message: "User not found or not verified." });
        }
        const isMatch = await bcrypt.compare(password, data[0].password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        const token = generateToken(data[0].email_id);
        return res.status(200).json({ message: "Login Successful", userEmail: data[0].email_id, token });
    } catch (error) {
        console.error("Database Error during login:", error);
        res.status(500).json({ message: "An unexpected server error occurred. Please try again later." });
    }
});

const generateUniqueCode = async () => {
    let isUnique = false;
    let verificationCode;
    while (!isUnique) {
        verificationCode = Math.floor(100000 + Math.random() * 900000);
        try {
            const [existingCode] = await pool.query(
                "SELECT verification_code FROM verification_table WHERE verification_code = ?",
                [verificationCode]
            );
            if (existingCode.length === 0) {
                isUnique = true;
            }
        } catch (error) {
            console.error("Error checking unique code:", error);
            throw new Error("Failed to generate unique code due to database error.");
        }
    }
    return verificationCode;
};

const sendEmail = async (toEmail, subject, message) => {
    try {
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.BREVO_API_KEY;
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.sender = { name: "Uncharted Trails", email: process.env.sendSmtpEmail_sender };
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
    const checkData = "SELECT `email_id`, `isVerified` FROM login_signup WHERE `email_id` = ?";
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [data] = await connection.query(checkData, [email]);
        if (data.length > 0) {
            const existingUser = data[0];
            if (existingUser.isVerified === 0) {
                await connection.rollback();
                return res.status(409).json({ message: "Email already exists but is unverified. Please verify your email or try logging in." });
            } else {
                await connection.rollback();
                return res.status(409).json({ message: "An account with this email already exists." });
            }
        }
        const saltVal = parseInt(process.env.Bcrypt_salt, 10);
        const hashedPassword = await bcrypt.hash(password, saltVal);
        const verificationCode = await generateUniqueCode();
        const emailSentResponse = await sendEmail(email, "Your Verification Code", `Your verification code is: ${verificationCode}`);
        if (!emailSentResponse || emailSentResponse.messageId === undefined) {
            await connection.rollback();
            return res.status(500).json({ message: "Failed to send verification email. Please try again." });
        }
        const verifySql = `
            INSERT INTO verification_table (email_id, verification_code, time_stamp)
            VALUES (?, ?, ?)
        `;
        await connection.query(verifySql, [email, verificationCode, currentDate]);
        const loginSignupSql = `
            INSERT INTO login_signup (email_id, password, username, phone_number, time_stamp, isVerified)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await connection.query(loginSignupSql, [email, hashedPassword, username, phone_number, currentDate, 0]);
        const usersSql = `
            INSERT INTO users (username, email_id, phone_number, created_at)
            VALUES (?, ?, ?, ?)
        `;
        await connection.query(usersSql, [username, email, phone_number, currentDate]);
        await connection.commit();
        res.status(200).json({ message: "Verification email sent. Please verify your email." });
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        console.error("Sign-up Error:", error);
        if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
            return res.status(409).json({ message: "A user with this username or phone number may already exist." });
        }
        res.status(500).json({ message: "An unexpected server error occurred. Please try again later." });
    } finally {
        if (connection) {
            connection.release();
        }
    }
});

app.post('/api/sign-up-confirmation', async (req, res) => {
    const { verificationCode, email } = req.body;
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const sql = "SELECT `verification_code`, `email_id` FROM verification_table WHERE `verification_code` = ? AND `email_id` = ?";
        const [data] = await connection.query(sql, [verificationCode, email]);
        if (data.length > 0) {
            const delCodeSql = "DELETE FROM verification_table WHERE `verification_code` = ? AND `email_id` = ?";
            const setSql = "UPDATE login_signup SET isVerified=1 WHERE `email_id`=? ";
            await connection.query(setSql, [email]);
            await connection.query(delCodeSql, [verificationCode, email]);
            await connection.commit();
            const token = generateToken(email);
            return res.status(200).json({ message: "Verification successful.", userEmail: email, token });
        } else {
            await connection.rollback();
            return res.status(400).json({ message: "Invalid verification code or email." });
        }
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        console.error("Sign-up Confirmation Error:", error);
        return res.status(500).json({ message: "An unexpected server error occurred during verification." });
    } finally {
        if (connection) {
            connection.release();
        }
    }
});

app.post('/api/sign-up-code-resend', async (req, res) => {
    const { email } = req.body;
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [userCheck] = await connection.query("SELECT isVerified FROM login_signup WHERE email_id = ?", [email]);
        if (userCheck.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: "Email not found for resend." });
        }
        if (userCheck[0].isVerified === 1) {
            await connection.rollback();
            return res.status(400).json({ message: "Email is already verified." });
        }
        const newVerificationCode = await generateUniqueCode();
        const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
        const sql = "UPDATE verification_table SET `verification_code` = ?, `time_stamp` = ? WHERE `email_id` = ?";
        const [result] = await connection.query(sql, [newVerificationCode, currentDate, email]);
        if (result.affectedRows === 0) {
            await connection.rollback();
            return res.status(404).json({ message: "Verification entry not found for this email." });
        }
        const emailSent = await sendEmail(email, "Your New Verification Code", `Your new verification code is: ${newVerificationCode}`);
        if (!emailSent || emailSent.messageId === undefined) {
            await connection.rollback();
            return res.status(500).json({ message: "Failed to send new verification email." });
        }
        await connection.commit();
        res.status(200).json({ message: "New verification code sent successfully." });
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        console.error("Resend Code Error:", error);
        res.status(500).json({ message: "An unexpected server error occurred during code resend." });
    } finally {
        if (connection) {
            connection.release();
        }
    }
});

app.get("/api/user/:email", authenticateToken, async (req, res) => {
    const email = req.params.email;
    if (req.user.email !== email) {
        return res.status(403).json({ message: "Unauthorized: You can only access your own user data." });
    }
    try {
        const [result] = await pool.query("SELECT * FROM users WHERE email_id = ?", [email]);
        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(result[0]);
    } catch (err) {
        console.error("Error fetching user data:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/api/update-user", authenticateToken, async (req, res) => {
    const { username, email_id, phone_number, home_airport, street_address, city, postal_code, region, country } = req.body;
    if (req.user.email !== email_id) {
        return res.status(403).json({ message: "Unauthorized: You can only update your own user data." });
    }
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
    try {
        await pool.query(query, [username, email_id, phone_number, home_airport, street_address, city, postal_code, region, country]);
        res.status(200).json({ message: "User information updated successfully!" });
    } catch (err) {
        console.error("Error updating user info:", err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/news-letter', async (req, res) => {
    const email_id = req.body.email_id;
    const sql = "INSERT INTO news_letter (email_id) VALUES (?)";
    try {
        await pool.query(sql, [email_id]);
        res.status(200).send("success");
    } catch (error) {
        console.error("Error subscribing to newsletter:", error);
        if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
            return res.status(409).json({ message: "This email is already subscribed to the newsletter." });
        }
        res.status(500).json({ message: "Failed to subscribe to newsletter." });
    }
});

app.get("/api/travel-data", authenticateToken, async (req, res) => {
    const userEmail = req.user.email;
    try {
        const sql = `SELECT miles, cities, world, countries FROM travel_data WHERE email_id = ?`;
        const [result] = await pool.query(sql, [userEmail]);
        if (result.length === 0) {
            return res.status(404).json({ error: "No travel data found for this user." });
        }
        res.json(result[0]);
    } catch (error) {
        console.error("Error fetching travel data:", error);
        res.status(500).json({ error: "Server error fetching travel data." });
    }
});

app.post("/api/booking", authenticateToken, async (req, res) => {
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
        bookingDate,
    } = req.body;
    if (req.user.email !== email) {
        return res.status(403).json({ message: "Unauthorized: Booking email does not match authenticated user." });
    }
    if (!email || !fullName || !destination || !startDate || !endDate) {
        return res.status(400).json({ message: "Missing required fields." });
    }
    const sql = `INSERT INTO booking
        (fullName, email_id, phone, destination, travelers, startDate, endDate, specialRequests, price, bookingDate)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    try {
        const [result] = await pool.query(
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
                new Date(bookingDate),
            ]
        );
        res.status(201).json({ message: "Booking successful", id: result.insertId });
    } catch (err) {
        console.error("Booking insert error:", err);
        res.status(500).json({ message: "Booking failed. Please try again." });
    }
});

app.get('/api/get-bookings/:userEmail', authenticateToken, async (req, res) => {
    const email = req.params.userEmail;
    if (req.user.email !== email) {
        return res.status(403).json({ message: "Unauthorized: You can only access your own bookings." });
    }
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    const sql = `SELECT booking_id, destination AS location, bookingDate AS orderDate, travelers, startDate, endDate, price AS cost
                      FROM booking
                      WHERE email_id = ?`;
    try {
        const [results] = await pool.query(sql, [email]);
        const bookings = results.map(b => {
            const endDate = new Date(b.endDate);
            const today = new Date();
            return {
                booking_id: b.booking_id,
                location: b.location,
                orderDate: new Date(b.orderDate).toLocaleDateString(),
                travelers: b.travelers.toString(),
                stayDates: `${new Date(b.startDate).toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
                cost: `$${b.cost}`,
                status: today <= endDate ? "In Progress" : "Completed",
            };
        });
        res.status(200).json(bookings);
    } catch (err) {
        console.error("Error fetching bookings:", err);
        res.status(500).json({ message: "Internal server error fetching bookings." });
    }
});

app.delete("/api/delete-booking/:bookingId&email_id=:email", authenticateToken, async (req, res) => {
    const bookingId = req.params.bookingId;
    const email = req.params.email;
    if (req.user.email !== email) {
        return res.status(403).json({ message: "Unauthorized: You can only delete your own bookings." });
    }
    const query = "DELETE FROM booking WHERE booking_id = ? AND email_id = ?";
    try {
        const [result] = await pool.query(query, [bookingId, email]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Booking not found or you don't have permission to delete it." });
        }
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error deleting booking." });
    }
});

app.post('/api/reset-password-otp', async (req, res) => {
    const email = req.body.email;
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const checkUserExistQuery = "SELECT `email_id` FROM login_signup WHERE `email_id` = ?";
        const [userData] = await connection.query(checkUserExistQuery, [email]);
        if (userData.length === 0) {
            await connection.commit();
            return res.status(404).send({ message: "No user exists with this email." });
        }
        const checkExistingCodeQuery = "SELECT `email_id` FROM reset_table WHERE email_id = ? ";
        const [existingCodeData] = await connection.query(checkExistingCodeQuery, [email]);
        if (existingCodeData.length > 0) {
            await connection.rollback();
            return res.status(409).send({
                message: "A password reset code has already been sent to this email. Please check your inbox and try again."
            });
        }
        const resetCode = await generateUniqueCode();
        const emailSent = await sendEmail(email, "Password Reset Code", `Your reset code is: ${resetCode}`);
        if (emailSent) {
            const saveCodeQuery = "INSERT INTO reset_table(email_id, code) VALUES(?, ?)";
            await connection.query(saveCodeQuery, [email, resetCode]);
            await connection.commit();
            return res.status(200).send({ message: "Code sent successfully. Check your email." });
        } else {
            await connection.rollback();
            return res.status(500).send({ message: "There was an error while sending the code. Please try again." });
        }
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        console.error("Error in /api/reset-password-otp:", error);
        if (error.errno === 1062) {
            return res.status(409).send({ message: "A code was recently sent. Please check your email or wait before requesting a new one." });
        }
        return res.status(500).send({ message: "Server error. Try again later." });
    } finally {
        if (connection) {
            connection.release();
        }
    }
});

app.post('/api/verify-reset-password-otp', async(req,res)=>{
    const {email,otp} = req.body
    const verifyResetOtp = " SELECT `email_id`, `code` from reset_table where `email_id`=? and `code`=?"
    let connection;
    try {
        connection = await pool.getConnection()
        connection.beginTransaction()
        const [otpData] = await connection.query(verifyResetOtp,[email,otp])
        if(otpData.length>0){
            const deleteCode = "Delete from reset_table where `email_id`=?"
            await connection.query(deleteCode,email)
            connection.commit()
            return res.status(200).send({message:"Sucessfull"})
        }
        else{
            connection.rollback()
            return res.status(404).send({message:"Veification code is incorrect. Try again."})
        }
    } catch (error) {
        return res.status(500).send({message:"Sever error. Please try again later."})
    }
})

app.post('/api/reset-password', async(req,res)=>{
    const {email,newPassword} = req.body
    const updatepassword = "UPDATE login_signup set `password` = ? where `email_id`=?"
    let connection;
    try {
        connection = await pool.getConnection()
        connection.beginTransaction()
        const saltVal = parseInt(process.env.Bcrypt_salt, 10);
        const hashedPassword = await bcrypt.hash(newPassword, saltVal);
        await connection.query(updatepassword,[hashedPassword,email])
        connection.commit()
        res.status(200).send({message:"Password Reset successful"})
    } catch (error) {
        console.log(error)
        connection.rollback()
        res.status(500).send({message:"Server error occured. Please try again."})
    }
})

app.post('/api/upload-image', authenticateToken, upload.single('image'), async (req, res) => {
    const userEmail = req.user.email;
    const imageUrl = req.file.path;
    if (!imageUrl) {
        return res.status(400).json({ error: 'Image file not provided.' });
    }
    const query = 'INSERT INTO user_Images (email_id, image) VALUES (?, ?) ON DUPLICATE KEY UPDATE image = VALUES(image)';
    try {
        await pool.query(query, [userEmail, imageUrl]);
        res.status(200).json({ message: 'Image uploaded and path saved successfully!', imageUrl });
    } catch (err) {
        console.error('Error saving image path to database:', err);
        res.status(500).json({ error: 'Failed to upload image.' });
    }
});

app.get("/api/get-image/:email", authenticateToken, async (req, res) => {
    const userEmail = req.params.email;
    if (req.user.email !== userEmail) {
        return res.status(403).json({ message: "Unauthorized: You can only access your own data." });
    }
    try {
        const [result] = await pool.query("SELECT image FROM user_Images WHERE email_id = ?", [userEmail]);
        if (result.length === 0 || !result[0].image) {
            return res.status(404).json({ message: "Image not found for this user." });
        }
        res.json({ imageUrl: result[0].image });
    } catch (err) {
        console.error("Error fetching image path:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

if (process.env.NODE_ENV !== "production") {
    const PORT = 5000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;