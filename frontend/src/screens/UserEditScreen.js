import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails } from "../actions/UserActions"
import { Form, Button, Row, Col } from "react-bootstrap"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { USER_UPDATE_RESET } from "../constants/UserConstants"
import { updateUser } from "../actions/UserActions"

const UserEditScreen = ({ match, history }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

  const userId = match.params.id
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push("/admin/userList")
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        console.log("userDetails", user)
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, history, successUpdate, user, userId])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: user._id, name, email, isAdmin }))
    console.log("form submit data")
  }
  return (
    <FormContainer>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" value={name} placeholder="Enter the name" onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control value={email} type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="isAdmin">
            <Form.Check type="checkbox" checked={isAdmin} label="isAdmin" onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  )
}

export default UserEditScreen
