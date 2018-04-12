export const DIRECTIONS = {
        ul: "ul",
        u: "u",
        ur: "ur",
        l: "l",
        r: "r",
        bl: "bl",
        b: "b",
        br: "br",
    }

export class PlayerToken{
    constructor(playerId){

        //this identifies the player associated with the given token
        this.playerId = playerId;
        
        //these will link the tokens in a grid, just to the next one touching...
        //they are like a linked list
        //detecting a win will occur by iterating over the same "direction" for the specified number of tokens "in a row"
        this.connections = {
            ul: null,
            u:  null,
            ur: null,
            l:  null,
            r:  null,
            bl: null,
            b:  null,
            br: null,
        };
    }

    getplayerId() {
        return this.playerId;
    }

    addConnection(direction, token) {
        
        //only connect tokens belonging to the same player
        if(token.playerId != this.playerId)
            return;

        //if the specified direction, is a valid direction
        if(Object.keys(DIRECTIONS).includes(direction)) {
        
            //store a reference to the provided token for the speicifed direction
            this.connections[direction]=token;
        }
    }

    getConnection(direction) {
        
        return this.connections[direction];

    }

}