import React, {Component} from 'react';
import '../styles/HomePage.css';
import ColorMapEditor from './ColorMapEditor';

class HomePage extends Component {
    render() {
        return (
            <div className="HomePageDiv">
                <ColorMapEditor/>   
            </div>
        );
    }

}

export default HomePage;