const express = require('express');
const zod = require('zod');
const {User, Account} = require('../db');
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const  authMiddleware  = require('../middleware');

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string() 
}); 



router.post("/signup", async (req,res) => {
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    if(!success)
    {
        return res.status(411).json({
            message: "Email already taken/ incorrect inputs"
        });
    } 

    const existingUser = await User.findOne({
        username: body.username
    });

    if(existingUser)
    {
        return res.status(411).json({
            message: "Email already taken/ Incorrect inputs"
        });
    }

    const user = await User.create(body);
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1+ Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);
    //console.log(token);
    res.json({
        message: "User created successfully",
        token: token
    });
});



const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
});


router.post("/signin", async(req,res) => {
    const body = req.body;
    const {success} = signinSchema.safeParse(body);

    if(!success)
    {
        return res.status(411).json({
            message: "Wrong username/password"
        });
    }

    const existingUser = await User.findOne({
        username: body.username
    });

    if(!existingUser)
    {
        return res.status(411).json({
            message: "User doesn't exist"
        });
    }

    const token = jwt.sign({
        userId : existingUser._id
    }, JWT_SECRET);
    
    res.json({
        token: token
    });
    
});


const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});


router.put("/", authMiddleware, async(req,res) => {
    const body = req.body;
    const{success} = updateSchema.safeParse(body);

    if(!success)
        {
            return res.status(411).json({
                message: "Error while updating."
            });
        }

        await User.updateOne({_id: req.userId}, req.body);

        res.json({
            message: "Updated successfully"
        });
});


router.get("/bulk", async(req,res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        },{
            lastName: {
                "$regex": filter
            }
        }]
    });
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});
module.exports = router;