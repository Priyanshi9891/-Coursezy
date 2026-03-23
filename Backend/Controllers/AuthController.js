const UserModel = require("../Models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false
      });
    }

    const user = new UserModel({ name, email });
    user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.status(201).json({
      success: true,
       message: "signup successful"
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: "internal server error" });
  }
};


const login = async (req,res)=>{
    try{
        const{ email,password }= req.body;
        const user = await UserModel.findOne( { email });
        const errorMsg = 'Auth failed email or password is wrong';
        if(!user){
             return res.status(404).json({ message: 'User not found', success: false })
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return res.status(403).json({ message:errorMsg,success: false});
        }
        const jwtToken = jwt.sign(
            { email: user.email,_id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        ) 
        
        res.status(200).json({
            message: "login successfully",
            success:true,
            jwtToken,
            email,
            name:user.name
        })
    }catch(err){
        res.status(500).json({
            message:"internal server error",
            success:false
        })
    }
}
module.exports = {
    signup,login
}