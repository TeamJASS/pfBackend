import bcrypt from "bcrypt"
import { registerSchema,loginSchema } from "../schemas/schema.js";
import { UserModel } from "../models/user.js"


export const register = async (req, res, next) => {

  try {
    //validate request
    const { value, error } = registerSchema.validate(req.body);

    if (error) {
      return res.status(422).json(error);
    }
    //check if username exists

    const existingUser = await UserModel.findOne({ username: value.username });

    if (existingUser) {
      return res.status(409).json("Username already exists");
    }
    // encrypt user password
    const hashedPassword = bcrypt.hashSync(value.password, 10);
    //create user
    await UserModel.create({
      ...value,
      password: hashedPassword
    });
    //return response
    res.status(201).json("User registered");


  } catch (error) {
    next(error)
  }

}


export const login = async (req, res, next) => {
try {
  
    //validate request
    const { value, error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    //find a user with their unique identifier
  
    const user = await UserModel.findOne({
      $or: [
        { username: value.username },
        { email: value.email },
      ]
  
    });
    if (!user) {
      return res.status(401).json("User not found");
    }
    //verify their password
    const correctPassword = bcrypt.compareSync(value.password, user.password)
    if (!correctPassword) {
      return res.status(401).json("Invalid credentials");
    }
  
    //create a session
    req.session.user = { id: user.id }
    //return response
    res.status(200).json("User logged in")
  
} catch (error) {
  next(error);
}

}


//   export const profile =async(req,res,next)=>{
//   try {
//      // Get user id from session
//      const id =req.session.user.id;
//      //find user by id
//      const user =await UserModel.findById(id)
//      .select('-password')
//      .select('-confirmPassword')
//      .populate('education')
//      .populate('userProfile')
//      .populate('volunteering')
//      .populate('skills')
//      .populate('achievements')
//      .populate('experiences')
//      .populate('projects')



//     //return response
//     res.status(200).json(user);
   
//   } catch (error) {
//     next(error)
//   }
 
// }

export const getUser = async (req, res, next) => {
    try {
      const username = req.params.username.toLowerCase();
  
    const options = { sort: { startDate: -1 } }
    const userDetails = await UserModel.findOne({ username })
      .populate({
        path: "education",
        options,
      })
      .populate("userProfile")
      .populate("skills")
  
      .populate({
        path: "achievements",
        options: { sort: { date: -1 } }, 
      })
      .populate({
        path: "experiences",
        options, 
      })
      .populate({
        path: "volunteering",
        options, 
      })
      .populate({
          path: 'projects',
          options 
      });
  
    return res.status(200).json({ username: userDetails });
    } catch (error) {
      next()
    }
  };
  
  export const getUsers = async (req, res) => {
   
  
    const email = req.query.email?.toLowerCase()
    const username = req.query.username?.toLowerCase();
  
    const filter = {};
    if (email) {
      filter.email = email;
    }
    if (username) {
      filter.username = username;
    }
  
    const users = await UserModel.find(filter);
  
    return res.status(200).json({  sessionId: req.session.id, user: userDetails  });
  };
  
  



export const logout =async(req,res,next)=>{
  try {
    await req.session.destroy();
    //return response
    res.status(200).json("User logged out")
  } catch (error) {
    next(error);
  }
}




