import React, { useState, useEffect } from "react";
// react-bootstrap components
import { Badge, Button, Card, Form, Navbar, Nav, Container, Row, Col} from "react-bootstrap";
import Swal from "sweetalert2";
import AxiosApi from "utils/api";
import ciudades from "utils/ciudades";




function User() {

const urlStatic = "http://localhost:8001"
const axios_api = new AxiosApi(urlStatic)

  const [ data_profile, setData_profile ] = useState({})
  const [token_, setToken] = useState("")

  useEffect(()=>{
    const token = (localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : ""
    const id = (localStorage.getItem('id')) ? JSON.parse(localStorage.getItem('id')) : ""
    setToken(token)
    const headers = {
      //Token de authenticacion
      'Authorization': `Bearer ${token}`,
    }

    axios_api.getOneAxiosParams('api/appPersona/user', 'id_user', id, headers)
    .then( function(resp){
      const data = resp
      setData_profile(data[0])
    })
    .catch(console.error)

  }, [])

  const handleInputChange = (e)=>{
    setData_profile({
      ...data_profile,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdatedProfile = (e)=>{
    e.preventDefault()
    console.log(data_profile)
    console.log(token_)
    /* const headers = {
      //Token de authenticacion
      'Authorization': `Bearer ${token}`,
    } */
    
    //axios_api.putAxios("api/appPersona/user", data_profile.id, data_profile, )
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Editar perfil</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleUpdatedProfile}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Rol(DISABLED)</label>
                        <Form.Control
                          disabled
                          defaultValue={data_profile.grupo}
                          onChange={handleInputChange}
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          defaultValue={data_profile.username}
                          onChange={handleInputChange}
                          name="username"
                          placeholder="Username"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Correo electronico
                        </label>
                        <Form.Control
                          defaultValue={data_profile.email}
                          onChange={handleInputChange}
                          name="email"
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Nombres</label>
                        <Form.Control
                          defaultValue={data_profile.first_name}
                          onChange={handleInputChange}
                          name="first_name"
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Apellidos</label>
                        <Form.Control
                          defaultValue={data_profile.last_name}
                          onChange={handleInputChange}
                          name="last_name"
                          placeholder="Last Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Tipo de identificacion</label>
                        <Form.Control
                          defaultValue={data_profile.tipoIdentificacion}
                          onChange={handleInputChange}
                          name="tipoIdentificacion"
                          placeholder="Tipo identificacion"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Numero de identificacion</label>
                        <Form.Control
                          defaultValue={data_profile.numeroIdentificacion}
                          onChange={handleInputChange}
                          name="numeroIdentificacion"
                          placeholder="Numero de identificacion"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Edad</label>
                        <Form.Control
                          defaultValue={data_profile.edad}
                          onChange={handleInputChange}
                          name="edad"
                          placeholder="Edad"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                     <Form.Group>
                        <label>Direccion</label>
                        <Form.Control
                          defaultValue={data_profile.direccion}
                          onChange={handleInputChange}
                          name="direccion"
                          placeholder="Direccion"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col className="pl-3" md="4">
                      <Form.Group>
                        <label>Ciudad</label>
                        <Form.Control as="select" name="ciudad" custom onChange={handleInputChange} ref={data_profile.valor}>
                          {
                              ciudades.map((item ,key)=>{
                                  return <option key={key} value={item.valor}>{item.ciudad}</option>
                              })
                          }
                        </Form.Control>
                      </Form.Group>
                      
                    </Col>


                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Telefono</label>
                        <Form.Control
                          defaultValue={data_profile.telefono}
                          onChange={handleInputChange}
                          name="telefono"
                          placeholder="Telefono"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                      
                    </Col>

                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Codigo postal</label>
                        <Form.Control
                          defaultValue={data_profile.codigo_postal}
                          onChange={handleInputChange}
                          name="codigo_postal"
                          placeholder="Codigo postal"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                      
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Acerca de mi</label>
                        <Form.Control
                          cols="80"
                          defaultValue={data_profile.descripcion}
                          onChange={handleInputChange}
                          name="descripcion"
                          placeholder="Ingresa una descripcion..."
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Actualizar Perfil
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={
                    require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                      .default
                  }
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-3.jpg").default}
                    ></img>
                    <h5 className="title">{data_profile.first_name} {data_profile.last_name}</h5>
                  </a>
                  <p className="description">{data_profile.username}</p>
                </div>
                <p className="description text-center">
                {data_profile.descripcion}
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
