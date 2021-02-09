import React from 'react'
import './VegBurg.css'

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
    <Menu right>
        {user ?
            <button onClick={logout}>Log Out</button>                
            :
            <button onClick={login}>Log In</button>              
        }
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        <a onClick={ showSettings } className="menu-item--small" href="">Settings</a>
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