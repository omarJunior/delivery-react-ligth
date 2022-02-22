import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AxiosApi from '../utils/api'
import Swal from 'sweetalert2'

export const Login = () => {
  const urlStatic = "http://localhost:8001"
  const axios_api = new AxiosApi(urlStatic)

  const [data_login, setData_login] = useState({})

  const guardarLocalStorage = (id, username, fullname, token, rol)=>{
    localStorage.setItem('id', JSON.stringify(id))
    localStorage.setItem('username', JSON.stringify(username))
    localStorage.setItem('full_name', JSON.stringify(fullname))
    localStorage.setItem('token', JSON.stringify(token))
    localStorage.setItem('rol', JSON.stringify(rol))
  }
  
  const handleInputLogin = (e)=>{
    e.preventDefault()
    const headers = {
      'Content-Type': 'application/json'
    }
    axios_api.postAxios('api/auth-user', data_login, headers)
    .then( function(resp){
      const data = resp
      if(data.datos){
        guardarLocalStorage(
          data.datos.id, 
          data.datos.username,
          data.datos.fullname, 
          data.datos.access_token, 
          data.datos.roles[0]
        )
        return window.location = "/admin"
      }else{
        return Swal.fire({
          icon: 'error',
          text: data.error,
          timer: 2000
        })
      }
    })
  }
  

  const handleInputChange = (e)=>{
    setData_login({
      ...data_login,
      [e.target.name] : e.target.value
    })
  }

  return (
    <div className='container mt-4'>
        <div className="row">
            <div className="col-md-5 mx-auto">
            <div id="first">
                <div className="myform form ">
                  <div className="logo mb-3">
                    <div className="col-md-12 text-center">
                        <img id="logo_compra" src={require("assets/img/logo_compras.png").default} alt="logo_compras.png" title='Logo compra'/>
                    </div>
                  </div>
                  <form onSubmit={handleInputLogin}>
                    <div className="form-group">
                      <label htmlFor="">Email address</label>
                      <input type="text" name="username"  onChange={handleInputChange} className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" name="password" id="password"  onChange={handleInputChange} className="form-control" aria-describedby="emailHelp" placeholder="Enter Password" />
                    </div>
                    <div className="form-group">
                      <p className="text-center">By signing up you accept our <a href="#" id="terminos_uso">Terms Of Use</a></p>
                    </div>
                    <div className="col-md-12 text-center ">
                      <button type="submit" className=" btn btn-block mybtn btn-dark tx-tfm">Login</button>
                    </div>
                    <div className="col-md-12 ">
                      <div className="login-or">
                          <hr className="hr-or"/>
                          <span className="span-or">or</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <p className="text-center">Don't have account? <Link to="/register">Sign up here</Link></p>
                    </div>
                </form>
                </div>
            </div>  
          </div>
        </div>
    </div>
  )
}
