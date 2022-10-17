import React from "react"
import ReactDOM from "react-dom/client"
import { render } from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { ThemeProvider } from "./GlobalComponents/ThemeProvider"
import { CartProvider } from "react-use-cart"
import { BrowserRouter } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <ChakraProvider resetCSS={false}>
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  </ChakraProvider>
  // document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
