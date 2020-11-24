import React, { useState, useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { Form, Button } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { saveShippingAddress } from "../actions/CartActions"
import CheckoutSteps from "../components/CheckoutSteps"

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    console.log("shipping page save")
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push("/payment")
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h2>Shipping Address</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control value={address} type="text" required placeholder="Enter the address" onChange={(e) => setAddress(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control value={city} required type="text" placeholder="Enter the city" onChange={(e) => setCity(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control value={postalCode} type="text" required placeholder="Enter the postal code" onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control value={country} type="text" required placeholder="Enter the country" onChange={(e) => setCountry(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
