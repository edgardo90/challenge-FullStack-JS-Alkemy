const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {postOperation,
    getAllOpetations ,
    getIdOperation , 
    deleteOperation ,
    modifyOperation,
    getAllIncome , 
    getAllEgress,
    getFilterType,
    getFilterCategory,
} = require("./controller/Operations.controller");

const {incomeTotal , expenditureTotal , currentBalance} = require("./controller/Balance.controller");

const router = Router();

router.post("/createOperation" ,postOperation);
router.get("/operations", getAllOpetations);
router.get("/operations/:idOperation",getIdOperation );
router.delete("/operations/:idOperation", deleteOperation);
router.put("/operations/:idOperation", modifyOperation);
router.get("/operationsIncome", getAllIncome); // ruta para prueba interna
router.get("/opertionsExpenditures" , getAllEgress);// ruta para prueba interna
router.get("/filterOperations/:type",getFilterType);
router.get("/filterCategory/:category",getFilterCategory);


router.get("/ingresos" , incomeTotal);
router.get("/egresos" , expenditureTotal);
router.get("/balance", currentBalance)




module.exports = router;
