import React from "react";
import { useEffect, useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../actions";

export default function Login(){
    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.users);

    useEffect(()=>{
        dispatch(getUsers());
    },[dispatch]);
    console.log(allUsers);

    const [data , setData] = useState({
        email:"",
        password:"",
    });

    function handleChange(event){
        setData(({
            ...data,
            [event.target.name] : event.target.value
        }));
        // console.log(data)
    }
    // console.log(data.email)
    // console.log(data.password)

    const userEmail = data.email && allUsers.find(el => el.email.toLowerCase() === data.email.toLocaleLowerCase() )
    // const userPass = data.password && allUsers.find(el => el.password.toLowerCase() === data.password.toLocaleLowerCase() )
    console.log(userEmail)
    // console.log(userPass)
    // const {id} = userEmail && userEmail
    // console.log(id)



    return(
        <div>
            <h1>Iniciar sesion</h1>
            <form action="">
                <div>
                    <label >Ingresa email: </label>
                    <input
                     type="text"
                     name="email"
                     style={{width : "200px", heigth : "1px"}}
                     value={data.email}
                     onChange={event =>handleChange(event)}
                    />
                </div>
                <br />
                <div>
                    <label >Ingresa password: </label>
                    <input
                     type="password"
                     name="password"
                     style={{width : "200px", heigth : "1px"}}
                     value={data.password}
                     onChange={event => handleChange(event)}
                    />
                </div>
            </form>
            <Link to={ !userEmail ? "/home/2" : `/home/${userEmail.id}`} ><button>Ingresar !fase de prueba¡</button></Link>
        </div>
    )
}