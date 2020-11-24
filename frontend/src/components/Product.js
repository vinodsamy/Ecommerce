import React from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Rating from "./Rating"

const Product = ({ product }) => {
  return (
    <>
      <Card className="my-3 py-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">{product.name}</Card.Title>
          </Link>
          <Card.Title as="div">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            {/* <div className="my-3">
              {product.rating} from {product.numReviews} reviews
            </div> */}
          </Card.Title>
          <Card.Text as="h3">${product.price} </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default Product
