import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Container, Row, Col } from 'react-bootstrap'

const MapScreen = () => {
   return (
      <div style={{ width: '80vw', height: '80vh' }}>
         <GoogleMapReact
            bootstrapURLKeys={{
               key: process.env.REACT_APP_GOOGLE_API_KEY,
            }}
            defaultCenter={{
               lat: 59.95,
               lng: 30.33,
            }}
            defaultZoom={11}
         />
      </div>
   )
}

export default MapScreen
