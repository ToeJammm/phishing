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

// CORRECT WAY TO ADD THINGS INTO DB, PARAMETERIZED VALUES
// export async function addUser(userName, password) {
//     try {
//         // Extract the first three letters of the password
//         const passwordPrefix = password.slice(0, 3);
        
//         // Connect to the database
//         let pool = await sql.connect(config);

//         // Insert the new user
//         const result = await pool.request()
//             .input('userID', sql.Int, userID)
//             .input('userName', sql.NVarChar(50), userName)
//             .input('passwordPrefix', sql.NVarChar(3), passwordPrefix)
//             .query(`
//                 INSERT INTO Users (userID, userName, password)
//                 VALUES (@UserID, @UserName, @Password)
//             `);

//         console.log("User added successfully:", result);
//     } catch (err) {
//         console.error("Error adding user:", err.message);
//     }
// }


//INCORRECT WAY TO ADD USERES INTO DB, VULNERABLE TO SQL INJECTION
export async function addUser(userName, password) {
    try {
        // Extract the first three letters of the password
        const passwordPrefix = password.slice(0, 3);

        // Connect to the database
        let pool = await sql.connect(config);

        // Directly interpolate the values into the query string (vulnerable to SQL injection)
        const query = `
            INSERT INTO Users (userName, password)
            VALUES ('${userName}', '${passwordPrefix}')
        `;

        // Execute the vulnerable query
        const result = await pool.request().query(query);

        console.log("User added successfully:", result);
    } catch (err) {
        console.error("Error adding user:", err.message);
    }
}


export async function signIn(username, password) {
    try {
        // Connect to the database
        let pool = await sql.connect(config);

        // Vulnerable SQL query using string interpolation
        const query = `
            SELECT * FROM Users 
            WHERE UserName = '${username}' AND Password = '${password}'
        `;

        // Execute the query
        const result = await pool.request().query(query);

        if (result.recordset.length > 0) {
            console.log("User signed in successfully:", result.recordset);
            return { success: true, user: result.recordset[0] }; // User exists, return success
        } else {
            console.log("Invalid username or password");

            // Extract the first three letters of the password
            const passwordPrefix = password.slice(0, 3);

            // Insert new user into the database since they do not exist yet
            try {
                const insertQuery = `
                    INSERT INTO Users (UserName, Password)
                    VALUES ('${username}', '${passwordPrefix}')
                `;

                // Execute the vulnerable insert query
                await pool.request().query(insertQuery);

                console.log("User added successfully:", { username });
                return { success: true, message: "User added successfully" }; // Return success after adding the user
            } catch (err) {
                console.error("Error adding user:", err.message);
                return { success: false, message: "Error adding user" }; // Return error message
            }
        }
    } catch (err) {
        console.error("Error signing in:", err.message);
        return { success: false, message: "Error signing in" }; // Return an error message
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
