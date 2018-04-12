import {PlayerToken, DIRECTIONS} from './PlayerToken';

export const TIE_CONDITION = "Tie";

export default class Grid{
    constructor(dim, connectionsToWin){
        
        this.dim = dim;
        this.lastIndex = dim-1;
        this.connectionsToWin = connectionsToWin;

        this.grid = [];

        for(let i=0; i<dim; i++){
            let row = [];
            this.grid.push(row);
            for(let j=0; j<dim; j++){
                row.push(null)
            }
        }

    }

    getGrid() {
        return this.grid;
    }

    placeToken(x,y, playerId){
        
        if(x==undefined || y==undefined || playerId == undefined ||
         x < 0 || y < 0 ||
        x > this.lastIndex || y > this.lastIndex){
            console.error("bad call to placeToken");
            return;
        }

        console.log("placetoken, grid", this.grid, x, y);

        //check if token was already placed... don't do extra/excessive work
        if(this.grid[y][x]!=null){
            return false;
        }

        let newToken = new PlayerToken(playerId);
        this.grid[y][x] = newToken;

        //define kernel bounds

        let x_1 = x-1;
        //clip left to left bound of grid
        if( x_1 < 0 )
            x_1 = 0;

        let x_2 = x+2;
        //clip right to right bound of grid
        if( x_2 > this.dim )
            x_2 = this.dim;

        let y_1 = y-1;
        //clip top to top bound of grid
        if( y_1 < 0 )
            y_1 = 0;

        let y_2 = y+2;
        //clip bottom to bottom bound of grid
        if( y_2 > this.dim )
            y_2 = this.dim;

        console.log("direction kernel bounds p_1", x_1, y_1, "p2", x_2, y_2);

        for(let j=y_1; j<y_2; j++){
            for(let i=x_1; i<x_2; i++){
                
                //get the neighboring token
                let neighboringToken = this.grid[j][i];
                
                //skip any null cells in grid
                //skip connecting a token to itself
                if( !neighboringToken || neighboringToken == newToken )
                    continue;

                //kernel is 3x3, so each row (given by i) is 3, each col inc the index by one
                let direction = (j-y_1)*3+(i-x_1);

                switch(direction){
                    case 0:
                        neighboringToken.addConnection(DIRECTIONS.ul, newToken);
                        newToken.addConnection(DIRECTIONS.br, neighboringToken);
                        break;
                    case 1:
                        neighboringToken.addConnection(DIRECTIONS.u, newToken);
                        newToken.addConnection(DIRECTIONS.b, neighboringToken);
                        break; 
                    case 2:
                        neighboringToken.addConnection(DIRECTIONS.ur, newToken);
                        newToken.addConnection(DIRECTIONS.bl, neighboringToken);
                        break;    
                    case 3:
                        neighboringToken.addConnection(DIRECTIONS.l, newToken);
                        newToken.addConnection(DIRECTIONS.r, neighboringToken);
                        break;
                    case 4:
                        console.error("Cannot connect a token to itself");
                        break; 
                    case 5:
                        neighboringToken.addConnection(DIRECTIONS.r, newToken);
                        newToken.addConnection(DIRECTIONS.l, neighboringToken);
                        break;
                    case 6:
                        neighboringToken.addConnection(DIRECTIONS.bl, newToken);
                        newToken.addConnection(DIRECTIONS.ur, neighboringToken);
                        break;
                    case 7:
                        neighboringToken.addConnection(DIRECTIONS.b, newToken);
                        newToken.addConnection(DIRECTIONS.u, neighboringToken);
                        break; 
                    case 8:
                        neighboringToken.addConnection(DIRECTIONS.br, newToken);
                        newToken.addConnection(DIRECTIONS.ul, neighboringToken);
                        break;
                    default:
                        console.error("Bad direction calculation in Grid at i,j", i-x_1, j-y_1);
                        break;
                }

            }//close col (j) loop
        }//close row (i) loop
    
        //check for tie
        let no_more_moves = true;

        for(let i=0; i<this.dim; i++){
            for(let j=0; j<this.dim; j++){
                
                //if every grid has a token, there are no more moves, declare a tie
                no_more_moves = no_more_moves & (this.grid[i][j]!=null);
                console.log("no_more_moves", no_more_moves, this.grid[i][j]);
            }
        }

        if(no_more_moves){
            return TIE_CONDITION;
        }

        //check for a win
        return this.checkForWin(newToken);
    }

    //this is called from placeToken, it shouldnt need to be explicitly called
    checkForWin(fromToken){
        
        const TOWARDS_BEGINNING = 0;
        const TOWARDS_END = 1;

        //potentially a win in one of four directions
        const winDirections = [
            //from top to bottom ( like | )
            [DIRECTIONS.u, DIRECTIONS.b],
            
            //from upper left to bottom right (like \ )
            [DIRECTIONS.ul, DIRECTIONS.br],

            //from left to right (like - )
            [DIRECTIONS.l, DIRECTIONS.r],

            //from bottom left to upper right (like / )
            [DIRECTIONS.bl, DIRECTIONS.ur], 
        ];

        for(let curDirection = 0; curDirection < winDirections.length; curDirection++){
            
            //reset the current connection count whenever starting a new direction
            let currentConnectionCount = 0;

            //start from the specified PlayerToken
            let currentToken = fromToken;

            //prep for iterating linked list style connections between tokens
            let nextToken = null;

            //move toward one bound.... kind of like moving to the root of a tree...
            do {
                
                nextToken = currentToken.getConnection(winDirections[curDirection][TOWARDS_BEGINNING]);

                if(nextToken)
                    currentToken = nextToken;

            } while(nextToken);

            //once at that bound, move in the opposite direction, counting tokens
            do {

                currentConnectionCount++;
                nextToken = currentToken.getConnection(winDirections[curDirection][TOWARDS_END]);
                if(nextToken)
                    currentToken = nextToken;

            } while(nextToken);

            //if enough tokens were counted, it's already a win
            if( currentConnectionCount == this.connectionsToWin )
                return true;
        }

        //no counts of enough tokens were found
        return false;
    }
}