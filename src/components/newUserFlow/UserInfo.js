import React, { useState, useEffect } from 'react'
import validator from 'validator'
import moment from 'moment'
import { Form, Button, Col } from 'react-bootstrap'

const UserInfo = ({
   name,
   setName,
   gender,
   setGender,
   birthDate,
   setBirthDate,
   setStage,
   handleCreateUser,
}) => {
   const [maleSelected, setMaleSelected] = useState(false)
   const [femaleSelected, setFemaleSelected] = useState(false)
   const [day, setDay] = useState('')
   const [month, setMonth] = useState('')
   const [year, setYear] = useState('')

   const [birthDateError, setBirthDateError] = useState()
   const [nameError, setNameError] = useState()
   const [genderError, setGenderError] = useState()

   useEffect(() => {
      console.log(gender)
   }, [gender])

   const nameChange = (e) => setName(e.target.value)
   const selectMale = () => {
      setFemaleSelected(false)
      setMaleSelected(true)
      setGender('male')
   }
   const selectFemale = () => {
      setMaleSelected(false)
      setFemaleSelected(true)
      setGender('female')
   }

   const dayChange = (e) => {
      setDay(e.target.value)
      setBirthDate(
         moment(`${year}-${month}-${e.target.value}`, 'YYYY-M-DD')
            .valueOf()
            .toString()
      )
   }

   const monthChange = (e) => {
      setMonth(e.target.value)
      setBirthDate(
         moment(`${year}-${e.target.value}-${day}`, 'YYYY-M-DD')
            .valueOf()
            .toString()
      )
   }

   const yearChange = (e) => {
      setYear(e.target.value)
      setBirthDate(
         moment(`${e.target.value}-${month}-${day}`, 'YYYY-M-DD')
            .valueOf()
            .toString()
      )
   }

   const createUser = (e) => {
      e.preventDefault()
      if (
         name &&
         gender &&
         validator.isNumeric(year) &&
         validator.isNumeric(month) &&
         validator.isNumeric(day) &&
         !(moment().year() - year < 0) &&
         !(moment().year() - year > 120)
      ) {
         console.log('Ready to save user')
         handleCreateUser()
         return
      }

      if (
         !validator.isNumeric(day) ||
         !validator.isNumeric(month) ||
         !validator.isNumeric(year)
      ) {
         setBirthDateError('Must use numbers to represent dates')
      } else if (moment().year() - year < 0) {
         setBirthDateError(
            "You are waaaaay too young for this platform dear project in God's mind"
         )
      } else if (moment().year() - year > 120) {
         setBirthDateError(
            "You might be a miracle of modern medicine but I'm not buying"
         )
      } else {
         setBirthDateError(null)
      }
      if (!gender) {
         setGenderError('Must select a gender')
      } else {
         console.log(gender)
         setGenderError(null)
      }
      if (!name) {
         setNameError('Must specify name')
      } else {
         setNameError(null)
      }
   }

   return (
      <Form onSubmit={createUser}>
         <Form.Group>
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
               type='text'
               placeholder='Full Name'
               value={name}
               onChange={nameChange}
            />
            <Form.Text style={{ color: 'red' }}>{nameError}</Form.Text>
         </Form.Group>
         <Form.Row>
            <Form.Group as={Col}>
               <Form.Label as='legend' column>
                  Gender
               </Form.Label>
            </Form.Group>
            <Form.Group as={Col}>
               <Form.Check
                  checked={maleSelected}
                  type='radio'
                  label='male'
                  name='maleGender'
                  id='maleGender'
                  onChange={selectMale}
               />
               <Form.Check
                  checked={femaleSelected}
                  type='radio'
                  label='female'
                  name='femaleGender'
                  id='femaleGender'
                  onChange={selectFemale}
               />
            </Form.Group>
         </Form.Row>
         <Form.Text style={{ color: 'red' }}>{genderError}</Form.Text>
         <Form.Label>Birth date</Form.Label>
         <Form.Row>
            <Form.Group as={Col}>
               <Form.Control
                  type='number'
                  placeholder='DD'
                  value={day}
                  onChange={dayChange}
               />
            </Form.Group>
            <Form.Group as={Col}>
               <Form.Control
                  type='number'
                  placeholder='MM'
                  value={month}
                  onChange={monthChange}
               />
            </Form.Group>
            <Form.Group as={Col}>
               <Form.Control
                  type='number'
                  placeholder='YYYY'
                  value={year}
                  onChange={yearChange}
               />
            </Form.Group>
         </Form.Row>
         <Form.Text style={{ color: 'red' }}>{birthDateError}</Form.Text>
         <Button className='mx-3' variant='danger' onClick={(_) => setStage(0)}>
            Back
         </Button>
         <Button
            className='mx-3'
            variant='primary'
            type='submit'
            onClick={createUser}
         >
            Submit
         </Button>
      </Form>
   )
}

export default UserInfo
