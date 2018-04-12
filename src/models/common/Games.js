//haven't found a way to import or otherwise include these into the cloud function, so they need to be updated there despite efforts towards DRY
export const ContClass = "ControllerClass";

export const GAME_TYPE_TTT = {
    gameTypeId: "TTT",
    name: "Tic-Tac-Toe",
};

export const GAME_TYPE_C4 = {
    gameTypeId: "C4",
    name: "Connect 4"
};

export const GAME_TYPE_Q20 = {
    gameTypeId: "Q20",
    name: "20 Questions"
};

//types of GameControllers will be added to this object 
export const ALL_GAMES = {};
ALL_GAMES[GAME_TYPE_TTT.gameTypeId] = GAME_TYPE_TTT;
ALL_GAMES[GAME_TYPE_C4.gameTypeId]= GAME_TYPE_C4;
ALL_GAMES[GAME_TYPE_Q20.gameTypeId]= GAME_TYPE_Q20;
