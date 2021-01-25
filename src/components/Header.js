import React, { useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

const initialUserInfo = {
   name: 'Paolo Lago',
   isAdmin: true,
}

const Header = () => {
   const [userInfo, setUserInfo] = useState(initialUserInfo)
   return (
      <header>
         <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
               <LinkContainer to='/'>
                  <Navbar.Brand>Social Info</Navbar.Brand>
               </LinkContainer>
               <Navbar.Toggle aria-controls='basic-navbar-nav' />
               <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='ml-auto'>
                     <LinkContainer to='/cart'>
                        <Nav.Link>
                           <i className='fas fa-shopping-cart'></i> Cart
                        </Nav.Link>
                     </LinkContainer>
                     {userInfo?.name ? (
                        <NavDropdown title='Username' id='username'>
                           <LinkContainer to='/profile'>
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                           </LinkContainer>

                           <NavDropdown.Item
                              onClick={(_) => console.log('Logout')}
                           >
                              Logout
                           </NavDropdown.Item>
                        </NavDropdown>
                     ) : (
                        <LinkContainer to='/login'>
                           <Nav.Link>
                              <i className='fas fa-user'></i> Sign In
                           </Nav.Link>
                        </LinkContainer>
                     )}
                     {userInfo && userInfo.isAdmin && (
                        <NavDropdown title='Admin' id='admin-menu'>
                           <LinkContainer to='/admin/userlist'>
                              <NavDropdown.Item>Users</NavDropdown.Item>
                           </LinkContainer>
                           <LinkContainer to='/admin/productlist'>
                              <NavDropdown.Item>Products</NavDropdown.Item>
                           </LinkContainer>
                           <LinkContainer to='/admin/orderlist'>
                              <NavDropdown.Item>Orders</NavDropdown.Item>
                           </LinkContainer>
                        </NavDropdown>
                     )}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   )
}

export default Header
