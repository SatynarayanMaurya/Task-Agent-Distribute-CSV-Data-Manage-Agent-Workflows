const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signupController = async(req,res)=>{
    try{
        const {email,password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Required Fields are missing"
            })
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"User is already registered"
            })
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({email ,password:hashedPassword})
            return res.status(201).json({
                success:true,
                message:"Sign up successful !",
                newUser
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while sign up the user",
            errorMessage:error?.message
        })
    }
}

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "User is not registered with us",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        userId: existingUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const isProduction = process.env.NODE_ENV === "production";

    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    };

    return res.cookie("token", token, cookieOptions).status(200).json({
      success: true,
      message: "Login successful",
      token, // optional
      user: {
        id: existingUser?._id,
        email: existingUser?.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while logging in the user",
      errorMessage: error.message,
    });
  }
};


exports.getUserDetails = async (req,res)=>{
  try{
    const userId = req.user.userId;
    if(!userId){
      return res.status(400).json({
        success:false,
        message:"UserId not found !"
      })
    }
    const userDetails = await User.findById(userId)
    return res.status(200).json({
      success:true,
      message:"User Details find successfully",
      userDetails
    })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:"Error in getting user Details ",
      errorMessage:error?.message
    })
  }
}