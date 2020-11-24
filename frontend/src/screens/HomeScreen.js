import React, { useState, useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Product from "../components/Product"
// import products from "../products"
import { listProducts } from "../actions/ProductActions"
import Axios from "axios"
import Loader from "../components/Loader"
import Message from "../components/Message"
const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, products, error } = productList
  //const [products, setProducts] = useState([])
  useEffect(() => {
    dispatch(listProducts())
    // const fetchData = async () => {
    //   const { data } = await Axios.get("/api/products")
    //   console.log("data is", data)
    //   setProducts(data)
    // }
    // fetchData()
  }, [dispatch])
  //const products = []
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen