import React, { Component } from 'react';

import '../styles/ColorMapAnchorList.css';

const ColorMapAnchorListItem = (val, idx, color, selectHandler, removeHandler) => {
    return (
        <div className="ColorMapAnchorListItem" key={idx}>
            <div className="ColorMapAnchorListName disable-select"
                onClick={() => { selectHandler(idx) }}>
                <div
                    className="ColorMapAnchorListColor"
                    style={{ backgroundColor: "rgba(" + color.join(', ') + ')' }}
                />
                {val}
            </div>
            <div className="ColorMapAnchorListRemoveButtonDiv disable-select"
                onClick={() => { removeHandler(idx) }}>
                &#10005;
                </div>
        </div>
    );
}

class ColorMapAnchorList extends Component {
    render() {
        return (
            <div className="ColorMapAnchorListDiv">
                {this.props.anchorPoints.map((val, idx) =>
                    ColorMapAnchorListItem(
                        val,
                        idx,
                        this.props.anchorColors[idx],
                        this.props.selectHandler,
                        this.props.removeHandler))}
            </div>
        );
    }

}

export default ColorMapAnchorList;