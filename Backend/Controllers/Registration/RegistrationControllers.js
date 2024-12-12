const bcrypt = require("bcryptjs");
const Registeroffice = require("../../Models/Registration");

// Register Office Handler
const RegisterOffice = async (req, res) => {
    const { name, hospitalname, email, password, role,officerLevel } = req.body;

    try {
        // Check if email already exists
        const existingAdminByEmail = await Registeroffice.findOne({ email });
        if (existingAdminByEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
         
        // Create a new registration entry
        const newRegister = new Registeroffice({
            name,
            hospitalname: req.user.id,
            email,
            role,
            password: hashedPass,
            officerLevel
        });

        // Save the registration to the database
        const result = await newRegister.save();
        result.password = undefined; // Do not return the password in the response

        return res.status(201).json({ message: "Registration successful", data: result });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { RegisterOffice };
