
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import AxiosApi from '../utils/api'


export const Register = () => { 

const urlStatic = "http://localhost:8001"
const axios_api = new AxiosApi(urlStatic)

const [data_register, setData_register] = useState({})
const [data_rol, setData_rol] = useState([])
const [data_identificacion, setData_identificacion] = useState([])

  useEffect(()=>{
      axios_api.getAllAxios('api/appPersona/persona/get_grupos')
      .then(function(resp){
        const data = resp
        setData_rol(data)
      })
      .catch(console.error)
  }, [])

  useEffect(()=>{
      axios_api.getAllAxios('api/appConfiguracion/tipo-identificacion/')
      .then(function(resp){
        const data = resp
        setData_identificacion(data)
      })
      .catch(console.error)
  }, [])

  const handleRegister = (event)=>{
      event.preventDefault()
      const headers = {
          'Content-Type': 'application/json'
        }
      axios_api.postAxios('api/appPersona/persona/register_persona', data_register, headers)
      .then(function(resp){
        const data = resp
        console.log(data)
      })
  }

  const handleInputChange = (event)=>{
    setData_register({
        ...data_register,
        [event.target.name] : event.target.value
    })
  }

  return (
    <div className="container mt-4">
        <form onSubmit={handleRegister}>
            <div className="form-row">
                <div className="form-group col-md-3">
                    <label>Nombres</label>
                    <input type="text" name="nombres" onChange={handleInputChange} className="form-control" placeholder="Ingresa tus nombres"/>
                </div>
                <div className="form-group col-md-3">
                    <label>Apellidos</label>
                    <input type="text" name="apellidos" onChange={handleInputChange} className="form-control" placeholder="Ingresa tus apellidos" />
                </div>

                <div className="form-group col-md-3">
                    <label>Email</label>
                    <input type="email" name="correo_electronico"  onChange={handleInputChange} className="form-control" placeholder="Ingresa tu correo"/>
                </div>
                <div className="form-group col-md-3">
                    <label>Direccion</label>
                    <input type="text" name="direccion" onChange={handleInputChange} className="form-control" placeholder="Ingresa tu direccion"/>
                </div>
                
            </div>
            <div className="form-row">
                <div className="form-group col-md-3">
                    <label>Tipo de identificacion</label>
                    <select defaultValue={'DEFAULT'} name="tipoIdentificacion" onChange={handleInputChange} className='form-control'>
                        <option value="DEFAULT" disabled>--Seleccione una identificacion--</option>
                        {
                            data_identificacion.map((item, key)=>{
                                return <option key={key} value={item.id}>{item.descripcion}</option>
                            })
                        }
                    </select>
                </div>

                <div className="form-group col-md-3">
                    <label>Numero de identificacion</label>
                    <input type="text" name="numeroIdentificacion" onChange={handleInputChange} className="form-control" placeholder="Ingresa tu nro de identificacion"/>
                </div>
                <div className="form-group col-md-3">
                    <label>Password</label>
                    <input type="password" name="password" onChange={handleInputChange} className="form-control" placeholder="Ingresa tu password" />
                </div>

                <div className="form-group col-md-3">
                    <label>Edad</label>
                    <input type="number" name="edad" onChange={handleInputChange} className="form-control" placeholder="Ingresa tu edad"  />
                </div>
            </div>
            <div className="form-row">
                    
                 <div className="form-group col-md-3">
                    <label>Telefono</label>
                    <input type="number" name="telefono" onChange={handleInputChange} className="form-control" placeholder="Ingresa tu telefono" />
                </div>

                <div className="form-group col-md-3">
                    <label>Tipo de usuario</label>
                    <select defaultValue={'DEFAULT'} name="rol_persona" onChange={handleInputChange} className='form-control'>
                     <option value="DEFAULT" disabled>--Seleccione un rol--</option>
                        {
                            data_rol.map((item ,key)=>{
                                return <option key={key} value={item.id}>{item.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <button type="submit" className="btn btn-dark">Sign in</button>  
            <Link to="/admin">Registrarse</Link>

        </form>
    </div>
  )
}
