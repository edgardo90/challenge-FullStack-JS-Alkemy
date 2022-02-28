const {Operation} = require("../../db.js");

const postOperation = async(req,res)=>{
    let{
        name,
        money,
        date,
        type,
    }= req.body;
    try{
        const operationCreate = await Operation.create({
            name,
            money,
            date,
            type,
        });
        return res.status(200).send(operationCreate) 
    }catch(error){
        res.send(error);
    }
}


const getAllOpetations = async(req,res)=>{
    try{
        const allOperations = await Operation.findAll();
        return res.status(200).send(allOperations)
    }catch(error){
        res.send(error);
    }
}


const getIdOperation = async(req , res) =>{
    try{
        const {idOperation} = req.params;
        const allOperations = await Operation.findAll();
        if(idOperation){
            const id = allOperations.find(el => el.id.toLowerCase() === idOperation.toLowerCase() );
             return id ?  res.status(200).send(id)
            : res.status(404).json({error: "Esa operacion no existe" })  
        }
    }catch(error){
        res.send(error);
    }
}


const deleteOperation = async(req , res) =>{
    try{
        const {idOperation} = req.params;
        const allOperations = await Operation.findAll();
        const id = allOperations.find(el => el.id.toLowerCase() === idOperation.toLowerCase() );
        if(id){
            await id.destroy();
            return res.status(200).send("Operacion eleminada")
        }
        return res.status(404).json({error: "no se puede eleminar la operacion"})   
    }catch(error){
        res.send(error);
    }
}


const modifyOperation = async(req ,res) =>{
    try{
        const {idOperation} = req.params;
        const {
            name,
            money,
            date,
        } = req.body
        const allOperations = await Operation.findAll();
        const operation = allOperations.find(el => el.id.toLowerCase() === idOperation.toLowerCase() );
        if(operation){
            operation.name = name ? name : operation.name;
            operation.money = money ? money : operation.money;
            operation.date = date ? date : operation.date;
            operation.save();
            return res.status(200).send(operation)
        }
        return res.status(404).json({error:"No esta esa operacion para modificar" })
    }catch(error){
        res.send(error);
    }
}



const getAllIncome = async(req,res) =>{
    try{
        const allOperations = await Operation.findAll();
        const operationsIncome =  allOperations.filter(el => el.type.toLowerCase() === "ingreso");
        if(operationsIncome.length > 0 ){
            return res.status(200).send(operationsIncome);
        }
        return res.status(404).json({error:"No hay operaciones de ingreso para mostrar"})
    }catch(error){
        res.send(error);
    }
}


const getAllEgress = async(req,res) =>{
    try{
        const allOperations = await Operation.findAll();
        const OperationsEgress = allOperations.filter(el => el.type.toLowerCase() === "egreso" )
        if(OperationsEgress.length > 0){
            return res.status(200).send(OperationsEgress);
        }
        return res.status(404).json({error:"No hay operaciones de egresos de dinero" })
    }catch(error){
        res.send(error);
    }
}


module.exports={postOperation , getAllOpetations, getIdOperation ,deleteOperation, modifyOperation, getAllIncome , getAllEgress};