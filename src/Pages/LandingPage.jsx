// import img1 from "./PagesCss/LandingPageBc.jpg"

import "./PagesCss/LandingPage.styles.css"
import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <body>
      <div class="content">
        {/* <img src={img1} alt="" /> */}
        <h1>Welcome to Our Site!</h1>
        <h2>Explore our Collection</h2>

        <br />
        <Link to="/books">
          <span>Books Collection</span>
        </Link>
      </div>
    </body>
  )
}

export default LandingPage
