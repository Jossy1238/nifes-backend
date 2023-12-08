const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

//Register
const signup = async (req, res)=>{
    try {

        const {
            fullName,
            username,
            email,
            password,
            phoneNumber,
            currentCountry,
            major,
            degree,
            joinYear,
            graduationYear,
            role

        } = req.body;

        const image = req?.file?.filename;


        if(!fullName || !username || !currentCountry || !email || !password || !degree || !graduationYear){
            return res.status(400).json({message: "Please fill all required fields"});
        }

        //Check if user with email exists
        let existingEmail = await User.findOne({email})
        if(existingEmail){
            return res.status(400).json({message: "User with this email already exists"});
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User(
            {
                fullName,
                username,
                email,
                password : hashedPassword,
                phoneNumber,
                currentCountry,
                major,
                degree,
                joinYear,
                graduationYear,
                image,
                role
            }
        );

        await user.save();

        user.password = undefined;
        res.status(201).json({message: "User created successfully", user});


    } catch (error) {
        res.status(400).send(error);
    }
}

//Login
const login = async (req, res)=>{
    try {

        const {username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({message: "Please fill all required fields"});
        }

        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        //Generate a jwt token and add it to cookies
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.cookie("token", token, {httpOnly: true});
        
        user.password = undefined;
        res.status(200).json({message: "Login successful", token,  user});

    } catch (error) {
        res.status(400).json(error);
    }
}

//Get Currently logged in user
const getCurrentUser = async(req, res)=>{

    const {token} = req.params

    if(!token){
        return res.status(400).json({
            message: "fail",
            data: {
                message: "Please login"
            }
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {id} = decoded;

    try{
        let user = await User.findById(id)
        .select('-password');
        if(!user){
            return res.status(400).json({
                message: "fail",
                data: {
                    message: "User not found"
                }
            })
        }

        res.status(200).json({
            message: "success",
            data: {
                user
            }
        })

    }catch(err){
        res.status(400).json({
            message: "fail",
            data: {
                message: err.message
            }
        })
    }
        
    
}

//Get all users
const getUsers = async (req, res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json(error);
    }
}

// Update User
const updateUser = async (req,res)=> {
    try{
        const id = req.params.id;
        const updates = req.body;
        const options = {new: true};

        //Check if user with id exists
        let user = await User.findByIdAndUpdate(id, updates, options);
        if(!user){
            return res.status(400).json({message: "User with this id does not exist"});
        }

        const updatedUser = await User.findByIdAndUpdate(id, updates, options);
        res.status(200).json(updatedUser);
    }
    catch(error){
        res.status(400).json(error);
    }
}

//Delete User
const deleteUser = async (req,res)=> {
    try{
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({message: `User ${user.fullName} deleted successfully`});
    }
    catch(error){
        res.status(400).json(error);
    }
}

//Get User
const getUser = async (req, res)=>{
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}

//Log user out
const logout = async (req, res)=>{
    try {
        res.cookie("token", "", {httpOnly: true, expires: new Date(0)});
        res.status(200).json({message: "Logout successful"});
    } catch (error) {
        res.status(400).json(error);
    }
}


module.exports = {
    signup, 
    login, 
    getUsers,
    updateUser,
    deleteUser,
    getCurrentUser,
    logout,
    getUser
}