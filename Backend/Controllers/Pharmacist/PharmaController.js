const bcrypt = require("bcryptjs");
const Pharma = require("../../Models/Pharma");

// phamrma register Office Handler
const registerPharmacist = async (req, res) => {
    const { pharmacistName, pharmacistEmail, password, role} = req.body;

    try {
        // Check if email already exists
        const existingAdminByEmail = await Pharma.findOne({ pharmacistEmail });
        if (existingAdminByEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
         
        // Create a new registration entry
        const newPharme = new Pharma({
            pharmacistName,
            hospitalname: req.user.id,
            pharmacistEmail,
            role,
            password: hashedPass,
        });
       
        // Save the registration to the database
        const result = await newPharme.save();
        result.password = undefined; 
        res.send(result);
    } catch (error) {
         res.status(500).json(error.message);
    }
};

// get detail of the pharme
const GetAllPharma = async (req, res) => {
    try {
        // Fetch all registered users and populate 'hospitalname' with the 'name' field
        const pharmadetail = await Pharma.find({ hospitalname: req.user.id })
            .select("-password")  // Exclude password
            .populate("hospitalname", "hospitalname"); // Populate the 'hospitalname' field with the 'name' property

        if (pharmadetail.length === 0) {
            return res.status(404).json({ message: "No registered users found" });
        }
        console.log(pharmadetail)
        res.status(200).json(pharmadetail); // Send populated data
        
    } catch (error) {
        res.status(500).json({ message: "Server error, could not fetch registered users", error: error.message });
    }
};

//delete user by id :
const deletePharma = async (req, res) => {
    const { id } = req.params;  // Get user ID from request params
  
    try {
      // Find the user by ID and delete
      const deletedUser = await Pharma.findByIdAndDelete(id);
  
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
    const updatePharmaDetail = async (req, res) => {
        console.log("Updating user with ID:", req.params.id);
        const { id } = req.params;
        const { pharmacistName,pharmacistEmail,password,role, } = req.body;
          
        try {
            // Find user by ID
            const user = await Pharma.findById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            // Check if email is updated and already exists
            if (pharmacistEmail && pharmacistEmail !== user.pharmacistEmail) {
                const existingUser = await Pharma.findOne({ pharmacistEmail });
                if (existingUser) {
                    return res.status(400).json({ message: "Email already in use" });
                }
                user.pharmacistEmail = pharmacistEmail;
            }
            // Update fields
            if (pharmacistName) user.pharmacistName = pharmacistName;
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


module.exports = { registerPharmacist,GetAllPharma,deletePharma,updatePharmaDetail};