// import './App.css';
// import { Header } from "./components/Header";
// import { Footer } from "./components/Footer";
// import { Home } from "./components/Home";
// import { Logo } from "./icons/Logo";


// export const App = () => {
//   return (
//     <>
//       <Header />
//       <Home />
//       <Footer />
//     </>
//   );
// }





import React from 'react';
import {Header} from './components/Header'
import {Footer} from './components/Footer'
import Router from './Router'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import store from './redux/store'

const App = () => {
  return (
    // <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Router />
        <Footer />
      </BrowserRouter>
    // </Provider>
  );
}

export default App