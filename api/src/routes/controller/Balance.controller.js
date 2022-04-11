const {Operation} = require("../../db.js");

const incomeTotal = async(req,res , next) =>{
    try{
        const allOperations = await Operation.findAll();
        const operationsIncome =  allOperations.filter(el => el.type.toLowerCase() === "ingreso");
        if(operationsIncome.length > 0 ){
           const arrayIncomes = operationsIncome.map(el => { return el.money}) ;
           let total = arrayIncomes.reduce(function(acumulador , element ){
               return acumulador + element;
           },0).toString() // lo convierto a string para que lo pueda ver en postman
        //    total = [total]
        //    console.log(total)
        //    total = total.join("");
        //    console.log(total)
           return res.status(200).send("+" + total)
        }
        return res.status(200).send("0")
    }catch(error){
        next(error)
        res.send(error);
    }
}


const expenditureTotal = async(req,res, next) =>{
    try{
        const allOperations = await Operation.findAll();
        const operationsExpenditure =  allOperations.filter(el => el.type.toLowerCase() === "egreso");
        if(operationsExpenditure.length > 0 ){
           const arrayExpenditures = operationsExpenditure.map(el => { return el.money}) ;
           let total = arrayExpenditures.reduce(function(acumulador , element ){
               return acumulador + element;
           },0).toString() // lo convierto a string para que lo pueda ver en postman
           return res.status(200).send("-" + total)
        }
        return res.status(200).send("0")
    }catch(error){
        next(error)
        res.send(error);
    }
}


const incomeAmount = async() =>{
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

const expensesAmount = async() =>{
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


const currentBalance = async(req , res, next) =>{
    try{
        const income = await incomeAmount();
        const expenses = await expensesAmount();
        let balance = income - expenses;
        balance = balance.toString()
        return res.status(200).send(balance)
    }catch(error){
        next(error)
        res.send(error);
    }
}


module.exports={incomeTotal, expenditureTotal , currentBalance}