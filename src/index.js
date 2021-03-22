import ReactDOM from "react-dom"
import StoreProvider from "./Store.js"

import "./index.scss"

import { App } from "./App.jsx"

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root")
)
