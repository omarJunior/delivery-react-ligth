import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{textAlign:'right'}}>
        <Link to="/" className="navbar-brand">Home</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                        Actions
                        </a>
                        <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                           <Link className='nav-link' to="/"> Login</Link>
                           <Link className='nav-link' to="/register">Register</Link>
                        </div>
                    </li>
                </ul>
        </div>
    </nav>
  )
}
