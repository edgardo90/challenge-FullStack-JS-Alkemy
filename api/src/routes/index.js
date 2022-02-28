const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {postOperation,
    getAllOpetations ,
    getIdOperation , 
    deleteOperation ,
    modifyOperation,
    getAllIncome , 
    getAllEgress} = require("./controller/Operations.controller");

const {incomeTotal , expenditureTotal , currentBalance} = require("./controller/Balance.controller");

const router = Router();

router.post("/createOperation" ,postOperation);
router.get("/operations", getAllOpetations);
router.get("/operations/:idOperation",getIdOperation );
router.delete("/operations/:idOperation", deleteOperation);
router.put("/operations/:idOperation", modifyOperation);
// router.get("/operationsIncome", getAllIncome);
// router.get("/opertionsExpenditures" , getAllEgress);

router.get("/ingresos" , incomeTotal);
router.get("/egresos" , expenditureTotal);
router.get("/balance", currentBalance)




module.exports = router;
