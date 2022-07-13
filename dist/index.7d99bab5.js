const canavs = document.querySelector("#game");
const width = canavs.width;
const height = canavs.height;
const ctx = canavs.getContext("2d");
const TILE_SIZE = 20;
const TILES_X = width / TILE_SIZE;
const TILES_Y = height / TILE_SIZE;
ctx.fillStyle = "rgb(100, 240, 150)";
ctx.strokeStyle = "rgb(90, 90, 90)";
ctx.lineWidth = 1;
const drawBorder = ()=>{
    for(let i1 = 0; i1 < TILES_X; i1++){
        ctx.beginPath();
        ctx.moveTo(i1 * TILE_SIZE - 0.5, 0);
        ctx.lineTo(i1 * TILE_SIZE - 0.5, height);
        ctx.stroke();
    }
    for(let j = 0; j < TILES_Y; j++){
        ctx.beginPath();
        ctx.moveTo(0, j * TILE_SIZE - 0.5);
        ctx.lineTo(width, j * TILE_SIZE - 0.5);
        ctx.stroke();
    }
};
const prepareBoard = ()=>{
    const b = [];
    for(let _i = 0; _i < TILES_X; _i++){
        const row = [];
        for(let _j = 0; _j < TILES_X; _j++)row.push(false);
        b.push(row);
    }
    return b;
};
/********************************************************************* */ class Node {
    constructor(myRow, myColmun){
        this.row = myRow;
        this.colmun = myColmun;
    }
}
class GameOfLife {
    cels = [
        [
            true,
            true,
            true,
            true
        ],
        [
            false,
            true,
            true,
            true
        ],
        [
            false,
            true,
            false,
            true
        ],
        [
            true,
            false,
            false,
            true
        ], 
    ];
    display() {
        console.log(this.cels);
    }
    applyRule = ()=>{
        let finalCells = this.cels.map((arr)=>arr.slice());
        for(let _i = 0; _i <= 3; _i++)for(let _j = 0; _j <= 3; _j++){
            let s = this.getCptN(this.getNeighbours(_i, _j));
            finalCells[_i][_j] = s === 3 || this.cels[_i][_j] && s === 2;
        }
        this.cels = finalCells;
        this.display();
        if (!this.allAreFalse()) this.applyRule();
    };
    getCptN = (neighbours)=>{
        let s = 0;
        for (let node of neighbours)if (this.cels[node.row][node.colmun] === true) s += 1;
        return s;
    };
    allAreFalse = ()=>{
        let result = true;
        this.cels.forEach((element)=>{
            element.forEach((node)=>result = result && node === false);
        });
        return result;
    };
    getNeighbours = (i2, j)=>{
        let myNeighbours = new Array();
        if (i2 > 0) {
            myNeighbours.push(new Node(i2 - 1, j));
            if (j > 0) myNeighbours.push(new Node(i2 - 1, j - 1));
            if (j < 3) myNeighbours.push(new Node(i2 - 1, j + 1));
        }
        if (i2 < 3) {
            myNeighbours.push(new Node(i2 + 1, j));
            if (j > 0) myNeighbours.push(new Node(i2 + 1, j - 1));
            if (j < 3) myNeighbours.push(new Node(i2 + 1, j + 1));
        }
        if (j > 0) myNeighbours.push(new Node(i2, j - 1));
        if (j < 3) myNeighbours.push(new Node(i2, j + 1));
        return myNeighbours;
    };
}
const game = new GameOfLife();
for(let i = 0; i < 10; i++)game.applyRule();
/********************************************************************* */ const board = prepareBoard();
const game = new GameOfLife();
drawBorder();

//# sourceMappingURL=index.7d99bab5.js.map
