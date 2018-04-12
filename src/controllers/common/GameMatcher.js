import firebase from "firebase/app";

export default class GameMatcher{

    /**
     * Internally used by GameController to match players based on type of game they want to play
     * Called in GameController to listen for a new room, and add the user to the appropriate game lobby
     * @class GameMatcher
     * @param {string} gameTypeId 
     * @param {Object} playerId 
     * @param {closure} startGame 
     */
    constructor(gameTypeId, playerInfo, startGame){
        
        //add listener under player for list of games player is in, this will be called to start the appropriate game
        //when the player

        console.log("setting up game match");

        this._users_game_rooms_ref = firebase.database().ref(`/users/${playerInfo.playerId}/game_rooms`);

        this._valueListener = this._users_game_rooms_ref.on("child_added", snapshot => {

            
            let value = snapshot.val();

            console.log(value.winnerPlayerId);

            if(value && value.winnerPlayerId==undefined){

                //value = value[Object.keys(value)[0]];
                console.log("game room value updated, gamematcher, ", value, gameTypeId, value.gameTypeId);
                
                //figure out if theres a better way to do this by API or by ref, type of on?
                

                if(value.gameTypeId == gameTypeId)
                    startGame(snapshot);
            }
        });

        //add player to the specified game lobby, this should trigger the Firebase Cloud Function if there are enough
        //players, move them to a new room, and add the room under the player's /game_rooms, which will start the game
        //if there is only one player, the lambda will be called with the snapshot when the second player enters the room
        firebase.database().ref(`/lobby/${gameTypeId}`).push(playerInfo);
    }

    unmount(){
        this._users_game_rooms_ref.off("value", this._valueListener);
    }
}