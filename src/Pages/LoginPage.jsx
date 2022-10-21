import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./PagesCss/login.styles.css"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useFormik } from "formik"
import * as Yup from "yup"
import { axiosInstance } from "../api"
import { login } from "../redux/features/authSlice"
import { useDispatch } from "react-redux"
import { useToast, FormControl, FormErrorMessage } from "@chakra-ui/react"

const Login = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      nim: "",
      password: "",
    },
    onSubmit: async ({ nim, username, password }) => {
      try {
        const response = await axiosInstance.post("/auth/login", {
          nim,
          username,
          password,
        })

        localStorage.setItem("auth_token", response.data.token)
        dispatch(
          login({
            nim: response.data.data.nim,
            username: response.data.data.username,
            id: response.data.data.id,
          })
        )
        toast({
          title: "Login successful",
          description: response.data.message,
          status: "success",
        })
        navigate("/")
      } catch (err) {
        console.log(err)
        toast({
          status: "error",
          title: "Login failed",
          description: err.response.data.message,
        })
      }
    },
    validationSchema: Yup.object({
      nim: Yup.string().required(),
      password: Yup.string().required(),
    }),
    validateOnChange: false,
  })
  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  return (
    <body className="body-login">
      <div className="center-login">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <div className="txt_field">
            <FormControl isInvalid={formik.errors.nim}>
              <input
                className="login-input"
                type="text"
                name="nim"
                value={formik.values.nim}
                onChange={formChangeHandler}
              />
              <span className="login-span"></span>
              <label className="login-label">NIM</label>
              <FormErrorMessage>{formik.errors.nim}</FormErrorMessage>
            </FormControl>
          </div>
          <div className="txt_field">
            <FormControl isInvalid={formik.errors.nim}>
              <input
                className="login-input"
                type={show ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formChangeHandler}
              />
              <i className="pass-icon" onClick={handleClick}>
                {show ? <FaEyeSlash /> : <FaEye />}
              </i>
              <span className="login-span"></span>
              <label className="login-label">Password</label>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
          </div>
          <input className="button-login" type="submit" value="Login" />
          <div className="signup-link">
            Not a member?{" "}
            <Link className="link-regis" to="/register">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </body>
  )
}

export default Login
