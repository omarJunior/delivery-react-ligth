import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {

  const [ fullname, setFull_name ] = useState("")

  useEffect(()=>{
    const full_name = JSON.parse(localStorage.getItem('full_name'))
    setFull_name(full_name)

  }, [])

  const cerrarSesion = (id, username, fullname, token, rol )=>{
    localStorage.removeItem(id)
    localStorage.removeItem(username)
    localStorage.removeItem(fullname)
    localStorage.removeItem(token)
    localStorage.removeItem(rol)
    window.location = "/"
  }

  return (
        <>
            <Link to="/" onClick={() => cerrarSesion('id', 'username', 'full_name', 'token', 'rol')}>Cerrar Sesion</Link>
            <div>
              <p>Bienvenido {fullname}</p>
            </div>
        </>
      
  )
}
