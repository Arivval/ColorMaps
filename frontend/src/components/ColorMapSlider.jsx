import React, {Component} from 'react';
import '../styles/ColorMapSlider.css';
import Slider, { Range, Handle } from 'rc-slider';
import 'rc-slider/assets/index.css';

class ColorMapSlider extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ColorMapSliderDiv">
                <Range 
                    key={this.props.recentUpdateTime}
                    count={this.props.anchorPoints.length - 1}
                    allowCross={false}
                    step={0.1}
                    value = {this.props.anchorPoints}
                    handleStyle={[{ backgroundColor: "#fff000" }, { backgroundColor: "#ff00ff" }]}
                    handleStyle={
                        this.props.anchorColors.map(rgb => {
                                return {backgroundColor: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`}
                    })}
                    onChange = {this.props.onSliderChange}
                />
            </div>
        );
    }

}

export default ColorMapSlider;