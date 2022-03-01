import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
// react-bootstrap components
import { Button, FormGroup, Modal, ModalBody, ModalFooter, Input, Label, ModalHeader} from 'reactstrap'
import { Card, Table, Container, FormControl , Row, Col,} from "react-bootstrap";

import AxiosApi from "utils/api";
import Swal from "sweetalert2";
import { tamanios } from "utils/ciudades";

function TableList() {

  const urlStatic = "http://localhost:8080"
  const axios_api = new AxiosApi(urlStatic)

  const [ productos, setProductos ] = useState([])
  const [ facturas, setFacturas ] = useState([])
  const [ token_, setToken_ ] = useState([])
  const [ modal_state_product, setModal_state_product ] = useState(false)
  const [ modal_state_devoice, setModal_state_devoice ] = useState(false)
  const [ data, setData ] = useState({})
  const [ rubroData, setRubroData ] = useState([])
  const [ stocksData, setStocksData ] = useState([])

  useEffect(()=>{
    const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : ""
    setToken_(token)
    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    axios_api.getAllAxios('api/appFactura/producto/', headers)
    .then( function(resp){
      const data = resp
      setProductos(data)
    })
    .catch(console.error)

   /* ************************ */ 
   axios_api.getAllAxios('api/appFactura/factura/', headers)
   .then( function(resp){
     const data = resp
     setFacturas(data)
   } )
   .catch(console.error)

    /* ************************ */ 
    axios_api.getAllAxios('api/appConfiguracion/rubro/', headers)
   .then( function(resp){
     const data = resp
     setRubroData(data)
   } )

   /* ************************ */ 
   axios_api.getAllAxios('api/appConfiguracion/stock/', headers)
   .then( function(resp){
     const data = resp
     setStocksData(data)
   } )

  }, [])

  const openModalProduct = ()=>{
    setModal_state_product(true)
  } 

  const closeModalProduct = ()=>{
    setModal_state_product(false)
  }

  const openModalDevoice = ()=>{
    setModal_state_devoice(true)
  } 

  const closeModalDevoice = ()=>{
    setModal_state_devoice(false)
  }

  const handleInputChange = (e)=>{
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }


  const handleDeleteProduct = (e, id)=>{ 
    e.preventDefault()
    const headers = {'Authorization': `Bearer ${token_}`}
      Swal.fire({
        text: '¿Estas seguro, no podras deshacer los cambios?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrarlo'
    })
    .then( async(result)=>{
      if (result.isConfirmed){
        //Logica para eliminar el referido  
          await axios_api.deleteAxios('api/appFactura/producto', id, headers)
          .then( (data) => {
            if(data == 204){
              Swal.fire({
                  icon: "success",
                  text: "Producto eliminado",
                  showConfirmButton: false,
                  timer: 1500
                }
              )
              setTimeout(() => {
                return window.location.href = "http://localhost:3000/admin/table"
              }, 2000);
            }
          })
        }else{
          return Swal.fire({
            icon:'warning',
            text: 'Tu registro sigue a salvo',
            timer: 1500
          })
      }
    } )
    .catch(console.error)
  }

  const handleDeleteInvoice = (e, id)=>{
    e.preventDefault()
    const headers = {'Authorization': `Bearer ${token_}`}
      Swal.fire({
        text: '¿Estas seguro, no podras deshacer los cambios?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrarlo'
    })
    .then( async(result)=>{
      if (result.isConfirmed){
        //Logica para eliminar el referido  
          await axios_api.deleteAxios('api/appFactura/factura', id, headers)
          .then( (data) => {
            if(data == 204){
              Swal.fire({
                  icon: "success",
                  text: "Factura eliminada",
                  showConfirmButton: false,
                  timer: 1500
                }
              )
              setTimeout(() => {
                return window.location.href = "http://localhost:3000/admin/table"
              }, 2000);
            }
          })
        }else{
          return Swal.fire({
            icon:'warning',
            text: 'Tu registro sigue a salvo',
            timer: 1500
          })
      }
    } )
    .catch(console.error)
  }

  const handleSubmitProduct = (e)=>{
    e.preventDefault()
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token_}`}
    axios_api.postAxios('api/appFactura/producto/register_producto', data, headers)
    .then( function(resp){
      const data = resp
      console.log(data)
    } )
    .catch(console.error)
  }

  return (
    <>
      <div className="container mb-4">
        <div style={{marginRight: '10px', display:'inline-block'}}>
          <Button Button onClick={()=> openModalProduct()} className="btn btn-success">producto+</Button>
            <Modal isOpen={modal_state_product} >
                <ModalHeader>
                    Inserta el producto!
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="placa">Descripcion</Label>
                        <Input onChange={handleInputChange}  type="text" id="descripcion" name="descripcion"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="modelo">Costo</Label>
                        <Input onChange={handleInputChange} type="text" id="costo" name="costo"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="marca">Precio sin iva</Label>
                        <Input onChange={handleInputChange} type="number" id="precio_sin_iva" name="precio_sin_iva"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="color">Precio final</Label>
                        <Input onChange={handleInputChange} type="number" id="precio_final" name="precio_final"></Input>
                    </FormGroup>
                    <FormGroup>
                        <FormControl 
                            as="select" 
                            name="id_rubro"
                            onChange={handleInputChange}
                            defaultValue={'DEFAULT'}>
                            <option value="DEFAULT" disabled>--Seleccione un rubro--</option>
                              {
                                  rubroData.map((item ,key)=>{
                                      return <option key={key} value={item.id}>{item.descripcion}</option>
                                  })
                              }
                        </FormControl>
                    </FormGroup>

                    <FormGroup>
                        <FormControl 
                            as="select" 
                            name="id_stock"
                            onChange={handleInputChange}
                            defaultValue={'DEFAULT'}>
                            <option value="DEFAULT" disabled>--Seleccione un stock--</option>
                              {
                                  stocksData.map((item ,key)=>{
                                      return <option key={key} value={item.id}>{item.stock}</option>
                                  })
                              }
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                      <FormControl 
                          as="select" 
                          name="tamanio"
                          onChange={handleInputChange}
                          defaultValue={'DEFAULT'}>
                          <option value="DEFAULT" disabled>--Seleccione un tamaño--</option>
                            {
                                tamanios.map((item ,key)=>{
                                    return <option key={key} value={item.valor}>{item.tamanio}</option>
                                })
                            }
                        </FormControl>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" className="btn btn-dark" onClick={(e)=> handleSubmitProduct(e)}>Insertar datos</Button>
                    <Button className="btn btn-dark" onClick={closeModalProduct}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </div>


        <div style={{marginRight: '10px', display:'inline-block'}}>
          <Button Button onClick={()=> openModalDevoice()} className="btn btn-success">factura+</Button>  
         {/*  <Modal isOpen={modal_state_devoice} >
                <ModalHeader>
                    Inserta la factura!
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="placa">Placa</Label>
                        <Input type="text" id="placa" name="placa"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="modelo">Modelo</Label>
                        <Input type="text" id="modelo" name="modelo"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="marca">Marca</Label>
                        <Input type="text" id="marca" name="marca"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="color">Color</Label>
                        <Input type="text" id="color" name="color"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="precio">Precio</Label>
                        <Input type="email" id="precio" name="precio"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="descripcion">Descripcion</Label>
                        <Input type="text" id="descripcion" name="descripcion"></Input>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-dark" onClick={""}>Insertar datos</Button>
                    <Button className="btn btn-dark" onClick={closeModalDevoice}>Cerrar</Button>
                </ModalFooter>
            </Modal> */}
        </div>  
      </div>

      {/* Tablas */}
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4" style={{textAlign:'center'}}>Tabla de productos</Card.Title>
                <p className="card-category">
                  <em>Productos de la gestion de compras</em>
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Descripcion</th>
                      <th className="border-0">Costo</th>
                      <th className="border-0">precio_final</th>
                      <th className="border-0">Rubro</th>
                      <th className="border-0">Stock</th>
                      <th className="border-0">Tamaño</th>
                      <th className="border-0">Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      productos.map((item, key)=>{
                        return <>
                          <tr key={key}>
                            <td>{item.descripcion}</td>
                            <td>{item.costo}</td>
                            <td>{item.precio_final}</td>
                            <td>{item.obj_rubro}</td>
                            <td>{item.obj_stock}</td>
                            <td>{item.tamanio}</td>
                            <td>
                              <Link title={item.id}><i className="fas fa-edit"></i></Link>
                              <Link title={item.id} onClick={(e)=> handleDeleteProduct(e, item.id)}><i className="fas fa-trash"></i></Link>
                            </td>
                          </tr>
                        
                        </>
                      })
                    }
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4" style={{textAlign:'center'}}>Tabla de facturas</Card.Title>
                <p className="card-category">
                <em>Facturas de la gestion de compras</em>
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">Nro comprobante</th>
                      <th className="border-0">Fecha</th>
                      <th className="border-0">Cliente</th>
                      <th className="border-0">Forma de pago</th>
                      <th className="border-0">Iva</th>
                      <th className="border-0">Descuento</th>
                      <th className="border-0">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                   {
                     facturas.map((item, key)=>{
                      return <>
                        <tr key={key}>
                          <td>{item.nro_comprobante}</td>
                          <td>{item.fecha}</td>
                          <td>{item.obj_cliente}</td>
                          <td>{item.obj_forma_pago}</td>
                          <td>{item.iva}%</td>
                          <td>{item.descuento}</td>
                          <td>{item.total}</td>
                          <td>
                            <Link title={item.id} ><i className="fas fa-edit"></i></Link>
                            <Link title={item.id} onClick={(e)=> handleDeleteInvoice(e, item.id)} ><i className="fas fa-trash"></i></Link>
                          </td>
                        </tr>
                    </>
                     })
                   }
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;



