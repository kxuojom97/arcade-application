//import PlayerToken from "../../models/common/Grid/PlayerToken";
import Grid, { TIE_CONDITION } from "../../models/common/Grid/Grid";
import GameInfo from "../../models/common/GameInfo";

export class GridBoardGame {
    
    constructor(playerController, gameInfo, boardSize, connectionsToWin)
    {
        this.controllerModelRef = {
            
            grid: new Grid(boardSize, connectionsToWin),
            pcontroller: playerController,
            
            //which game instance is being played by which player instance
            gameInfo: gameInfo,
        
        }   

        console.log("gridboardgame gameInfo", gameInfo)
        //game info actually sends moves between users and firebase
        gameInfo.addDataCallback((data)=>this.handleOtherUserMove(data));

    }

    handleClick(x, y){

        //this move also needs to be sent to Firebase which will in turn be sent to the other player
 
        this.controllerModelRef.gameInfo.updateInfo({
            actions:{
                move:{
                    playerId: this.controllerModelRef.pcontroller.getPlayerId(),
                    selection:{
                        x: x,
                        y: y,
                    }
                }
            }
        });

        let winner = false;

        if((winner = this.controllerModelRef.grid.placeToken(x, y, this.controllerModelRef.pcontroller.getPlayerId())) != false) 
        {
            console.log("winner or tie");

            if(winner != TIE_CONDITION){
                winner = this.controllerModelRef.pcontroller.getPlayerId();
                console.log("winner", winner);
            }
            else {
                console.log("tie", winner);
            }

            this.controllerModelRef.gameInfo.updateInfo({winnerPlayerId: winner})
        }

    }

    handleOtherUserMove(data){

        console.log("handleusermove", data);

        if(!data || !data.actions){
            console.error("no actions to perform");
            this.controllerModelRef.pcontroller.handleUIUpdate();
            return;
        }

        let winner = false;

        if((winner = this.controllerModelRef.grid.placeToken(data.actions.move.selection.x, data.actions.move.selection.y, data.actions.move.playerId)) != false)
        {
            
            console.log("winner or tie");

            if(winner != TIE_CONDITION){
                winner = data.actions.move.playerId;
                console.log("winner", winner);
            }
            else {
                console.log("tie", winner);
            }
            
            this.controllerModelRef.gameInfo.updateInfo({winnerPlayerId: winner})
        }
        
        this.controllerModelRef.pcontroller.handleUIUpdate();
    }

    

}