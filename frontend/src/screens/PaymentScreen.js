import React, { useState, useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { Form, Button, Col } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { savePaymentMethod } from "../actions/CartActions"
import CheckoutSteps from "../components/CheckoutSteps"

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push("/shipping")
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal")

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    console.log("shipping page save")
    dispatch(savePaymentMethod(paymentMethod))
    history.push("/placeorder")
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h2>Payment Method</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check type="radio" label="PayPal or Credit Card" name="paymentMethod" checked id="PayPal" value="PayPal" onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
