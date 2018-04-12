import React from "react";
import "./TicTacToe.css";

export default class Tile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            x: this.props.xCoordinate,
            y: this.props.yCoordinate,
            marker: true
        }
    }

    action() {
        this.setState({marker: !this.state.marker});
        this.props.gcontroller.gbg.handleClick(this.state.x, this.state.y);
        this.props.pcontroller.handleUIUpdate();
    }

    render() {
        return (
            <div id="tttTileContainer">
                {
                    this.props.grid[this.state.y][this.state.x] !== null ?
                        this.state.marker ?
                            <button id="tttTile" className="btn btn-primary" disabled>
                                <img id="marker" src={require(`./x.png`)} alt="X"/>
                            </button>
                            :
                            <button id="tttTile" className="btn btn-primary" disabled>
                                <img id="marker" src={require(`./o.png`)} alt="O"/>
                            </button>
                        :
                        this.props.gcontroller.getGameInfo().getCurrentPlayerId() === this.props.pcontroller.data.playerId ?
                            <button id="tttTile" className="btn btn-primary" onClick={() => this.action()}>

                            </button>
                            :
                            <button id="tttTile" className="btn btn-primary" disabled>

                            </button>
                }
            </div>
        );
    }
}