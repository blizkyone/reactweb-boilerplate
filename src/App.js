import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import FacebookScreen from './screens/FacebookScreen'
import TwitterScreen from './screens/TwitterScreen'

const App = () => {
   return (
      <Router>
         <Header />
         <main className='py-3'>
            <Container>
               <Route path='/' component={HomeScreen} exact />
               <Route path='/twitter' component={TwitterScreen} exact />
               <Route path='/facebook' component={FacebookScreen} exact />
            </Container>
         </main>
         <Footer />
      </Router>
   )
}

export default App
