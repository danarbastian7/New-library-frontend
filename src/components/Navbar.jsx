import { useState } from "react"
import {
  BiCart,
  BiSearch,
  BiX,
  BiMenu,
  BiBookReader,
  BiChevronDown,
} from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate } from "react-router-dom"
import { logout, login } from "../redux/features/authSlice"
import { axiosInstance } from "../api"
import { useToast } from "@chakra-ui/react"
import "./componentStyles/Navbar.styles.css"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openOption, setOpenOption] = useState(false)
  const toast = useToast()

  const authSelector = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const logoutBtnHandler = () => {
    localStorage.removeItem("auth_token")
    dispatch(logout())

    Navigate("/")
  }
  return (
    <div className="navbar-body">
      <header className="navbar-header">
        <Link className="logo" to="/">
          <BiBookReader />
          Lib
        </Link>
        <div class="group">
          <ul
            className="navbar-ul"
            class={`${!isOpen ? "closed-navigation" : "navigation"}`}
          >
            {/* <li className="navbar-li">
              <Link className="login-transform" to="/home">
                Home
              </Link>
            </li> */}
            {/* <li className="navbar-li">
              <Link className="login-transform" to="/books">
                Books
              </Link>
            </li> */}

            <li className="navbar-li">
              {authSelector.username ? (
                <div className="dropdown-navbar">
                  <span
                    className="current-user"
                    onClick={() => {
                      setOpenOption(!openOption)
                    }}
                  >
                    {authSelector.username} <BiChevronDown />
                  </span>
                  <div
                    className={`${!openOption ? "option-navbar" : "option-open"}
                    `}
                  >
                    <li className="navbar-li">
                      {" "}
                      <Link
                        className="login-transform"
                        onClick={logoutBtnHandler}
                      >
                        Logout
                      </Link>{" "}
                    </li>
                    <li className="navbar-li">
                      <Link className="login-transform" to="/cart">
                        <BiCart /> Chart
                      </Link>
                    </li>
                  </div>
                </div>
              ) : (
                <Link className="login-transform" to="/login">
                  Login
                </Link>
              )}
            </li>
          </ul>
          {/* <div class="search">
            <span class="icon">
              <BiSearch
                class="searchBtn"
                onClick={() => {
                  setShowSearch(!showShearch)
                }}
              />
              <BiX
                class={`${showShearch ? "closeBtn" : "closeActive"} `}
                onClick={() => {
                  setIsOpen(!isOpen)
                }}
              />
            </span>
          </div> */}
          <BiMenu
            class="menuToggle"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          />
        </div>
        {/* <div class={`${showShearch ? "showSearch" : "searchBox"} `}>
          <input type="text" placeholder="Search here" />
        </div> */}
      </header>
    </div>
  )
}

export default Navbar
