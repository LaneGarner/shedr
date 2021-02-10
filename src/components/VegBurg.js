import React from 'react'
import './VegBurg.css'
import { Link } from 'react-router-dom'

import { slide as Menu } from 'react-burger-menu'

const VegBurg = ({ login, logout, user }) =>{

const showSettings = (event) => {
    event.preventDefault();
    // .
    // .
    // .
}


    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
    <Menu right isOpen={ false }>
        <div className="burger-menu">
            {user ?
                <div className="menu-item" onClick={logout}>Log Out</div>
                :
                <Link className="menu-item" to="/login">Log In</Link>
            }
            <br/>
            <Link className="menu-item" to="/user">User</Link>
            <Link className="menu-item" to="/">Shed</Link>
            <br/>
            <Link className="menu-item" to="/record">Record</Link>
            <Link className="menu-item" to="/metdrone">MetDrone</Link>
            <Link className="menu-item" to="/fork">Fork</Link>
            <br/>
            {/* <Link to="/">Settings</Link> */}

            {/* <a id="home" className="menu-item" href="/">Shed</a>
            <a id="user" className="menu-item" href="/user">User</a>
            <a id="record" className="menu-item" href="/record">Record</a>
            <a id="metdrone" className="menu-item" href="/metdrone">MetDrone</a>
            <a id="fork" className="menu-item" href="/fork">Fork</a> */}
            <a onClick={ showSettings } className="menu-item--small" href="">Settings</a>
        </div>
    </Menu>
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