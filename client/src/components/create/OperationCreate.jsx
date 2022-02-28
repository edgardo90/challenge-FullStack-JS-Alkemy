import React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux"
import {Link , useNavigate} from "react-router-dom";
import { postOperation} from "../../actions";


export default function OperationCreate(){
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [data , setData] = useState({
        type: "",
        name: "",
        date: "",
        money:"",
    })

    const type = ["ingreso" , "egreso"]

    function handleRadio(event){
        setData(({
            ...data,
            type: event.target.value
        }))
        console.log(data)
    }

    function handleChange(event){
        setData(({
            ...data,
            [event.target.name] : event.target.value
        }))
        console.log(data)
    }

    function handleSubmit(event){
        event.preventDefault();
        dispatch(postOperation(data) );
        alert("Operacion creada!")
        setData({
            type: "",
            name: "",
            date: "",
            money:"", 
        })
        navigate("/")
    }

    return(
        <div>
            <Link to="/" ><button>Volver al inicio</button> </Link>
            <h1>Agregar una nueva Operacion</h1>
            <form  onSubmit={event => handleSubmit(event)} >
                <div>
                    <label >Tipo :  /</label>
                    {type.map( el =>{
                        return(
                            <label key={el}> {el} 
                                <input
                                 type="radio"
                                 id={el}
                                 name="type"
                                 value={el}
                                 onChange={event => handleRadio(event)}
                                />/
                            </label>
                        )
                    })}
                </div>
                <br />
                <div>
                    <label >Conpeto: </label>
                    <input
                     type="text"
                     value={data.name}
                     name="name"
                     onChange={event => handleChange(event)}
                    />
                </div>
                <br />
                <div>
                    <label >Fecha: </label>
                    <input
                     type="date"
                     name="date"
                     value={data.date}
                     onChange={event => handleChange(event)}
                    />
                </div>
                <br />
                <div>
                    <label >Monto: </label>
                    <input
                     type="number"
                     name="money"
                     value={data.money}
                     onChange={event => handleChange(event)}
                    />
                </div>
                <br />

                <button type="submit"> Agregar operacion </button>
            </form>
        </div>
    )
}
