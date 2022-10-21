import React, { useEffect, useState } from "react"
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap"
import { useThemeHook } from "../GlobalComponents/ThemeProvider"
import { BiSearch } from "react-icons/bi"
import SearchFilter from "react-filter-search"
import ProductCard from "../components/ProductCard"
import { axiosInstance } from "../api"
import Books from "../components/books"

import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Grid,
  GridItem,
  HStack,
  Text,
  Select,
  Flex,
} from "@chakra-ui/react"

const Home = () => {
  const [theme] = useThemeHook()
  const [searchInput, setSearchInput] = useState("")
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [sortBy, setSortBy] = useState("title")
  const [sortDir, setSortDir] = useState("ASC")
  const [sortDir2, setSortDir2] = useState("DESC")

  const [books, setBooks] = useState([])

  const fetchBooks = async () => {
    const maxItemPerPage = 8
    try {
      const response = await axiosInstance.get(`/books?`, {
        params: {
          _limit: maxItemPerPage,
          _page: page,
          _expand: "books",
          _sortBy: sortBy,
          _sortDir: sortDir,
          _sortDir2: sortDir2,
          title: searchInput,
        },
      })

      setTotalCount(response.data.dataCount)
      setMaxPage(Math.ceil(response.data.dataCount / maxItemPerPage))

      if (page === 1) {
        setBooks(response.data.data)
      } else {
        setBooks(response.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const seeMoreBtnHandler = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    setPage(page - 1)
  }

  // const renderBooks = () => {
  //   return books.map((val) => {
  //     return (
  //       <Books
  //         key={val.id.toString()}
  //         id={val.id}
  //         title={val.title}
  //         author={val.author}
  //         price={val.price}
  //         image_url={val.image_url}
  //         genre={val.genre}
  //         publish_year={val.publish_year}
  //         category={val.BookCategory.category}
  //       />
  //     )
  //   })
  // }

  useEffect(() => {
    fetchBooks()
  }, [page, searchInput, sortDir])

  const sortHandler = ({ target }) => {
    const { value } = target

    setSortBy(value.split(" ")[0])
    setSortDir(value.split(" ")[1])
  }

  return (
    <>
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col
            xs={7}
            md={10}
            lg={9}
            xl={4}
            className="mb-3 mx-auto text-center"
            style={{
              marginTop: "50px",
            }}
          >
            <h1
              className={theme ? "text-light my-5" : "text-black my-5"}
              style={{
                fontFamily: "sans-serif",
              }}
            >
              E-Library
            </h1>

            <Flex>
              <InputGroup
                className="mb-3"
                style={{
                  width: "500px",
                }}
              >
                <InputGroup.Text
                  className={
                    theme
                      ? "bg-black text-dark-primary"
                      : "bg-light text-light-primary"
                  }
                >
                  <BiSearch size="2rem" onClick={fetchBooks} />
                  <FormControl
                    type="search"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className={
                      theme
                        ? "bg-light-black text-light"
                        : "bg-light text-black"
                    }
                  />
                </InputGroup.Text>
              </InputGroup>
              <Select
                backgroundColor={"white"}
                fontWeight="bold"
                border={"none"}
                ml="5"
                mt="1"
                maxW="110"
                onChange={sortHandler}
                textColor="black"
                placeholder="Sort by"
              >
                <option value="title ASC">A - Z</option>
                <option value="title DESC">Z - A</option>
              </Select>
            </Flex>

            {/* {renderBooks()} */}
          </Col>
          <SearchFilter
            value={searchInput}
            data={productData}
            renderResults={() => (
              <Row className="justify-content-center">
                {books.map((book, i) => (
                  <ProductCard data={book} key={i} />
                ))}

                <Grid templateColumns={"repeat(3, 1fr"} mt="15px">
                  {/* <GridItem />
                <GridItem /> */}
                  <GridItem>
                    <Flex
                      justifyItems={"center"}
                      justifyContent={"end"}
                      gap="2px"
                    >
                      {page === 1 ? null : (
                        <TiArrowLeftThick
                          color={"green"}
                          onClick={previousPage}
                          fontWeight={"bold"}
                          size={"25px"}
                        ></TiArrowLeftThick>
                      )}
                      {!books.length ? (
                        <Alert status="warning">
                          <AlertIcon />
                          <AlertTitle>No Books Found</AlertTitle>
                        </Alert>
                      ) : null}
                      <Text
                        fontFamily={"body"}
                        fontSize={"md"}
                        color={"blue"}
                        fontWeight={"extrabold"}
                      >
                        Page: {page}
                      </Text>
                      {page >= maxPage ? null : (
                        <TiArrowRightThick
                          color={"green"}
                          onClick={seeMoreBtnHandler}
                          fontWeight={"bold"}
                          alignmentBaseline={"middle"}
                          size={"25px"}
                        >
                          Next
                        </TiArrowRightThick>
                      )}
                    </Flex>
                  </GridItem>
                  {/* <GridItem />
                <GridItem /> */}
                </Grid>
              </Row>
            )}
          />
        </Row>
      </Container>
    </>
  )
}

export default Home
