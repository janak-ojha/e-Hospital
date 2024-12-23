const bcrypt = require("bcryptjs");
const Lab = require("../../Models/Lab");

// phamrma register Office Handler
const registerLab = async (req, res) => {
    const { labTechnicianName,labTechnicianEmail, password, role} = req.body;

    try {
        // Check if email already exists
        const existingAdminByEmail = await Lab.findOne({ labTechnicianEmail });
        if (existingAdminByEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
         
        // Create a new registration entry
        const newLab = new Lab({
            labTechnicianName,
            hospitalname: req.user.id,
            labTechnicianEmail,
            role,
            password: hashedPass,
        });
       
        // Save the registration to the database
        const result = await newLab.save();
        result.password = undefined; 
        res.send(result);
    } catch (error) {
         res.status(500).json(error.message);
    }
};

// get detail of the pharme
const GetAllLab = async (req, res) => {
    try {
        // Fetch all registered users and populate 'hospitalname' with the 'name' field
        const labdetail = await Lab.find({ hospitalname: req.user.id })
            .select("-password")  // Exclude password
            .populate("hospitalname", "hospitalname"); // Populate the 'hospitalname' field with the 'name' property

        if (labdetail.length === 0) {
            return res.status(404).json({ message: "No registered users found" });
        }
        console.log(labdetail)
        res.status(200).json(labdetail); // Send populated data
        
    } catch (error) {
        res.status(500).json({ message: "Server error, could not fetch registered users", error: error.message });
    }
};

//delete user by id :
const deleteLab = async (req, res) => {
    const { id } = req.params;  // Get user ID from request params
  
    try {
      // Find the user by ID and delete
      const deletedUser = await Lab.findByIdAndDelete(id);
  
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
    const updateLabDetail = async (req, res) => {
        console.log("Updating user with ID:", req.params.id);
        const { id } = req.params;
        const { labTechnicianName,labTechnicianEmail,password,role, } = req.body;
          
        try {
            // Find user by ID
            const user = await Lab.findById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            // Check if email is updated and already exists
            if (labTechnicianEmail && labTechnicianEmail !== user.labTechnicianEmail) {
                const existingUser = await Lab.findOne({ labTechnicianEmail });
                if (existingUser) {
                    return res.status(400).json({ message: "Email already in use" });
                }
                user.labTechnicianEmail = labTechnicianEmail;
            }
            // Update fields
            if (labTechnicianName) user.labTechnicianName = labTechnicianName;
            if (role) user.role = role;
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


module.exports = { registerLab,GetAllLab,deleteLab,updateLabDetail};