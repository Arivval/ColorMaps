import axios from "axios";
const BigNumber = require("big-number");

const API_END_POINT = "https://cs519.herokuapp.com/colormap/";

export const GETcolormap = (name) => {
    return axios.get(API_END_POINT + name);
}

export const POSTcolormap = (name, anchorPoints, anchorColors) => {
    const anchors = []
    for (let i = 0; i < anchorPoints.length; i++) {
        const currentAnchor = {
            red: anchorColors[i][0],
            green: anchorColors[i][1],
            blue: anchorColors[i][2],
            anchor: Math.round(anchorPoints[i] * 10) /1000
        }
        anchors.push(currentAnchor);
    }
    const requestBody = {
        name,
        anchors
    }
    return axios.post(
        API_END_POINT,
        requestBody,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}