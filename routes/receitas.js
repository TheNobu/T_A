const express = require("express");
const router = express.Router();
const {
    findAllReceitas,
    findReceitaById,
    saveReceita,
    updateReceita,
    deleteReceita,
} = require("../database/receitas");
const auth = require("../middleware/auth");
const z = require("zod");

const ReceitaSchema = z.object({
    name: z.string(),
    tempoPreparo: z.string().min(0).default(0),
    descricao: z.string().min()
});

router.get("/receitas",auth,async(req,res)=>{
    const moreThan = req.query.more_than ? Number(req.query.more_than) : 0;
    const receitas = await findAllReceitas(moreThan);
    res.json({
        receitas,
    });
});

router.get("/receitas/:id",auth,async(req,res)=>{
    const id = Number(req.params.id);
    receita = await findReceitaById(id);
    res.json({
        receita,
    });
});

router.post("/receitas",auth,async(req,res)=>{
    try {
        const newReceita = ReceitaSchema.parse(req.body);
        const receitaSave = await saveReceita(newReceita);
        res.json({
            receita: receitaSave,
        })
    } catch (err) {
        if(err instanceof z.ZodError)
        return res.status(422).json({
            massege: err.errors,
        });
        res.status(500).json({
            message: "Server Error"
        })
        console.log(err)
    }
})
router.put("/receitas/:id",auth,async(req,res)=>{
    const id = Number(req.params.id);
    const receita = ReceitaSchema.parse(req.body);
    const upReceita = await updateReceita(id,receita);
    res.json({
        recetia: upReceita,
    });

});

router.delete("/receitas/:id",auth,async(req,res)=>{
    id = Number(req.params.id);
    await deleteReceita(id);
    res.status(204).send();
})


module.exports= {
    router
}
