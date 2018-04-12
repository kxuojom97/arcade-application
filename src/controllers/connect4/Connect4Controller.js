import GameController from "../common/GameController";
import {ALL_GAMES, GAME_TYPE_C4, ContClass} from "../../models/common/Games"
import Connect4 from "../../views/connect4/Connect4";
import React from "react";
import { GridBoardGame } from "../common/GridBoardGame";

export default class Connect4Controller extends GameController{
    /**
     * @description Controller to handle UI input for Connect 4
     * @public
     * @class Connect4Controller
     * @extends GameController
     * @param {PlayerController} playerController 
     * @param {GameInfo} gameInProgress 
     */
    constructor(playerController, gameInProgress=undefined){
        
        super(GAME_TYPE_C4.gameTypeId, playerController, gameInProgress);

        //console.log(playerController.getGame());
        if(gameInProgress) {
            console.log("gameInProgress")
            this.gbg = new GridBoardGame(playerController, gameInProgress, 8, 4);
        } 
        if(this.gbg) {
            this.grid = this.gbg.controllerModelRef.grid.getGrid();
        }

    }

    startGame(data){
        console.log("connect4 startgame");
        this.gbg = new GridBoardGame(this._data.playerController, data, 8, 4);
        this.grid = this.gbg.controllerModelRef.grid.getGrid();
    }

    getView(){  
        //console.log("getview");
        return <Connect4 pC={this._data.playerController} grid={this.grid}/>;
    }

};

//adds this controller to the global list of all game data
if(ALL_GAMES != undefined)
    ALL_GAMES[GAME_TYPE_C4.gameTypeId][ContClass] = Connect4Controller;

