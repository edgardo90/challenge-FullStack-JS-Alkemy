import React from "react";
import { useEffect, useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import {  useNavigate, Link } from "react-router-dom";
import { getUsers } from "../../actions";
import { useAuth } from "../AuthProvider";

import stylesCreate from "../create/css/OperationCreate.module.css"


const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i ;

function validate(input){
    const errors = {};
    if( !regexEmail.test(input.email) ){
        errors.email = "el formato de email es incorrecto "
    }
    if(!input.password){
        errors.password = "ingrese password"
    }
    if(input.password.length < 6 || input.password.length > 12 ){
        errors.password = "la contraseña debe contener entre 6 y 12 caracteres"
    }
    return errors
}

export default function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const {loginFirebase ,} = useAuth()
    const allUsers = useSelector(state => state.users);

    useEffect(()=>{
        dispatch(getUsers());
    },[dispatch]);
    console.log(allUsers);

    const [data , setData] = useState({
        email:"",
        password:"",
    });

    const [errors , setErrors ] = useState({});

    function handleChange(event){
        setData(({
            ...data,
            [event.target.name] : event.target.value
        }));
        // console.log(data)
        setErrors(validate({
            ...data,
            [event.target.name] : event.target.value
        }));
    };

    const userEmail = data.email && allUsers.find(el => el.email.toLowerCase() === data.email.toLocaleLowerCase() )

    async function handleSubmit(event){
        if(!userEmail || userEmail.password !== data.password){
        return  alert("email o contraseña incorrecto")
        }
        event.preventDefault();
        await loginFirebase(data.email , data.password); // me logueo con firebase
        navigate("/home");
    }


    return(
        <div>
            <h1 className={stylesCreate.titulo} >Iniciar sesion</h1>
            <form onSubmit={event => handleSubmit(event)} className={stylesCreate.formulario} >
                <div>
                    <label >Ingresa email: </label>
                    <input
                    //  required
                     type="text"
                     name="email"
                     style={{width : "200px", heigth : "1px"}}
                     value={data.email}
                     onChange={event =>handleChange(event)}
                    />
                </div>
                {errors.email && 
                     <p  style={{color: "red" , fontWeight: 700 , fontSize: 14}}  >{errors.email}</p>
                     }
                <br />
                <div>
                    <label >Ingresa password: </label>
                    <input
                    //  required
                     type="password"
                     name="password"
                     style={{width : "200px", heigth : "1px"}}
                     value={data.password}
                     onChange={event => handleChange(event)}
                    />
                </div>
                {errors.password && 
                     <p  style={{color: "red" , fontWeight: 700 , fontSize: 14}}  >{errors.password}</p>
                     }
                <br />
                <button type="submit" className={ stylesCreate.btnCreate} style={{marginLeft: "100px"}} >
                     INGRESAR
                </button>
            </form>

            <Link to="/registrer" ><p className={stylesCreate.register}  >No tienes usuario? Registrarse aqui</p></Link>
        </div>
    )
}