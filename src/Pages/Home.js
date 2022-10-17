import React, { useEffect, useState } from "react"
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap"
import { useThemeHook } from "../GlobalComponents/ThemeProvider"
import { BiSearch } from "react-icons/bi"
import SearchFilter from "react-filter-search"
import ProductCard from "../components/ProductCard"
import { axiosInstance } from "../api"
import Books from "../components/books"
import ReactPaginate from "react-paginate"

const Home = () => {
  const [theme] = useThemeHook()
  const [searchInput, setSearchInput] = useState("")
  const [productData, setProductData] = useState([])

  const [books, setBooks] = useState([])

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/books")
      setBooks(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const renderBooks = () => {
    return books.map((val) => {
      return (
        <Books
          id={val.id}
          title={val.title}
          author={val.author}
          price={val.price}
          image_url={val.image_url}
          genre={val.genre}
          publish_year={val.publish_year}
          key={val.id.toString()}
        />
      )
    })
  }

  // Feature Search

  //Feature Paginataiton

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={10} md={7} lg={6} xl={4} className="mb-3 mx-auto text-center">
          <h1 className={theme ? "text-light my-5" : "text-black my-5"}>
            Search products
          </h1>
          <InputGroup className="mb-3">
            <InputGroup.Text
              className={
                theme
                  ? "bg-black text-dark-primary"
                  : "bg-light text-light-primary"
              }
            >
              <BiSearch size="2rem" />
            </InputGroup.Text>
            <FormControl
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              // onChange={(event) => setInputFilter(event.target.value)}
              // onClick={filterBtnHandler}
              className={
                theme ? "bg-light-black text-light" : "bg-light text-black"
              }
            />
          </InputGroup>
          {/* {renderBooks()} */}
        </Col>
        <SearchFilter
          value={searchInput}
          data={productData}
          renderResults={() => (
            <Row className="justify-content-center">
              {books.map((item, i) => (
                <ProductCard data={item} key={i} />
              ))}
            </Row>
          )}
        />
      </Row>
    </Container>
  )
}

export default Home
