import React, {Component} from 'react';
import '../styles/ColorMapColorPicker.css';
import ColorMapAnchorList from './ColorMapAnchorList';
import { ChromePicker } from 'react-color'

const rgbHex = require('rgb-hex');
const DISABLE_ALPHA = true;
const COLOR_PICKER_WIDTH = 500;

class ColorMapColorPicker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const currentFocusedColor = this.props.anchorColors[this.props.focusedIdx];
        return (
            <div className="ColorMapColorPickerOuterDiv">
                <div className="ColorMapColorPickerDiv">
                    <ChromePicker 
                    color={rgbHex(...currentFocusedColor)}
                    onChangeComplete={this.props.onColorChange}
                    disableAlpha={DISABLE_ALPHA}
                    width={COLOR_PICKER_WIDTH}
                    // styles={{"picker": {"borderRadius": '50px'}}}
                    />
                    <ColorMapAnchorList 
                        anchorPoints={this.props.anchorPoints}
                        anchorColors={this.props.anchorColors}
                        selectHandler={this.props.selectHandler} 
                        removeHandler={this.props.removeHandler}
                    />
                </div>
            </div>
        );
    }

}

export default ColorMapColorPicker;