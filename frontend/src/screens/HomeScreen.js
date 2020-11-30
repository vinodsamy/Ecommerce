import React, { useState, useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Product from "../components/Product"
import { Link } from "react-router-dom"
// import products from "../products"
import { listProducts } from "../actions/ProductActions"
import ProductCarousel from "../components/ProuctCarousel"
import Axios from "axios"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Paginate from "../components/Paginate"
import { Meta } from "../components/Meta"
const HomeScreen = ({ match }) => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, products, error, page, pages } = productList
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber
  //const [products, setProducts] = useState([])
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
    // const fetchData = async () => {
    //   const { data } = await Axios.get("/api/products")
    //   console.log("data is", data)
    //   setProducts(data)
    // }
    // fetchData()
  }, [dispatch, keyword, pageNumber])
  //const products = []
  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword ? keyword : ""} />
        </>
      )}
    </>
  )
}

export default HomeScreen
