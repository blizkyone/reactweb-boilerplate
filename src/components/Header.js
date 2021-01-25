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
                     <LinkContainer to='/twitter'>
                        <Nav.Link>Twitter</Nav.Link>
                     </LinkContainer>
                     <LinkContainer to='/facebook'>
                        <Nav.Link>Facebook</Nav.Link>
                     </LinkContainer>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   )
}

export default Header
