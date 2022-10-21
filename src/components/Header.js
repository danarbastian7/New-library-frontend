import React, { useContext, useState, useEffect } from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import { ThemeContext } from "../GlobalComponents/ThemeProvider"
import { BiSun, BiMoon, BiCart } from "react-icons/bi"
import { RiShoppingBag2Fill, RiShoppingBag2Line } from "react-icons/ri"
import { Link } from "@reach/router"
import { useCart } from "react-use-cart"
import { Link as LinkRouterDom } from "react-router-dom"
import { Heading } from "@chakra-ui/react"

const Header = () => {
  const { theme, setThemeMode } = useContext(ThemeContext)
  const [darkMode, setDarkMode] = useState(theme)

  useEffect(() => {
    setThemeMode(darkMode)
    console.log(darkMode)
  }, [darkMode])

  const { isEmpty, totalItems } = useCart()

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      variant={darkMode ? "dark" : "light"}
      className={
        darkMode ? "bg-light-black border-bottom" : "bg-light border-bottom"
      }
      style={{ width: "100%", position: "fixed", zIndex: 100 }}
    >
      <Container>
        <Nav.Link
          className={darkMode ? "text-dark-primary" : "text-light-primary"}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <BiSun size="1.7rem" /> : <BiMoon size="1.7rem" />}
        </Nav.Link>
        <Link
          to="/"
          style={{
            textDecoration: "none",
          }}
        >
          <Navbar.Brand
            className={darkMode ? "text-dark-primary" : "text-light-primary"}
          >
            <b>E-LIBRARY</b>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link
              to="/cart"
              className={`${
                darkMode ? "text-dark-primary" : "text-light-primary"
              } d-flex align-items-center`}
              style={{
                textDecoration: "none",
              }}
            >
              <RiShoppingBag2Line size="2.5rem" />
              {!isEmpty && (
                <span
                  style={{
                    position: "relative",
                    left: "-23px",
                    top: "6px",
                    fontWeight: "bolder",
                    fontSize: "10px",
                    color: "red",
                  }}
                >
                  {totalItems}
                </span>
              )}
              <span
                style={{
                  marginLeft: !isEmpty ? "-5px" : 0,
                  fontWeight: "bold",
                }}
              >
                Cart
              </span>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
