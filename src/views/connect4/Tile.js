import React from "react";

let baseStyles = {
    backgroundColor: "#0000ff"
};

let otherStyles = {
    backgroundColor: "ffff00"
};

let emptyStyles = {
    backgroundColor: "#fff"
};

export default class Tile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            gcontroller: this.props.gcontroller,
            currentplayerId: this.props.pcontroller.getPlayerId()
        }

        // if (this.props.tile) {
        //     this.setState({tileId: this.props.tile.getplayerId()})
        //     console.log(this.state.tileId)
        // }

        
    }

    componentWillMount(){
        console.log("tile will mount");

    }

    action() {
        let lastRow = 7;
        for (let i = 7; i >= 0; i--) {
            console.log(this.props.grid[this.props.col][i])
            if (!this.props.grid[this.props.col][i]) {
                lastRow = i;
                break;
            }
        }
        console.log("clicked row " + lastRow + ", col " + this.props.col);
        this.state.gcontroller.gbg.handleClick(lastRow, this.props.col);
        this.state.gcontroller.handleUIUpdate();
    }

    render() {
        // let styles = emptyStyles;
        // if (this.props.tile) {
        //     // this.setState({tileId: this.props.tile.getplayerId()})
        //     console.log(this.props.tile.getplayerId());
        //     styles = this.props.tile.getplayerId() === this.state.currentplayerId ? baseStyles : otherStyles;
        // }
        
        let id = null;

        if (this.props.tile) {
            id = this.props.tile.getplayerId();


        }
        
        return (
            <div className="col"> 
                {
                    !this.props.tile ?
                    <button className="btn-sm rounded-circle" id="button" onClick={this.state.gcontroller.getGameInfo().getCurrentPlayerId() == this.state.gcontroller.getPlayerId() ? () => this.action() : () => {}}>
                        {this.props.tile}
                        
                    </button> : 
                    <div>
                        {
                            id == this.state.currentplayerId ? 
                            <button className="btn-sm btn-primary" id="button" disabled/> :
                            <button className="btn-sm btn-warning" id="button" disabled/>
                        }
                    </div>
                }   
            </div>
        );
    }
}