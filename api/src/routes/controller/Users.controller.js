const bcryptjs = require("bcryptjs");
const {User , Operation} = require("../../db.js");

const postUser = async(req , res) =>{
    const{
        email,
        name,
        lastName,
        password,
    } = req.body;
    const emailExists = await User.findOne({
        where:{email}
    });
    if(emailExists){
        return res.status(400).json({error:"ya hay un usuario con ese email"});
    }
    try{
        const userCreate = await bcryptjs.hash(password,10).then(hash =>{
            User.create({
                email,
                name,
                lastName,
                password:hash,
            });
        });
        return res.status(200).send("usuario creado");
    }catch(error){
    res.send(error)
  }
}

const dbUser = async()=>{
    return await User.findAll({
        include:{
            model: Operation,
            attributes: ["id", "name", "money", "date", "type","category", "idUser"],
            through:{
                attributes:[],
            }
        }
    });
}

const getAllUsers = async(req,res) =>{
    try{
        const allUsers = await dbUser();
        return res.status(200).send(allUsers)
    }catch(error){
        res.send(error)
  }
}

const getUserId = async(req , res) =>{
    try{
        const{id} = req.params;
        const allUsers = await dbUser();
        const user = allUsers.find(el => el.id.toLowerCase() === id.toLowerCase() );
        if(user){
            return res.status(200).send(user)
        }
        return res.status(404).json({error:"no se encuentra ese usuario"})
    }catch(error){
        res.send(error)
    }
}



module.exports = {postUser , getAllUsers, getUserId };