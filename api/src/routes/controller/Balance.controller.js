const {Operation} = require("../../db.js");

const incomeTotal = async(req,res) =>{
    try{
        const allOperations = await Operation.findAll();
        const operationsIncome =  allOperations.filter(el => el.type.toLowerCase() === "ingreso");
        if(operationsIncome.length > 0 ){
           const arrayIncomes = operationsIncome.map(el => { return el.money}) ;
           let total = arrayIncomes.reduce(function(acumulador , el ){
               return acumulador + el;
           },0).toString() // lo convierto a string para que lo pueda ver en
        //    total = [total]
        //    console.log(total)
        //    total = total.join("");
        //    console.log(total)
           return res.status(200).send("+" + total)
        }
        return res.status(404).json({error:"No hay total de ingresos"})
    }catch(error){
        res.send(error);
    }
}


const expenditureTotal = async(req,res) =>{
    try{
        const allOperations = await Operation.findAll();
        const operationsExpenditure =  allOperations.filter(el => el.type.toLowerCase() === "egreso");
        if(operationsExpenditure.length > 0 ){
           const arrayExpenditures = operationsExpenditure.map(el => { return el.money}) ;
           let total = arrayExpenditures.reduce(function(acumulador , el ){
               return acumulador + el;
           },0).toString() // lo convierto a string para que lo pueda ver en
           return res.status(200).send("-" + total)
        }
        return res.status(404).json({error:"No hay total de egresos"})
    }catch(error){
        res.send(error);
    }
}


const ingresoTotal = async() =>{
    const allOperations = await Operation.findAll();
    const operationsExpenditure = await  allOperations.filter(el => el.type.toLowerCase() === "ingreso");
    if(operationsExpenditure.length > 0 ){
       const arrayExpenditures = operationsExpenditure.map(el => { return el.money}) ;
       let total = arrayExpenditures.reduce(function(acumulador , el ){
           return acumulador + el;
       },0)
       return total
    }
    return 0
}

const egresoTotal = async() =>{
    const allOperations = await Operation.findAll();
    const operationsExpenditure = await  allOperations.filter(el => el.type.toLowerCase() === "egreso");
    if(operationsExpenditure.length > 0 ){
       const arrayExpenditures = operationsExpenditure.map(el => { return el.money}) ;
       let total = arrayExpenditures.reduce(function(acumulador , el ){
           return acumulador + el;
       },0)
       return total
    }
    return 0
}


const currentBalance = async(req , res) =>{
    try{
        const income = await ingresoTotal();
        const expenditures = await egresoTotal();
        console.log(income);
        console.log(expenditures);
        let balance = income - expenditures;
        balance = balance.toString()
        return res.status(200).send(balance)
    }catch(error){
        res.send(error);
    }
}


module.exports={incomeTotal, expenditureTotal , currentBalance}