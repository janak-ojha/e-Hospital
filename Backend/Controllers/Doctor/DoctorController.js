const Doctor = require("../../Models/Doctor"); // Update the path as per your directory structure
const bcrypt = require("bcryptjs");
const TokenGenerate = require("../../Middleware/Tokengenerate");
const jwt = require("jsonwebtoken");


// Register Doctor Handler
const registerDoctor = async (req, res) => {
    const { username, email,doctorType, password,role, } = req.body;
    console.log(username,email);
    try {
        // Check if email already exists
        const existingDoctor = await Doctor.findOne({email});
        if (existingDoctor) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create a new doctor entry
        const newDoctor = new Doctor({
            username,
            hospitalname: req.user.id, // Assuming the logged-in admin ID is available in req.user.id
            email,
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

//login Doctor
const doctorLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find the admin user by email
        const result = await Doctor.findOne({ email });
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
     
        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, result.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        console.log(result);
        console.log( {
            id: result._id,
            username: result.username,
            hospitalname: result.hospitalname,
            email: result.email,
            doctorType: result.doctorType,
            role: result.role,
            token: TokenGenerate(result._id),
        });


        res.status(200).json({
            id: result._id,
            username: result.username,
            hospitalname: result.hospitalname,
            email: result.email,
            doctorType: result.doctorType,
            role: result.role,
            token: TokenGenerate(result._id), // Ensure `TokenGenerate` is defined and secure
        });

       
        
    } catch (error) {
        // Internal server error
        res.status(500).json({ message: "An error occurred", error: error.message });
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
      const { username, email,doctorType, password,role, } = req.body;
        
      try {
          // Find user by ID
          const user = await Doctor.findById(id);
          if (!user) {
              return res.status(404).json({ message: "User not found" });
          }
          // Check if email is updated and already exists
          if (email && email !== user.email) {
              const existingUser = await Doctor.findOne({ email });
              if (existingUser) {
                  return res.status(400).json({ message: "Email already in use" });
              }
              user.email = email;
          }
          // Update fields
          if (username) user.username = username;
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


module.exports = {registerDoctor,GetAllDoctor,deleteDoctor,updateDoctorDetail,doctorLogin};
