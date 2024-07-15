import bcrypt from "bcrypt"
import { registerSchema, loginSchema } from "../schemas/schema.js";
import { UserModel } from "../models/user.js"


export const register = async (req, res, next) => {


    //validate request
    const { value, error } = registerSchema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    //check if username exists


    const email = value.email;

    const findIfUserExist = await UserModel.findOne({ email });
    if (findIfUserExist) {
        return res.status(401).send("User has already signed up");
    } else {

        // encrypt user password
        const hashedPassword = await bcrypt.hash(value.password, 12);
        value.password = hashedPassword;

        const addUser = await UserModel.create(value);

        req.session.user = { id: addUser.id };

        return res.status(201).send(addUser);

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


export const getUser = async (req, res, next) => {
    try {
        const username = req.params.username.toLowerCase();
        const options = { sort: { startDate: -1 } }
        const userDetails = await UserModel.findOne({ username })
        .populate("userProfile")
            // .populate({
            //     path: "education",
            //     options,
            // })
            
            // .populate("skills")

            // .populate({
            //     path: "achievements",
            //     options: { sort: { date: -1 } },
            // })
            // .populate({
            //     path: "experiences",
            //     options,
            // })
            // .populate({
            //     path: "volunteering",
            //     options,
            // })
            // .populate({
            //     path: 'projects',
            //     options
            // });

        return res.status(200).json({ username: userDetails });
    } catch (error) {
        console.log(error)
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

    return res.status(200).json({ sessionId: req.session.id, user: userDetails });
};





export const logout = async (req, res, next) => {
    try {
        await req.session.destroy();
        //return response
        res.status(200).json("User logged out")
    } catch (error) {
        next(error);
    }
}




