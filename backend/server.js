const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser')
const SibApiV3Sdk = require("sib-api-v3-sdk");
require('dotenv').config()

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_password,
    database: 'uncharted_trails'
});

db.connect(err => {
    if (err) throw err;
    console.log("Database Connected");
});


app.post('/log-in', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT `email_id`, `password` FROM login_signup WHERE `email_id` = ? AND `password` = ?";
    const values = [email, password];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Database Error");
        }
        if (data.length > 0) {
            return res.json("success");
        } else {
            return res.json("Fail");
        }
    });    
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

app.post('/sign-up', async (req, res) => {
    const { username, email, password } = req.body;
    const checkData = "SELECT `email_id` FROM login_signup WHERE `email_id` = ?";
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    try {
        // Check if the email already exists
        const [data] = await db.promise().query(checkData, [email]);

        if (data.length === 1) {
            return res.json("Email Already Exists");
        }

        // Generate a unique verification code
        const verificationCode = await generateUniqueCode();

        // Send verification email
        const emailSent = await sendEmail(email, "Your Verification Code", `Your verification code is: ${verificationCode}`);

        if (!emailSent) {
            return res.status(500).json("Failed to send verification email");
        }

        // Insert into login_signup table
        const sql = "INSERT INTO login_signup (`username`, `email_id`, `password`, `time_stamp`) VALUES (?, ?, ?, ?)";
        await db.promise().query(sql, [username, email, password, currentDate]);

        // Insert into verification_table
        const verifySql = "INSERT INTO verification_table (`email_id`, `verification_code`, `time_stamp`) VALUES (?, ?, ?)";
        await db.promise().query(verifySql, [email, verificationCode, currentDate]);

        res.send("success");
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
});


app.post('/sign-up-confirmation', async (req, res) => {
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

app.post('/sign-up-code-resend', async (req, res) => {
    
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

app.post('/news-letter',async (req,res)=>{
    const email_id = req.body.email_id
    const sql = "INSERT INTO news_letter (email_id) VALUES (?)";

    try {
        await db.promise().query(sql,[email_id])
        res.status(200).send("success")
    } catch (error) {
        res.status(500).send(error)
    }
})


app.listen(5000, () => {
    console.log("Server running");
});
