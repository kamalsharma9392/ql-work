import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/user.js";
import {validateEmail} from "../utils/validation.js";
import {Sequelize} from "sequelize";

export const getUser = async(req, res) => {
    try {
        const user = await Users.findOne({
            where:{
                email: req.email
            },
            attributes:['id','name','email','username','phone']
        });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

export const register = async(req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(422).json({message: "Name,Email,Username and Password is required !!"});
    }
    if(!req.body.hasOwnProperty('name')) return res.status(422).json({message: "Name is required !!"});
    if(!req.body.hasOwnProperty('email')) return res.status(422).json({message: "Email is required !!"});
    if(!req.body.hasOwnProperty('username')) return res.status(422).json({message: "Username is required !!"});
    if(!req.body.hasOwnProperty('password')) return res.status(422).json({message: "Password is required !!"});

    const { name, email, phone, username, password } = req.body;
    // custom validation for email
    if(!validateEmail(email)) return res.status(400).json({message: "Invalid email address !!"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            phone: phone,
            username: username,
            password: hashPassword
        });
        res.status(201).json({message: "Registration Successful !!!"});
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

export const login = async(req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(422).json({message: "Email and Password is required !!"});
    }
    if(!req.body.hasOwnProperty('email')) return res.status(422).json({message: "Email is required !!"});
    if(!req.body.hasOwnProperty('password')) return res.status(422).json({message: "Password is required !!"});
    const { email, password } = req.body;
    try {
        const userRes = await Users.findOne({
            where:{
                email: email
            }
        });
        if(userRes===null){
            res.status(404).json({message:"Email address is not found"});
        }else{
            const user = userRes.toJSON();
            const match = await bcrypt.compare(password, user.password);
            if(!match) return res.status(400).json({message: "Whoops!! Invalid Password"});
            const userId = user.id;
            const name = user.name;
            const email = user.email;
            const accessToken = jwt.sign({userId, name, email}, process.env.JWT_SECRET,{
                expiresIn: '1440s'
            });
            res.json({ accessToken });
        }
    } catch (error) {
        res.status(400).json({message:"Whoops!! Something bad happened"});
    }
}

export const logout = async(req, res) => {
    return res.sendStatus(200);
}