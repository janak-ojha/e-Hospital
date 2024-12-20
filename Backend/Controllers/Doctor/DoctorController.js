const bcrypt = require("bcryptjs");
const Doctor = require("../../Models/Doctor"); // Update the path as per your directory structure

// Register Doctor Handler
const registerDoctor = async (req, res) => {
    const { doctorName, doctorEmail,doctorType, password,role, } = req.body;
    try {
        // Check if email already exists
        const existingDoctor = await Doctor.findOne({doctorEmail});
        if (existingDoctor) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create a new doctor entry
        const newDoctor = new Doctor({
            doctorName,
            hospitalname: req.user.id, // Assuming the logged-in admin ID is available in req.user.id
            doctorEmail,
            doctorType,
            password: hashedPassword,
            role,
            
        });
        const savedDoctor = await newDoctor.save();
        // Hide the password in the response
        savedDoctor.password = undefined;
        // Send success response
        res.send(savedDoctor);
    } catch (error) {
        // Handle errors
        res.status(500).json(error.message);
    }
};


// geting doctor detail
const GetAllDoctor = async (req, res) => {
    try {
        // Fetch doctors associated with the logged-in admin's hospital ID (req.user.id)
        const DoctorUsers = await Doctor.find({ hospitalname: req.user.id })
            .select("-password") // Exclude password from response
            .populate("hospitalname", "hospitalname"); // Populate hospital name if needed

        if (DoctorUsers.length === 0) {
            return res.status(404).json({ message: "No doctors found for this hospital" });
        }

        res.status(200).json(DoctorUsers);
    } catch (error) {
        res.status(500).json({ message: "Server error, could not fetch doctors", error: error.message });
    }
};

module.exports = {registerDoctor,GetAllDoctor};
