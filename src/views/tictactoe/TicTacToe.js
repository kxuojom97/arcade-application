import React from "react";
import TicTacToeController from "../../controllers/tictactoe/TicTacToeController"
import GridBoardGame from "../../controllers/common/GridBoardGame"
import Tile from "./Tiles";
import "./TicTacToe.css";

export default class TicTacToe extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            pcontroller: this.props.pC,
            gcontroller: this.props.pC.getGame(),
            grid: this.props.grid,
            turn: true
        }
    }

    render(){
        let rows=[];

        for (let i =0; i < this.state.grid.length; i++) {
            for (let j = 0; j < this.state.grid.length; j++) {
                rows.push(<Tile xCoordinate={j} yCoordinate={i} grid={this.state.grid} gcontroller={this.state.gcontroller} pcontroller={this.state.pcontroller}/>)
            }
        }

        return (
            <div>
                <h1>Welcome to Tic Tac Toe!</h1>
                <div id="tttBoard" className="container">
                    {rows}
                </div>
            </div>
        );
    }
}