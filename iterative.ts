class Node {
  public row: number;
  public colmun: number;
  constructor(myRow: number, myColmun: number) {
    this.row = myRow;
    this.colmun = myColmun;
  }
}
  export class GameOfLife {
  private cels: boolean[][] = [
    [true, true, true, true],
    [false, true, true, true],
    [false, true, false, true],
    [true, false, false, true],

  ];
  display(){
    console.log(this.cels);
  }
  applyRule = () => {
    let finalCells : boolean[][] = this.cels.map(arr=> arr.slice());
    for(let _i=0;_i<=3;_i++){
     for (let _j=0;_j<=3;_j++){
       let s: number = this.getCptN(this.getNeighbours(_i,_j));
       finalCells[_i][_j]=  (s === 3) || (this.cels[_i][_j] && s ===2);
     }
    }
    this.cels = finalCells;
  };
 getCptN = ( neighbours :Node[]):number =>{
   let s : number = 0;
   for(let node of neighbours){
    if(this.cels[node.row][node.colmun] ===true )
    s+=1;
   }
   return s;
   }
  getNeighbours = (i: number, j: number): Node[] => {
    let myNeighbours: Node[] = new Array();
    if (i > 0) {
      myNeighbours.push(new Node(i - 1, j));
      if(j > 0 ) myNeighbours.push(new Node(i - 1, j - 1));

      if(j < 3 ) myNeighbours.push(new Node(i - 1, j + 1));
    }
    if (i < 3) {
      myNeighbours.push(new Node(i + 1, j));

     if( j > 0 ) myNeighbours.push(new Node(i + 1, j - 1));

     if( j <  3) myNeighbours.push(new Node(i + 1, j + 1));
    }
    if(j > 0 ) myNeighbours.push(new Node(i, j - 1));

    if(j < 3 ) myNeighbours.push(new Node(i, j + 1));

    return myNeighbours;
  };
}
const game = new GameOfLife();
for (let i=1;i<5;i++)
game.applyRule();
game.display();