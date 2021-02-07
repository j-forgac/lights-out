import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  gridMap: Map<number, Map<number, number>> = new Map();

  constructor() {
  }

  ngOnInit(): void {
  }

  generateMap(): void {
    this.gridMap.clear();
    let tile;
    for (let x = 0; x < 7; x++){
      let gridRow = new Map();
      for (let y = 0; y < 7; y++){
        if (x === 0 || x === 6 || y === 0 || y === 6){
          tile = 9;
        } else {
          tile = Math.random();
          if (tile > 0.5){
            tile = 1;
          }else {
            tile = 0;
          }
        }
        console.log(tile);
        gridRow.set(y, tile);
      }
      this.gridMap.set(x, gridRow);
    }
    console.log(this.gridMap);
  }

  evaluateClick(posX: number, posY: number): void {
    this.changeState(posX, posY);
    // @ts-ignore
    if (this.gridMap.get(posX + 1).get(posY) !== 9) {
      this.changeState(posX + 1, posY);
    }
    // @ts-ignore
    if (this.gridMap.get(posX - 1).get(posY) !== 9) {
      this.changeState(posX - 1, posY);
    }
    // @ts-ignore
    if (this.gridMap.get(posX).get(posY + 1) !== 9) {
      this.changeState(posX, posY + 1);
    }
    // @ts-ignore
    if (this.gridMap.get(posX).get(posY - 1) !== 9) {
      this.changeState(posX, posY - 1);
    }

  }

  changeState(x: number, y: number): void {
    // @ts-ignore
    const result = (Math.abs(this.gridMap.get(x).get(y) - 1));
    // @ts-ignore
    console.log(Math.abs(this.gridMap.get(x).get(y) - 1));
    // @ts-ignore
    this.gridMap.get(x).set(y, result);
  }

  victoryCheck(): void{
    let counter0 = 0;
    let counter1 = 0;
    for (let x = 1; x < 7; x++){
      for (let y = 1; y < 7; y++){
        // @ts-ignore
        if (this.gridMap.get(x).get(y) === 0){
          counter0++;
        } else {
          counter1++;
        }
        if (counter1 === 125 || counter0 === 125){
          console.log("Damn, congratulation! You wasted your lifetime playing this shit");
        }
      }
    }
  }
}
