import React, { useContext } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'
import { SessionContext } from '../context/SessionContext'
import { auth } from '../firebase'

const Header = () => {
   const { userProfile } = useContext(SessionContext)

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
                     <LinkContainer to='/map'>
                        <Nav.Link>Map</Nav.Link>
                     </LinkContainer>
                     <Button onClick={(_) => console.log(userProfile)}>
                        userProfile
                     </Button>
                     <Button onClick={(_) => console.log(auth.currentUser)}>
                        firebaseProfile
                     </Button>
                     {userProfile ? (
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
                     {userProfile && userProfile.isAdmin && (
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
