import React, {Component} from 'react';
import '../styles/HomePage.css';
import ColorMapEditor from './ColorMapEditor';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import {POSTcolormap} from '../scripts/APIHelper';
import {ToastContainer, toast} from "react-toastify";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorMapName: '',
            anchorPoints: [0, 100],
            anchorColors: [[0, 0, 0], [255, 255, 255]],
            waitingOnAPI: false
        }
        this.onAnchorPointDidChange = this.onAnchorPointDidChange.bind(this);
        this.onTextAreaChange = this.onTextAreaChange.bind(this);
        this.onCreateButtonClick = this.onCreateButtonClick.bind(this);
    }
    
    onAnchorPointDidChange(anchorPoints, anchorColors) {
        this.setState({ anchorPoints, anchorColors });
    }

    onTextAreaChange(event) {
        const textAreaString = event.target.value;
        this.setState({colorMapName: textAreaString});
    }

    onCreateButtonClick() {
        const requestMapName = this.state.colorMapName;
        // Only allow alphanumeric and underscore
        const filterRegex = new RegExp('^[a-zA-Z0-9_]+$');
        if (!filterRegex.test(requestMapName)) {
            toast.warn("Only alphanumberic and underscores allowed", {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        this.setState({waitingOnAPI: true});
        POSTcolormap(requestMapName, this.state.anchorPoints, this.state.anchorColors)
            .then(res => {
                this.props.history.push({
                    pathname: '/view/' + requestMapName,
                    justCreated: true
                });
            })
            .catch((err) => {
                this.setState({waitingOnAPI: false});
                let errMessage;
                if (err.response !== undefined) {
                    errMessage = err.response.data;
                } else {
                    errMessage = "Network Error"
                }
                toast.error(errMessage, {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    }

    componentWillMount() {
        if ("initAnchorPoints" in this.props.location) {
            this.setState(
                {
                    anchorPoints: this.props.location.initAnchorPoints,
                    anchorColors: this.props.location.initAnchorColors
                }
            );
        } else {

        }
    }

    render() {
        return (
            <div className="HomePageDiv">
                <ToastContainer style={{fontSize: "14px"}}/>
                <div className="ViewPageToolBarDiv">
                    <div className="HomePageToolBarTextAreaDiv">
                        <textarea 
                            className="HomePageTextArea"
                            rows={1}
                            maxlength="40"
                            placeholder="ColorMap Name"
                            onChange={this.onTextAreaChange}
                        />
                    </div>
                    <div className="ViewPageToolBarForkButtonDiv">
                        {this.state.waitingOnAPI ? 
                            <div className="ViewPageToolBarSpinnerDiv">
                                <Spinner animation="border" variant="success"/>
                            </div> :
                            <Button 
                            variant="outline-success" 
                            disabled={this.state.colorMapName === ""}
                            onClick={this.onCreateButtonClick}
                            > 
                                Create
                            </Button>}
                    </div>
                </div>
                <ColorMapEditor
                    anchorPoints = {this.state.anchorPoints}
                    anchorColors = {this.state.anchorColors}
                    onAnchorPointDidChange = {this.onAnchorPointDidChange}
                />   
            </div>
        );
    }

}

export default HomePage;