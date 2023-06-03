const prisma = require("./prisma");

const findAllReceitas = () =>{
    return prisma.receitas.findMany();
}

const findReceitaById = (id) =>{
    return prisma.receitas.findFirst({
        where: {
            id: id,
        }
    });
}

const saveReceita = (receita) =>{
    return prisma.receitas.create({
        data: receita,
    })
}

const updateReceita = (id,receita) =>{
    return prisma.receitas.update({
        where: {
            id,
        },
        data: receita
    })
}

const deleteReceita = (id)=>{
    return prisma.receitas.delete({
        where: {
            id: id
        }
    })
}

module.exports = {
    findAllReceitas,
    findReceitaById,
    saveReceita,
    updateReceita,
    deleteReceita,
}