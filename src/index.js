import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from './store'
import { SessionProvider } from './context/SessionContext'
import {
   ApolloProvider,
   ApolloClient,
   createHttpLink,
   InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
   uri: 'https://localhost:4001/graphql',
})

const authLink = setContext((_, { headers }) => {
   // get the authentication token from local storage if it exists
   const token = localStorage.getItem('token')
   // return the headers to the context so httpLink can read them
   return {
      headers: {
         ...headers,
         authorization: token ? `Bearer ${token}` : '',
      },
   }
})

const client = new ApolloClient({
   cache: new InMemoryCache(),
   link: authLink.concat(httpLink),
})

ReactDOM.render(
   <React.StrictMode>
      <ApolloProvider client={client}>
         <SessionProvider>
            <Provider store={store}>
               <App />
            </Provider>
         </SessionProvider>
      </ApolloProvider>
   </React.StrictMode>,
   document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
