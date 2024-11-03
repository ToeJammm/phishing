import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config(); // Load from .env file by default

const config = {
    user: process.env.AZURE_SQL_USER, 
    password: process.env.AZURE_SQL_PASSWORD,
    server: process.env.AZURE_SQL_SERVER, 
    port: 1433, // optional, defaults to 1433
    database: process.env.AZURE_SQL_DATABASE, 
    options: {
        encrypt: true
    }
};

export async function connect() {
    try {
        console.log("Connecting to database locally.");
        let poolConnection = await sql.connect(config);
        console.log("Successfully connected to DB");
        return poolConnection;
    } catch (err) {
        console.error("Error connecting:", err.message);
    }
}

export async function addUser(userName, password) {
    try {
        // Extract the first three letters of the password
        const passwordPrefix = password.slice(0, 3);
        
        // Connect to the database
        let pool = await sql.connect(config);

        // Insert the new user
        const result = await pool.request()
            .input('userID', sql.Int, userID)
            .input('userName', sql.NVarChar(50), userName)
            .input('passwordPrefix', sql.NVarChar(3), passwordPrefix)
            .query(`
                INSERT INTO Users (userID, userName, password)
                VALUES (@UserID, @UserName, @Password)
            `);

        console.log("User added successfully:", result);
    } catch (err) {
        console.error("Error adding user:", err.message);
    }
}

// Function to get all users
export async function getUsers() {
    try {
        // Connect to the database
        let pool = await sql.connect(config);

        // Query to select all users
        const result = await pool.request().query('SELECT UserID, UserName, Password FROM Users');

        // Return the array of users
        return result.recordset;
    } catch (err) {
        console.error("Error retrieving users:", err.message);
        throw err;
    }
}
