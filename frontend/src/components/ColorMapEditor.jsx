import React, {Component} from 'react';
import '../styles/ColorMapEditor.css';
import ColorMapDisplay from './ColorMapDisplay';
import ColorMapSlider from './ColorMapSlider';
import ColorMapColorPicker from './ColorMapColorPicker';

const INIT_COLOR_1 = [213, 51, 105];
const INIT_COLOR_2 = [218, 174, 81];

class ColorMapEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorPoints: [0, 100],
            anchorColors: [INIT_COLOR_1, INIT_COLOR_2],
            recentUpdateTime: Date.now(),
            currentFocusedPoint: 0,
        }
        this.addAnchorPoint = this.addAnchorPoint.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
        this.onFocusedPointChange = this.onFocusedPointChange.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
        this.onRemoveAnchorPoint = this.onRemoveAnchorPoint.bind(this);
    }

    addAnchorPoint(location) {
        location = Math.round(location * 10) / 10;
        const currentAnchorPoints = [-1, ...this.state.anchorPoints, 101];
        const currentAnchorColors = [this.state.anchorColors[0], ...this.state.anchorColors, this.state.anchorColors[this.state.anchorColors.length-1]];
        let insertIdx = 0;
        let insertColor;
        for (let i = 0; i < currentAnchorPoints.length - 1; i++) {
            insertIdx = i;
            if (location >= currentAnchorPoints[i] && location <= currentAnchorPoints[i + 1]) {
                insertColor = [
                    (currentAnchorColors[i][0] + currentAnchorColors[i+1][0]) / 2,
                    (currentAnchorColors[i][1] + currentAnchorColors[i+1][1]) / 2,
                    (currentAnchorColors[i][2] + currentAnchorColors[i+1][2]) / 2,
                ];
                break;
            }
        }
        const insertedAnchorPoints = [...this.state.anchorPoints];
        insertedAnchorPoints.splice(insertIdx, 0, location);
        const insertedColors = [...this.state.anchorColors];
        insertedColors.splice(insertIdx, 0, insertColor);
        this.setState({anchorPoints: insertedAnchorPoints, anchorColors: insertedColors, currentFocusedPoint: insertIdx});
    }

    onSliderChange(values) {
        this.setState({anchorPoints: values})
    }

    onFocusedPointChange(newFocusIndex) {
        this.setState({currentFocusedPoint: newFocusIndex});

    }

    onRemoveAnchorPoint(removeIndex) {
        if (this.state.anchorPoints.length <= 2) {
            return;
        }
        let nextFocusedPoint = this.state.currentFocusedPoint;
        if (removeIndex <= this.state.currentFocusedPoint) {
            nextFocusedPoint -= 1;
        }
        let nextAnchorPoints = [...this.state.anchorPoints];
        let nextAnchorColors = JSON.parse(JSON.stringify(this.state.anchorColors));
        nextAnchorPoints.splice(removeIndex, 1);
        nextAnchorColors.splice(removeIndex, 1)
        this.setState({
            anchorPoints: nextAnchorPoints,
            anchorColors: nextAnchorColors,
            currentFocusedPoint: nextFocusedPoint
        });
    }

    onColorChange(newColor) {
        const newColorRGB = newColor.rgb;
        const newAnchorColors = JSON.parse(JSON.stringify(this.state.anchorColors));
        newAnchorColors[this.state.currentFocusedPoint][0] = newColorRGB.r;
        newAnchorColors[this.state.currentFocusedPoint][1] = newColorRGB.g;
        newAnchorColors[this.state.currentFocusedPoint][2] = newColorRGB.b;
        this.setState({anchorColors: newAnchorColors});
    }

    render() {
        return (
            <div className="ColorMapEditorDiv">
                <ColorMapDisplay 
                    addAnchorPoint={this.addAnchorPoint}
                    anchorPoints={this.state.anchorPoints}
                    anchorColors={this.state.anchorColors}    
                />
                <ColorMapSlider 
                    anchorPoints={this.state.anchorPoints}
                    anchorColors={this.state.anchorColors}
                    recentUpdateTime={this.state.recentUpdateTime}    
                    onSliderChange={this.onSliderChange}
                />
                <ColorMapColorPicker
                    anchorPoints={this.state.anchorPoints}
                    anchorColors={this.state.anchorColors}
                    focusedIdx={this.state.currentFocusedPoint}
                    selectHandler={this.onFocusedPointChange}
                    removeHandler={this.onRemoveAnchorPoint}
                    onColorChange={this.onColorChange}
                />
            </div>
        );
    }

}

export default ColorMapEditor;