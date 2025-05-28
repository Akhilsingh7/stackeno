import { User } from "../model/user.model.js";


const registerUser = async (req, res) => {
    try {
        // Simulate user registration logic
        const { username, password , fullName, email } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }


        // Here you would typically save the user to the database
        // For now, we just return a success message

        const user =  await User.create({
            username : username.toLowerCase(),
            email,
            fullName,
            password,
        });

        if(!user) {
            return res.status(500).json({ message: "Error creating user" });
        }




        res.status(201).json({ message: "User registered successfully", user: user });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export {
    registerUser}