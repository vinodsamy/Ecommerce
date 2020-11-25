import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails } from "../actions/UserActions"
import { Form, Button, Row, Col } from "react-bootstrap"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
// import { USER_UPDATE_RESET } from "../constants/UserConstants"
import { listProductDetails } from "../actions/ProductActions"

const ProductEditScreen = ({ match, history }) => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState("")

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  // const userUpdate = useSelector((state) => state.userUpdate)
  // const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

  const productId = match.params.id
  useEffect(() => {
    // if (successUpdate) {
    //   dispatch({ type: USER_UPDATE_RESET })
    //   history.push("/admin/userList")
    // } else {
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId))
    } else {
      setName(product.name)
      setBrand(product.brand)
      setCategory(product.category)
      setPrice(product.price)
      setImage(product.image)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
    // }
  }, [dispatch, history, product, productId])

  const submitHandler = (e) => {
    e.preventDefault()
    // upate product
    console.log("form submit data")
  }
  return (
    <FormContainer>
      <h1>Edit Product</h1>
      {/* {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>} */}
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
          <Form.Group controlId="brand">
            <Form.Label>Brand </Form.Label>
            <Form.Control value={brand} type="text" placeholder="Enter brand" onChange={(e) => setBrand(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category </Form.Label>
            <Form.Control value={category} type="text" placeholder="Enter category" onChange={(e) => setCategory(e.target.value)}></Form.Control>
          </Form.Group>{" "}
          <Form.Group controlId="price">
            <Form.Label>Price </Form.Label>
            <Form.Control value={price} type="number" placeholder="Enter price" onChange={(e) => setPrice(e.target.value)}></Form.Control>
          </Form.Group>{" "}
          <Form.Group controlId="image">
            <Form.Label>Image </Form.Label>
            <Form.Control value={image} type="text" placeholder="Enter image" onChange={(e) => setImage(e.target.value)}></Form.Control>
          </Form.Group>{" "}
          <Form.Group controlId="countInstock">
            <Form.Label>Count In Stock </Form.Label>
            <Form.Control value={countInStock} type="text" placeholder="Enter countInStock" onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
          </Form.Group>{" "}
          <Form.Group controlId="description">
            <Form.Label>Description </Form.Label>
            <Form.Control value={description} type="text" placeholder="Enter description" onChange={(e) => setDescription(e.target.value)}></Form.Control>
          </Form.Group>{" "}
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  )
}

export default ProductEditScreen
