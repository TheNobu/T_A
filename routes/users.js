const express = require("express");
const router = express.Router();
const {
    findEmail, 
    findUserId, 
    saveUser,
} = require("../database/users");
const z = require("zod")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = z.object({
    name: z.string().min(4),
    email: z.string().email(),
    senha: z.string().min(6),
  });


router.get("/users/:id",async(req,res)=>{
    const user = await findUserId(req.user.id);
    res.json({
        user,
    })
})

router.post("/register",async(req,res)=>{
    try {
        const user = userSchema.parse(req.body)
        const isEmailUsed = await findEmail(user.email)
        if(isEmailUsed)
            return res.status(400).json({
                message: "Email already is being used"
            });
        const hashSenha = bcrypt.hashSync(req.body.senha,10)
        user.senha = hashSenha
        const savedUser = await saveUser(user)
        delete savedUser.senha;
        res.status(201).json({
            user: savedUser,
        })
    } catch (err) {
      if(err instanceof z.ZodError)
        return res.status(422).json({
            message: err.errors,
        })
        res.status(500).json({
            message: "Server Error"
        })
        console.log(err)
    }  
})
router.post("/login",async(req,res)=>{
    const email = req.body.email;
    const senha = req.body.senha;
    const user = await findEmail(email);
    if(!user) return res.status(400).send();
    const isSameSenha = bcrypt.compareSync(senha,user.senha);
    if(!isSameSenha) return res.status(401).send();
    const token = jwt.sign({
        userId: user.id,
        name: user.name,
    },
    process.env.SECRET
    );
    res.json({
        message: "Success",
        token,
    });
});


module.exports = {
    router,
}