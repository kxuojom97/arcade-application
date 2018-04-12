import React from "react";

export default class TicTacToe extends React.Component{
    render(){
        return (
            <div className="card" id="game-card">
                {
                    this.props.gameName === "Tic-Tac-Toe" ?
                        <div>
                            <img className="card-img-top" id="game-image" src={require(`./tictactoe.png`)} alt="Card image cap" />
                            <div className="card-body">
                                <h5>{this.props.gameName}</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                        :
                        this.props.gameName === "Connect 4" ?
                            <div>
                                <img className="card-img-top" id="game-image" src={require(`./connect4.png`)} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{this.props.gameName}</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                            :
                            <div>
                                <img className="card-img-top" id="game-image" src={require(`./Q20.png`)} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{this.props.gameName}</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                }
            </div>
        );
    }
}