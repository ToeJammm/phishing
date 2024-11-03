import express from 'express';
import cors from 'cors';
import { addUser, getUsers, signIn } from './database.js'; // Assuming addUser is in database.js

import dotenv from 'dotenv';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON request bodies
app.use(express.json());
// Enable CORS for all requests
app.use(cors());

// POST endpoint to add a new user
app.post('/add-user', async (req, res) => {
    try {
        // Extract user data from the request body
        const {userName, password } = req.body;

        // Validate required fields
        if (!userName || !password) {
            return res.status(400).json({ message: 'userID, userName, and password are required' });
        }

        // Call the addUser function
        await addUser(userName, password);

        // Respond with success message
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        console.error("Error in /add-user endpoint:", error.message);
        res.status(500).json({ message: 'Failed to add user' });
    }
});

app.post('/sign-in', async (req, res) => {
    const { username, password } = req.body;
    const result = await signIn(username, password);
    res.json(result); // Ensure this is a JSON response
});


// GET endpoint to retrieve all users
app.get('/get-users', async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error in /get-all-users endpoint:", error.message);
        res.status(500).json({ message: 'Failed to retrieve users' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
