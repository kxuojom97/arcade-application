import React from "react";
import Connect4 from "../../views/connect4/Connect4";
import Tile from "../../views/connect4/Tile"

export default class Row extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gcontroller: this.props.gcontroller,
            index: this.props.index,
            pcontroller: this.props.pcontroller,
            grid: this.props.grid
        }
    }

    componentWillMount(){
        console.log("Row will mount");

    }

    render() {
        let rows = []
        // let lastY = 7;
        // for (let i = 0; i < 8; i++) {
        //     if (this.props.col[i]){
        //         lastY = i;
        //         break;
        //     }
        // }

        for (let i = 0; i < 8; i++) {
            rows.push(<Tile grid={this.state.grid} tile={this.props.row[i]} col={this.state.index} row={i} gcontroller={this.state.gcontroller} pcontroller={this.state.pcontroller}/>)
        }
        return (        
            <div className="mx-1 my-1"> 
                {rows}
            </div>
        );
    }
}