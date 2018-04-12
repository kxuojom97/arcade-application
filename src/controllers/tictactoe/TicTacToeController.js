import GameController from "../common/GameController";
import {ALL_GAMES, GAME_TYPE_TTT, ContClass} from "../../models/common/Games";
import TicTacToe from "../../views/tictactoe/TicTacToe";
import React from "react";
import { GridBoardGame } from "../common/GridBoardGame";

export default class TicTacToeController extends GameController {
    /**
     * @description Controller to handle UI input for Connect 4
     * @public
     * @class TicTacToeController
     * @extends GameController
     * @param {PlayerController} playerController
     * @param {GameInfo} gameInProgress
     */
    constructor(playerController, gameInProgress=undefined){

        super(GAME_TYPE_TTT.gameTypeId, playerController, gameInProgress);
        this.gameStatus = gameInProgress;
        // console.log(playerController.getGame());
        if(gameInProgress) {
            this.gbg = new GridBoardGame(playerController, gameInProgress, 3, 3)
        }

        if (this.gbg) {
            this.grid = this.gbg.controllerModelRef.grid.getGrid();
        }
    }

    startGame(data) {
        this.gbg = new GridBoardGame(this._data.playerController, data, 3, 3);

        if (this.gbg) {
            this.grid = this.gbg.controllerModelRef.grid.getGrid();
        }
    }

    getView(){
        //console.log("getview");
        return (
            <div>
                <TicTacToe pC={this._data.playerController} grid={this.grid} />
            </div>
        );
    }
};

if(ALL_GAMES != undefined)
    ALL_GAMES[GAME_TYPE_TTT.gameTypeId][ContClass] = TicTacToeController;