import React, {Component} from 'react';

import '../styles/ColorMapDisplay.css';

const rgbHex = require('rgb-hex');
const SLIDER_MAX = 1;
const SLIDER_MIN = 0;
const ROUNDING_FACTOR = 1000;

class ColorMapDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.addAnchorPoint = this.addAnchorPoint.bind(this);
    }

    addAnchorPoint(e) {
        let divBound = e.target.getBoundingClientRect();
        let divWidth = divBound.right - divBound.left;
        let clickedXPosition = e.clientX - divBound.left;
        let xRatio = clickedXPosition / divWidth;
        // Solve some precision errors, also round to nearest thousand
        xRatio = Math.min(Math.max(xRatio, SLIDER_MIN), SLIDER_MAX);
        xRatio = Math.round(xRatio * ROUNDING_FACTOR) / ROUNDING_FACTOR;
        this.props.addAnchorPoint(xRatio * 100);
    }

    render() {
        //     background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
        let gradientCSS = "linear-gradient(90deg," + this.props.anchorColors.map((color, idx) => {
            const hexColor = rgbHex(...color);
            return ' #' + hexColor + ' ' + this.props.anchorPoints[idx] + '%';
        }).join(',') + ')';
        return (
            <div 
                className="ColorMapDisplayDiv" 
                style={{background: gradientCSS}}
                onClick={this.addAnchorPoint}
                />
        );
    }

}

export default ColorMapDisplay;