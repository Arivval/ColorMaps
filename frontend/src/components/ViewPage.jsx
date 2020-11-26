import React, {Component} from 'react';
import '../styles/ViewPage.css';
import ColorMapEditor from './ColorMapEditor';
import {GETcolormap} from '../scripts/APIHelper';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class ViewPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            edited: false,
            colorMapName: '',
            anchorPoints: [0, 100],
            anchorColors: [[0, 0, 0], [255, 255, 255]]
        }

        this.onAnchorPointDidChange = this.onAnchorPointDidChange.bind(this);
    }

    componentDidMount() {
        const routeList = this.props.location.pathname.split('/');
        const colorMapName = routeList[2];
        GETcolormap(colorMapName)
            .then((res) => {
                const anchors = res.data.anchors;
                let anchorPoints = [];
                let anchorColors = [];
                for (let i = 0; i < anchors.length; i++) {
                    const anchor = anchors[i];
                    anchorPoints.push(anchor.anchor * 100);
                    anchorColors.push([anchor.red, anchor.green, anchor.blue]);
                }
                this.setState({
                    loaded: true,
                    colorMapName,
                    anchorPoints,
                    anchorColors
                }, ()=> {
                    if ("justCreated" in this.props.location) {
                        toast.success("🎉 ColorMap Created!", {
                            position: "top-right",
                            autoClose: 2500,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });    
                    } 
                });
            })
            .catch((err) => {
                console.log('error', err);
                this.props.history.push('/');
            });
    }

    onAnchorPointDidChange(anchorPoints, anchorColors) {
        this.setState({
            anchorPoints,
            anchorColors,
            edited: true
        });
    }

    render() {
        return (
            <div>
                <ToastContainer style={{fontSize: "20px"}}/>
                {
                    this.state.loaded ? 
                    <div className="ViewPageDiv">
                        <ToastContainer style={{fontSize: "20px"}}/>
                        <div className="ViewPageToolBarDiv">
                            <div className="ViewPageToolBarNameDiv">
                                {this.state.colorMapName}
                            </div>
                            <div className="ViewPageToolBarForkButtonDiv">
                                <Link to={{
                                    pathname: "/",
                                    initAnchorPoints: this.state.anchorPoints,
                                    initAnchorColors: this.state.anchorColors
                                }}>
                                    <Button 
                                        variant="outline-primary" 
                                        disabled={!this.state.edited}> 
                                        Fork
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <ColorMapEditor
                        anchorPoints = {this.state.anchorPoints}
                        anchorColors = {this.state.anchorColors}
                        onAnchorPointDidChange = {this.onAnchorPointDidChange}
                        />
                    </div> : null
                }
            </div>

        );
    }

}

export default ViewPage;