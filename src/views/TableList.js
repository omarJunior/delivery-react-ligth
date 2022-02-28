import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import AxiosApi from "utils/api";
import Swal from "sweetalert2";

function TableList() {

  const urlStatic = "http://localhost:8080"
  const axios_api = new AxiosApi(urlStatic)

  const [ productos, setProductos ] = useState([])
  const [ facturas, setFacturas ] = useState([])
  const [ token_, setToken_ ] = useState([])

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

  }, [])

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

  return (
    <>
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
                      <th className="border-0">NRO comprobante</th>
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



