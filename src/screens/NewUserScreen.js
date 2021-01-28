import React from 'react'
import { Container } from 'react-bootstrap'
import NewUserFlow from '../components/newUserFlow/NewUserFlow'

const NewUserScreen = ({}) => {
   return (
      <Container className='d-flex align-items-center flex-column'>
         <h1>New User Flow</h1>
         <NewUserFlow />
      </Container>
   )
}

export default NewUserScreen
