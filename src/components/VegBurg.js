import React from 'react'
import './VegBurg.css'
import { Link } from 'react-router-dom'
import { VegBurgIcon } from "../icons/VegBurgIcon";

import { slide as Menu } from 'react-burger-menu'

const VegBurg = ({ closeMenu, isOpen, setIsOpen, login, logout, user }) =>{

const showSettings = (event) => {
    event.preventDefault();
    // .
    // .
    // .
}

const logoutBtn = () => {
    closeMenu()
    logout()
}


    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
    // <Menu right isOpen={ false }>
        <div className={isOpen ? "burger-menu burger-menu-open" : "burger-menu"}>
            {/* <VegBurgIcon className="burger-button"/> */}
            {user ?
                <>
                    <Link onClick={logoutBtn} className="menu-item" to="/login">Log Out</Link>
                    <Link onClick={closeMenu} className="menu-item" to="/user">User</Link>
                </>
                // <div className="menu-item" onClick={logout}>Log Out</div>
                :
                <Link onClick={closeMenu} className="menu-item" to="/login">Log In</Link>
            }
            <Link onClick={closeMenu} className="menu-item" to="/">Shed</Link>
            <Link onClick={closeMenu} className="menu-item" to="/record">Record</Link>
            <Link onClick={closeMenu} className="menu-item" to="/metdrone">MetDrone</Link>
            <Link onClick={closeMenu} className="menu-item" to="/fork">Fork</Link>
            <Link onClick={closeMenu} className="menu-item" to="/feedback">Feedback</Link>
            <Link onClick={closeMenu} className="menu-item" to="/settings">Settings</Link>
            {/* <Link to="/">Settings</Link> */}

            {/* <a id="home" className="menu-item" href="/">Shed</a>
            <a id="user" className="menu-item" href="/user">User</a>
            <a id="record" className="menu-item" href="/record">Record</a>
            <a id="metdrone" className="menu-item" href="/metdrone">MetDrone</a>
            <a id="fork" className="menu-item" href="/fork">Fork</a> */}
            {/* <a onClick={ showSettings } className="menu-item--small" href="">Settings</a> */}
        </div>
    // </Menu>
    );

}

export default VegBurg;




// import React from 'react'
// import './VegBurg.css'

// import { slide as Menu } from 'react-burger-menu'

// class VegBurg extends React.Component {
// showSettings (event) {
//     event.preventDefault();
//     // .
//     // .
//     // .
// }

// render () {
//     // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
//     return (
//     <Menu right>
//         {this.state.user ?
//             <button onClick={this.logout}>Log Out</button>                
//             :
//             <button onClick={this.login}>Log In</button>              
//         }
//         <a id="home" className="menu-item" href="/">Home</a>
//         <a id="about" className="menu-item" href="/about">About</a>
//         <a id="contact" className="menu-item" href="/contact">Contact</a>
//         <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
//     </Menu>
//     );
// }
// }

// export default VegBurg;