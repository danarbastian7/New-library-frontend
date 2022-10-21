import React from "react"
import {
  Badge,
  Button,
  Card,
  Col,
  Modal,
  ModalHeader,
  Row,
} from "react-bootstrap"
import { useThemeHook } from "../GlobalComponents/ThemeProvider"
import { useCart } from "react-use-cart"
import { BsCartPlus } from "react-icons/bs"
import Books from "../components/books"
import { useState } from "react"
import { Box, useDisclosure, useToast } from "@chakra-ui/react"
import { useParams } from "@reach/router"

const ProductCard = (props) => {
  let {
    image_url,
    author,
    price,
    title,
    publish_year,
    CategoryId,
    Category,
    id,
    summary,
  } = props.data
  const [theme] = useThemeHook()
  const { addItem } = useCart()
  const [books, setBooks] = useState([])

  const addToCart = () => {
    addItem(props.data)
  }

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Card
      style={{ width: "18rem", height: "auto" }}
      className={`${
        theme ? "bg-light-black text-light" : "bg-lihgt text-black"
      } text-center p-0 overflow-hidden shadow mx-auto mb-4`}
    >
      <Badge
        bg="warning"
        style={{
          marginBottom: "20px",
          // marginRight: "500px",
          justifySelf: "left",
          fontFamily: "sans-serif",
          fontWeight: "bolder",
          fontSize: "12px",
        }}
      >
        {Category?.name}
      </Badge>
      <div
        style={{
          background: "white",
          height: "15rem",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "inherit",
        }}
      >
        <div style={{ width: "10rem", padding: "10px", marginTop: "25px" }}>
          <Card.Img variant="top" src={image_url} className="img-fluid" />
        </div>
      </div>
      <Card.Body style={{ marginTop: "-30px" }}>
        <Card.Title
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Card.Title>
        <Card.Title
          style={{
            fontSize: "14px",
            fontFamily: "revert-layer",
          }}
        >
          <span>{author}</span>
        </Card.Title>
        <Card.Title
          style={{
            fontSize: "15px",
            fontFamily: "monospace",
          }}
        >
          {publish_year}
        </Card.Title>
        <>
          <Button
            style={{
              marginBottom: "10px",
              border: "none",
              backgroundColor: "blueviolet",
              fontSize: "13px",
              fontFamily: "revert-layer",
              fontWeight: "bold",
            }}
            onClick={handleShow}
          >
            View Details
          </Button>
          <Modal show={show} onHide={handleClose} size="md">
            <Modal.Header
              style={{
                backgroundColor: "purple",
                color: "white",
                fontWeight: "bold",
              }}
              closeButton
            >
              <Modal.Title>Books Information</Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
              <Row>
                <Col xs={9} md={7}>
                  <div
                    style={{
                      background: "white",
                      height: "25rem",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "left",
                      alignItems: "left",
                      marginBottom: "inherit",
                    }}
                  >
                    <div
                      style={{
                        width: "12.5rem",
                        padding: "10px",
                        marginTop: "-20px",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={image_url}
                        className="img-thumbnail"
                      />
                    </div>
                  </div>
                </Col>
                <Col
                  xs={9}
                  md={7}
                  style={{
                    marginLeft: "-90px",
                  }}
                >
                  <Badge bg="warning">{Category.name}</Badge>
                  <div
                    style={{
                      fontWeight: "bold",
                      marginBottom: "-25px",
                    }}
                  >
                    {title} - {publish_year}
                  </div>
                  <br />
                  <div
                    style={{
                      fontStyle: "italic",
                      fontSize: "12px",
                      marginBottom: "10px",
                    }}
                  >
                    " {author} "
                  </div>
                  <div>
                    <b>Summary:</b>
                  </div>
                  <div
                    style={{
                      fontFamily: "serif",
                    }}
                  >
                    {summary}
                  </div>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleClose}
                style={{
                  backgroundColor: "red",
                  border: "none",
                  fontWeight: "bolder",
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        <Button
          onClick={() => addToCart()}
          className={`${
            theme ? "bg-dark-primary text-black" : "bg-light-primary"
          } d-flex align-item-center m-auto border-0`}
          style={{
            fontWeight: "semi-bold",
          }}
        >
          <BsCartPlus size="1.8rem" />
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
