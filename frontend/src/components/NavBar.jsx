import React, {Component} from 'react';

import '../styles/NavBar.css';

class NavBar extends Component {
    render() {
        return (
            <div className="NavBarDiv">
                <div className="NavBarTitleDiv disable-select">
                    ColorMaps.Dev
                </div>
            </div>
        );
    }

}

export default NavBar;