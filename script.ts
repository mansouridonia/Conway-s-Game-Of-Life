import { GameOfLife } from "./recursive";

const canavs = document.querySelector<HTMLCanvasElement>("#game");
if (!!canavs) {
  const ctx = canavs.getContext("2d");

  if (!!ctx) {

  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width = window.innerWidth;
  const width = canavs.width ;
  const height = canavs.height - 100;

  const TILE_SIZE: number = 20;
    const TILES_X = width / TILE_SIZE;
    const TILES_Y = height / TILE_SIZE;
    console.log(TILES_X,TILES_Y);
    ctx.fillStyle = "rgb(255, 250, 0)";
    ctx.strokeStyle = "rgb(90, 90, 90)";
    ctx.lineWidth = 1;
    const drawBorder = () => {
      for (let i = 0; i < TILES_X; i++) {
        ctx.beginPath();
        ctx.moveTo(i * TILE_SIZE - 0.5, 0);
        ctx.lineTo(i * TILE_SIZE - 0.5, height);
        ctx.stroke();
      }
      for (let j = 0; j < TILES_Y; j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * TILE_SIZE - 0.5);
        ctx.lineTo(width, j * TILE_SIZE - 0.5);
        ctx.stroke();
      }
    };
    const prepareBoard = (): Boolean[][] => {
      const b: boolean[][] = [];
      for (let _i = 0; _i < TILES_X; _i++) {
        const row: boolean[] = [];
        for (let _j = 0; _j < TILES_X; _j++) {
          row.push(false);
        }
        b.push(row);
      }
      return b;
    };
    const drawAndClear = () => {
      prepareBoard();
      drawBorder();
    };
    const board = prepareBoard();
    board[3][1] = true;
    board[4][1] = true;
    board[5][1] = true;
    board[9][1] = true;
    board[10][1] = true;
    board[11][1] = true;
   /*********************** */
   board[1][3] = true;
    board[6][3] = true;
    board[8][3] = true;
    board[13][3] = true;
     /*********************** */
   board[1][4] = true;
   board[6][4] = true;
   board[8][4] = true;
   board[13][4] = true;
    /*********************** */
    board[1][5] = true;
    board[6][5] = true;
    board[8][5] = true;
    board[13][5] = true;
    /*********************** */
    board[3][6] = true;
    board[4][6] = true;
    board[5][6] = true;
    board[9][6] = true;
    board[10][6] = true;
    board[11][6] = true;
    /*************************************** */
    board[3][8] = true;
    board[4][8] = true;
    board[5][8] = true;
    board[9][8] = true;
    board[10][8] = true;
    board[11][8] = true;
   /*********************** */
   board[1][9] = true;
    board[6][9] = true;
    board[8][9] = true;
    board[13][9] = true;
     /*********************** */
   board[1][10] = true;
   board[6][10] = true;
   board[8][10] = true;
   board[13][10] = true;
    /*********************** */
    board[1][11] = true;
    board[6][11] = true;
    board[8][11] = true;
    board[13][11] = true;
    /*********************** */
    board[3][13] = true;
    board[4][13] = true;
    board[5][13] = true;
    board[9][13] = true;
    board[10][13] = true;
    board[11][13] = true;
    drawAndClear();

    const game = new GameOfLife(board, TILE_SIZE, ctx);
   ctx.strokeStyle = "rgb(9, 90, 90)";
    console.log(TILES_X,TILES_Y);     
    
            game.applyRule();
  }
}
