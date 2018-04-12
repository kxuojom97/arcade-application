import {ALL_GAMES, ContClass} from "../../models/common/Games";
import {TicTacToeController} from "../tictactoe/TicTacToeController";
import {Connect4Controller} from "../connect4/Connect4Controller";
import {Q20Controller} from "../q20/Q20Controller";
import GameInfo from "../../models/common/GameInfo";

import firebase from "firebase/app";

export default class PlayerController{

    
    /**
     * @description The app creates one PlayerController to initiate signing in, providing user info like name and player id, 
     * @description determines states like isPlayingGame(), isWaitingForMatch(), isCurrentPlayer(), also starts a newGame() from GameChooser
     * @class PlayerController
     * @param {array} callbacks 
    */
    constructor(callbacks=[]){
        
        //addUICallback
        this.data = {
                playerId: undefined,
                displayName: undefined,
                games: [],
                callbacks: callbacks
        }

        this.unlistenAuth = firebase.auth().onAuthStateChanged(user => {
            if(user) {

                this.data.playerId = user.uid;
                this.data.displayName = user.displayName;

                if(user.displayName) {

                    console.log("displayName already known", user.displayName);
                    this.showUserInfo(user.displayName);

                    //this is to patch existing users....
                    firebase.database().ref(`/users/${user.uid}`).update({displayName: user.displayName});
                }
                else if(user.displayName == undefined){
                    
                    fetch("https://us-central1-ken-info343-final.cloudfunctions.net/randomName").then((data)=>{
                        return data.json();
                    }).then(data=> {
                    
                        firebase.auth().currentUser.updateProfile({displayName: data.name}).catch(err=>console.error(err));
                        
                        firebase.database().ref(`/users/${user.uid}`).update({displayName: user.displayName});

                        console.log("sent new displayname: " + data.name);

                        this.showUserInfo(user.displayName);
                    });
                }

                //grave, backtick
                this.users_gamesRef = firebase.database().ref(`/users/${user.uid}/game_rooms`);
        
                //once returns nothing, on returns a listener reference that is used to "unlisten"
                //this.valueListener = 
                this.users_gamesRef.once("value", snapshot => {
                    
                    this.data.gamesSnap = snapshot;
                    
                    let resuming = false;

                    snapshot.forEach(game_room => {
                        
                        resuming = true;

                        let existingGame = ALL_GAMES[game_room.val().gameTypeId][ContClass];

                        let existingGameInfo = new GameInfo(game_room, ()=>{
                        
                        console.log("loadcallback checking winner, existingGameInfo.getWinner()", existingGameInfo.getWinner())
                        //if there's no winner then the game is in progress and should be resumed...
                        if(existingGameInfo.getWinner() == undefined){

                            //update the view when data is received from firebase
                            existingGameInfo.addDataCallback(()=>this.handleUIUpdate());

                            //create the in-progress game from the info stored in firebase
                            this.data.games.push( new existingGame(this, existingGameInfo) );
                            
                            this.handleUIUpdate();
                        } else {
                            //this doesnt need to be an active game, but "leaderboard" might want this info to show
                            //this players game history...

                        }});
/*
                        
                        if(resuming)
                        {
                            console.log("triggering UI update for resumed games")
    
                            this.handleUIUpdate();
                        }
  */                      

                    });

                    
                });
              }
          });

        firebase.auth().signInAnonymously();
    }

    showUserInfo(displayName){
        this.data.displayName = displayName;
        this.handleUIUpdate();
    }

    /** 
     * @public
     * @function PlayerController.getName
     * @returns User's friendly display name
    */
    getName(){
        return this.data.displayName;
    }

    /**
     * @public
     * @function PlayerController.getPlayerId
     * @returns User's internal playerId
     */
    getPlayerId(){
        return this.data.playerId;
    }

    /**
     * @public
     * @function PlayerController.unmount
     * @description Should be called when the main App View unmounts
     */
    unmount(){
        this.unlistenAuth();
        //this.users_gamesRef.off("value", this.valueListener);
        for(let i=0; i<this.data.games.length; i++){
            this.data.games[i].unmount()
        }
    }

    /**
     * @public
     * @function PlayerController.addUICallback
     * @param {closure} callback 
     */
    addUICallback(callback){
        this.data.callbacks.push(callback);
    }

    /**
     * @public
     * @function PlayerController.handleUIUpdate
     * @description Propagates calls to update UI callbacks for all obsevers that have registered through addUICallback
     */
    handleUIUpdate(){
        //console.log("handleUIUpdate", new Error().stack, )
        this.data.callbacks.forEach((callback)=> {callback()});
    }

    /**
     * @public
     * @function PlayerController.newGame
     * @param {GameController} gameControllerClass 
     */
    newGame(gameControllerClass){
        
        this.data.games.push(new gameControllerClass(this));
        this.handleUIUpdate();

    }

    /**
     * @public
     * @function PlayerController.getGame
     * @description Get the current game the player should be playing
     */
    getGame(){
        //console.log("getGame callstack", new Error().stack, "getGame", this.data.games[0])
        for(let i=0; i<this.data.games.length; i++){

            //console.log("checking for current game");
            //console.log("getgame", this.data.games[i]);
            if(!this.data.games[i].getGameInfo() || this.data.games[i].getGameInfo().getWinner()==undefined){
                
                return this.data.games[i];
            }
            
        }


        
    }

    /**
     * @public
     * @function PlayerController.isCurrentPlayer
     * @description Is it this players turn?
     */
    isCurrentPlayer(){
        let gameInfo = this.getGame().getGameInfo();

        return this.data.playerId == gameInfo.getCurrentPlayerId();
    }

    /**
     * @public
     * @function PlayerController.isPlayingGame
     * @description Is a game already selected and in some stage of being played (even waiting for a match)
     */
    isPlayingGame(){
        let gameInfo = this.getGame();

        //console.log("isplayinggame ", gameInfo != undefined)
        return gameInfo != undefined; //&& gameInfo.getGameInfo();
    }

    /**
     * @public
     * @function PlayerController.isWaitingForMatch
     * @description Is the player waiting for a match with another player
     */
    isWaitingForMatch(){

        //console.log("figuring out waiting state",  this.isPlayingGame() )
        
        /*if(this.isPlayingGame())
            console.log("gameinfo", this.getGame().getGameInfo())
        */

        //the user is "in game", but the game has not been started yet
        return this.isPlayingGame() && !this.getGame().getGameInfo();
    }

}

