import "./PagesCss/register.styles.css"
import { useState } from "react"
import {
  Button,
  FormControl,
  FormErrorMessage,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { axiosInstance } from "../api"
import { isInteger, useFormik } from "formik"
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"

const Register = (props) => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const navigate = useNavigate()
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const formik = useFormik({
    initialValues: {
      nim: "",
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ nim, username, email, password }) => {
      try {
        const response = await axiosInstance.post("/auth/register", {
          nim,
          username,
          email,
          password,
        })

        toast({
          title: "Registration successful & Verif your account",
          description: response.data.message,
          status: "success",
        })

        navigate("/login")
      } catch (err) {
        toast({
          title: "Registration failed",
          description: err.response.data.message,
          status: "error",
        })
        console.log(err)
      }
    },
    validationSchema: Yup.object({
      nim: Yup.string().required().min(6),
      username: Yup.string().required().min(3),
      email: Yup.string().required().email(),
      password: Yup.string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  return (
    <div className="register-body">
      <div className="container-register">
        <div className="title">Registration</div>
        {/* <form onSubmit={formik.handleSubmit}> */}
        <form onSubmit={formik.handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <FormControl isInvalid={formik.errors.nim}>
                <span className="details">NIM</span>
                <input
                  type="text"
                  name="nim"
                  placeholder="Enter your NIM"
                  value={formik.values.nim}
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>{formik.errors.nim}</FormErrorMessage>
              </FormControl>
            </div>
            <div className="input-box">
              <FormControl isInvalid={formik.errors.username}>
                <span className="details">Username</span>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formik.values.username}
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
              </FormControl>
            </div>
            <div className="input-box">
              <FormControl isInvalid={formik.errors.email}>
                <span className="details">Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
            </div>
            <div className="input-box">
              <FormControl isInvalid={formik.errors.password}>
                <span className="details">Password</span>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formChangeHandler}
                />

                <i className="passRegis-icon" onClick={handleClick}>
                  {show ? <FaEyeSlash /> : <FaEye />}
                </i>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
            </div>
          </div>
          <div className="button-register">
            <input type="submit" value="Register" />
          </div>
        </form>
        {/* </form> */}
      </div>
      {/* <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Verify Your Account</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              We send you a email verification before you start using our site{" "}
              <br /> please verif your account before login!
            </ModalBody>

            <ModalFooter>
              <Button>
                <Link href="https://gmail.com" isExternal>
                  <FaEnvelope />
                  Gmail
                </Link>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </> */}
    </div>
  )
}

export default Register
