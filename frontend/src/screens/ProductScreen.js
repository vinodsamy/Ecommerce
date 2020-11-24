import React, { useState, useEffect } from "react"
import { Button, Card, Col, Image, ListGroup, Row, Form } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { listProductDetails } from "../actions/ProductActions"
import Rating from "../components/Rating"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Axios from "axios"
const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const productListDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productListDetails
  const [qty, setQty] = useState(1)
  //const product = products.find((p) => p._id == match.params.id)
  // const [product, setProduct] = useState({})

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
    // const fetchData = async () => {
    //   const { data } = await Axios.get(`/api/products/${match.params.id}`)
    //   console.log("data is", data)
    //   setProduct(data)
    // }
    // fetchData()
  }, [dispatch, match])
  //const product = []

  const addCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>{product.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} value={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup className="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status</Col>
                      <Col>
                        <strong>{product.countInStock > 0 ? "In stock" : "Out of stock"}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button className="btn-block" onClick={addCartHandler} type="button" disabled={product.countInStock === 0}>
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
