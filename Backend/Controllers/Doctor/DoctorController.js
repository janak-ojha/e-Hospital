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


//delete user by id :
const deleteDoctor = async (req, res) => {
    const { id } = req.params;  // Get user ID from request params
  
    try {
      // Find the user by ID and delete
      const deletedUser = await Doctor.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error.message);
      res.status(500).json({ message: "Error deleting user", error: error.message });
    }
  };


  //updating user by id
  const updateDoctorDetail = async (req, res) => {
      console.log("Updating user with ID:", req.params.id);
      const { id } = req.params;
      const { doctorName, doctorEmail,doctorType, password,role, } = req.body;
        
      try {
          // Find user by ID
          const user = await Doctor.findById(id);
          if (!user) {
              return res.status(404).json({ message: "User not found" });
          }
          // Check if email is updated and already exists
          if (doctorEmail && doctorEmail !== user.doctorEmail) {
              const existingUser = await Doctor.findOne({ doctorEmail });
              if (existingUser) {
                  return res.status(400).json({ message: "Email already in use" });
              }
              user.doctorEmail = doctorEmail;
          }
          // Update fields
          if (doctorName) user.doctorName = doctorName;
          if (role) user.role = role;
          if (doctorType) user.doctorType = doctorType;
  
          // If password is provided, hash and update it
          if (password) {
              const salt = await bcrypt.genSalt(10);
              user.password = await bcrypt.hash(password, salt);
          }
  
          // Save the updated user
          const updatedUser = await user.save();
          updatedUser.password = undefined; // Exclude password field
  
          res.status(200).json(updatedUser);
      } catch (error) {
          console.error("Error updating user:", error.message);
          res.status(500).json({ message: "Error updating user", error: error.message });
      }
  };


module.exports = {registerDoctor,GetAllDoctor,deleteDoctor,updateDoctorDetail};
