import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Spinner, Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import { listProducts } from '../actions/productListAction'

const initialLoading = {
   loading: false,
   error: false,
}

const HomeScreen = () => {
   const [loading, setLoading] = useState(initialLoading)
   const dispatch = useDispatch()

   const productList = useSelector((state) => state.productList)
   const { load, error, products } = productList

   useEffect(() => {
      dispatch(listProducts())
   }, [dispatch])

   return (
      <>
         <h1>User Login</h1>
         {loading.loading ? (
            <Spinner animation='border' />
         ) : loading.error ? (
            <Message variant='danger'>Error simulation</Message>
         ) : (
            <Row>
               <Col>
                  <Form>
                     <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' />
                        <Form.Text className='text-muted'>
                           We'll never share your email with anyone else.
                        </Form.Text>
                     </Form.Group>

                     <Form.Group controlId='formBasicPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Password' />
                     </Form.Group>
                     <Form.Group controlId='formBasicCheckbox'>
                        <Form.Check type='checkbox' label='Check me out' />
                     </Form.Group>
                     <Button variant='primary' type='submit'>
                        Submit
                     </Button>
                  </Form>
               </Col>
            </Row>
         )}
      </>
   )
}

export default HomeScreen
