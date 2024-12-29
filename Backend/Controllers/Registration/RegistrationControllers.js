const bcrypt = require("bcryptjs");
const Registeroffice = require("../../Models/Registration");
const TokenGenerate = require("../../Middleware/Tokengenerate");
const jwt = require("jsonwebtoken");

// Register Office Handler
const RegisterOffices = async (req, res) => {
    const { name, email, password, role,officerLevel } = req.body;

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
        result.password = undefined; 
        res.send(result);
    } catch (error) {
         res.status(500).json(error.message);
    }
};


//login Doctor
const officeLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find the admin user by email
        const result = await Registeroffice.findOne({ email });
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(result);
        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, result.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        console.log(result);
        console.log( {
            id: result._id,
            name: result.username,
            hospitalname: result.hospitalname,
            email: result.email,
            officerLevel: result.officerLevel,
            role: result.role,
            token: TokenGenerate(result._id),
        });


        res.status(200).json({
            id: result._id,
            name: result.name,
            hospitalname: result.hospitalname,
            email: result.email,
            officerLevel: result.officerLevel,
            role: result.role,
            token: TokenGenerate(result._id), // Ensure `TokenGenerate` is defined and secure
        });

    } catch (error) {
        // Internal server error
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};


// get all registered user detail
const GetAllRegisteredUsers = async (req, res) => {
    try {
        // Fetch all registered users and populate 'hospitalname' with the 'name' field
        const registeredUsers = await Registeroffice.find({ hospitalname: req.user.id })
            .select("-password")  // Exclude password
            .populate("hospitalname", "hospitalname"); // Populate the 'hospitalname' field with the 'name' property

        if (registeredUsers.length === 0) {
            return res.status(404).json({ message: "No registered users found" });
        }
        res.status(200).json(registeredUsers); // Send populated data
    } catch (error) {
        res.status(500).json({ message: "Server error, could not fetch registered users", error: error.message });
    }
};

//delete user by id :
const deleteRegisterUser = async (req, res) => {
    const { id } = req.params;  // Get user ID from request params
  
    try {
      // Find the user by ID and delete
      const deletedUser = await Registeroffice.findByIdAndDelete(id);
  
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
const updateRegisterUser = async (req, res) => {
    console.log("Updating user with ID:", req.params.id);
    const { id } = req.params;
    const { name, email, password, role, officerLevel } = req.body;

    try {
        // Find user by ID
        
        const user = await Registeroffice.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if email is updated and already exists
        if (email && email !== user.email) {
            const existingUser = await Registeroffice.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }
            user.email = email;
        }

        // Update fields
        if (name) user.name = name;
        if (role) user.role = role;
        if (officerLevel) user.officerLevel = officerLevel;

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


// fetch doctor detail


module.exports = { RegisterOffices,GetAllRegisteredUsers,deleteRegisterUser ,updateRegisterUser,officeLogin};


