import React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux"
import {Link , useNavigate} from "react-router-dom";
import { postOperation} from "../../actions";

import styles from "./css/OperationCreate.module.css"
import SelectCategories from "./SelectCategories";
import SelectType from "./SelectType";


function validate(input){
    const errors={}
    if(!input.name){
        errors.name = "Tienes que ingresar un concepto"
    }
    if(input.name.length > 19){
        errors.name = "Tiene que ser menor de 20 caracteres"
    }
    if(!input.money){
        errors.money = "Tienes que ingresar el monto y solamente numeros"
    }else if(input.money < 1 || (input.money % 1) !== 0  ){
        errors.money= "El monto tiene que ser mayor a 0 y un numero entero"
    }
    return errors
}


export default function OperationCreate(){
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [data , setData] = useState({
        type:"",
        name:"",
        date:"",
        money:"",
        category:""  ,
    })
    const [errors , setErrors] = useState({})

    function handleRadio(event){
        setData(({
            ...data,
            type: event.target.value
        }))
        console.log(data)
    };

    function handleSelect(event){
        setData(({
            ...data,
            category: event.target.value === "nada" ? data.category
            : event.target.value
        }));
        console.log(data)
    };
    
    const errorTypeAndDate = !data.type || !data.date ? 1 : 0 ;
    const errroCategory = data.type === "egreso" && !data.category ? 1 : 0 ;

    function handleChange(event){
        setData(({
            ...data,
            [event.target.name] : event.target.value
        }))
        console.log(data)
        setErrors(validate({
            ...data,
            [event.target.name] : event.target.value
        }))
    }

    if(data.type === "ingreso"){ // si el data.type es igual a "ingreso" seteo el data.category a un string vacio 
        data.category ="";
    }

    function handleSubmit(event){
        event.preventDefault();
        if(Object.values(errors).length > 0 || errorTypeAndDate > 0 || errroCategory >0 ){
            return alert("Observa los errores que estan en color rojo!")
        }
        dispatch(postOperation(data) );
        alert("Operacion creada!")
        setData({
            type: "",
            name: "",
            date: "",
            money:"",
            category:"", 
        })
        navigate("/")
    }



    return(
        <div>
            <div className="dropdown">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label tabindex="0" className="btn btn-ghost btn-circle " for="my-drawer" >
                            <svg id="my-drawer"  xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M4 6h16M4 12h16M4 18h15" /></svg>
                    </label>
                </div> 
                    <div class="drawer-side">
                        <label for="my-drawer" className="drawer-overlay"></label>
                        <ul tabindex="0"  className="menu menu-compact dropdown-content mt-1 p-2 shadow bg-sky-300 rounded-box w-100">
                            <li> <Link to="/" className={styles.home} >Volver al inicio</Link> </li>
                            <li className={styles.ejemplo}  >agrandoBoooooooooooox</li>
                        </ul>
                    </div>
            </div>

            <h1 className={styles.titulo} >Agrega una nueva Operacion</h1>
            <div className={styles.box}>
            <form  onSubmit={event => handleSubmit(event)}  className={styles.formulario} >
                <div>
                    <SelectType handleRadio={handleRadio} />
                    {!data.type &&
                    <p style={{color:"red" ,fontWeight:700 , fontSize:14 }}> Seleciona si el tipo es ingreso o egreso </p>
                     }
                </div>
                <br />
                <div>
                    {data.type === "egreso" &&
                    <SelectCategories handleSelect={handleSelect} />}
                    {!data.category && data.type === "egreso" &&
                    <p style={{color:"red" ,fontWeight:700 , fontSize:14 }}>selecciona una categoria</p>}
                    {data.type === "egreso" && <br/>}
                </div>
                <div>
                    <label >Conpeto: </label>
                    <input
                     placeholder="ingrese..."
                     type="text"
                     value={data.name}
                     name="name"
                     onChange={event => handleChange(event)}
                    />
                    {errors.name && 
                     <p  style={{color: "red" , fontWeight: 700 , fontSize: 14}}  >{errors.name}</p>
                     }
                </div>
                <br />
                <div>
                    <label >Fecha: </label>
                    <input
                     type="date"
                     style={{cursor:"pointer"}}
                     name="date"
                     value={data.date}
                     onChange={event => handleChange(event)}
                    />
                    {!data.date && 
                     <p  style={{color: "red" , fontWeight: 700 , fontSize: 14}}  >Ingresa una fecha</p>
                     }
                </div>
                <br />
                <div>
                    <label >Monto: </label>
                    <input
                     type="number"
                     name="money"
                     placeholder="solamente numeros enteros..."
                     style={{width : "225px", heigth : "1px"}}
                     value={data.money}
                     onChange={event => handleChange(event)}
                    />
                    {errors.money && 
                     <p  style={{color: "red" , fontWeight: 700 , fontSize: 14}}  >{errors.money}</p>
                     }
                </div>
                <br />

                <button disabled={!data.name || !data.money} className={!data.name || !data.money ? styles.btn  : styles.btnCreate} type="submit"> Agregar operacion </button>
            </form>
            </div>
        </div>
    )
}
