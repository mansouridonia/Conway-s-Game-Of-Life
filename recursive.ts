class Node {
  public row: number;
  public colmun: number;
  constructor(myRow: number, myColmun: number) {
    this.row = myRow;
    this.colmun = myColmun;
  }
}
export class GameOfLife {
  private cels: Boolean[][] = [];
  private heigh: number;
  private width: number;
  private ctx: CanvasRenderingContext2D;
  private TILE_SIZE: number;
  public constructor(
    config: Boolean[][],
    TILE_SIZE: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.cels = config;
    this.heigh = config.length - 1;
    this.width = config[0].length - 1;
    this.TILE_SIZE = TILE_SIZE;
    this.ctx = ctx;
    console.log('x',this.heigh,this.width,TILE_SIZE);
  }
  display() {
    this.ctx.fillStyle = "rgb(255, 250, 0)";

    //this.ctx.clearRect(0, 0, this.width, this.heigh);
    for (let i = 0; i <= this.heigh; i++) {
      for (let j = 0; j <= this.width; j++) {
        if (this.cels[i][j]) {
          this.ctx.fillRect(
            i * this.TILE_SIZE,
            j * this.TILE_SIZE,
            this.TILE_SIZE,
            this.TILE_SIZE
          );
        }
      }
    }
  }
  clearBoard() {
    this.ctx.fillStyle = "rgb(51, 51, 51)";
     this.ctx.strokeStyle = "rgb(90, 90, 90)";
    for (let i = 0; i < this.heigh; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.cels[i][j]) {
          this.ctx.fillRect(
            i * this.TILE_SIZE,
            j * this.TILE_SIZE,
            this.TILE_SIZE,
            this.TILE_SIZE
          );
          this.ctx.strokeRect(
            i * this.TILE_SIZE,
            j * this.TILE_SIZE,
            this.TILE_SIZE,
            this.TILE_SIZE
          );
        }
      }
    }
  }
   async init() {
    // do your async steps here
  }
  async applyRule (): Promise<String>{
    return new Promise((resolve, _reject)=>{
      this.display();
    let finalCells: Boolean[][] = this.cels.map((arr) => arr.slice());
    for (let _i = 0; _i <= this.heigh; _i++) {
      for (let _j = 0; _j <= this.width; _j++) {
        let s: number = this.getCptN(this.getNeighbours(_i, _j));
        finalCells[_i][_j] = s === 3 || (this.cels[_i][_j] && s === 2);
      }
    }
    setTimeout(() => {
      this.clearBoard();
      this.cels = finalCells;
      resolve(new Promise<string>((resolve,reject)=>
      {
        if (!this.allAreFalse())
        this.applyRule();
        else
        reject(alert("Game Over"));
      }
      ));
    }, 1000);
    
  })
  };
  /******** Get Neighbours' count of a Node *****************/

  getCptN = (neighbours: Node[]): number => {
    let s: number = 0;
    for (let node of neighbours) {
      if (this.cels[node.row][node.colmun] === true) s += 1;
    }
    return s;
  };
  allAreFalse = (): boolean => {
    let result: boolean = true;
    this.cels.forEach((element) => {
      element.forEach((node) => (result = result && node === false));
    });
    return result;
  };
  /******** Get Neighbours of a Node *****************/
  getNeighbours = (i: number, j: number): Node[] => {
    let myNeighbours: Node[] = new Array();
    if (i > 0) {
      myNeighbours.push(new Node(i - 1, j));
      if (j > 0) myNeighbours.push(new Node(i - 1, j - 1));

      if (j < this.width) myNeighbours.push(new Node(i - 1, j + 1));
    }
    if (i < this.heigh) {
      myNeighbours.push(new Node(i + 1, j));

      if (j > 0) myNeighbours.push(new Node(i + 1, j - 1));

      if (j < this.width) myNeighbours.push(new Node(i + 1, j + 1));
    }
    if (j > 0) myNeighbours.push(new Node(i, j - 1));

    if (j < this.width) myNeighbours.push(new Node(i, j + 1));

    return myNeighbours;
  };
}