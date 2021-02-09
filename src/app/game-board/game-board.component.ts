// @ts-nocheck

import {Component, OnInit} from '@angular/core';
import {convertDirectiveMetadataToExpression} from '@angular/core/schematics/migrations/undecorated-classes-with-di/decorator_rewrite/convert_directive_metadata';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  gridMap: Map<number, Map<number, number>> = new Map();
  turns = 0;
  dimensions = 5;
  bestScore;

  constructor() {
  }

  ngOnInit(): void {
  }

  generateMap(): void {
    let tile;
    this.dimensions = this.dimensions < 1 ? 5 : Number(this.dimensions);
    this.gridMap.clear();
    for (let x = 0; x < Number(this.dimensions) + 2; x++) {
      let gridRow = new Map();
      for (let y = 0; y < this.dimensions + 2; y++) {
        if (x === 0 || x === this.dimensions + 1 || y === 0 || y === this.dimensions + 1) {
          tile = 9;
        } else {
          tile = Math.random();
          if (tile > 0.5) {
            tile = 1;
          } else {
            tile = 0;
          }
        }
        gridRow.set(y, tile);
      }
      this.gridMap.set(x, gridRow);
    }
  }

  evaluateClick(posX: number, posY: number): void {
    this.turns++;
    this.changeState(posX, posY);
    if (this.gridMap.get(posX + 1).get(posY) !== 9) {
      this.changeState(posX + 1, posY);
    }
    if (this.gridMap.get(posX - 1).get(posY) !== 9) {
      this.changeState(posX - 1, posY);
    }
    if (this.gridMap.get(posX).get(posY + 1) !== 9) {
      this.changeState(posX, posY + 1);
    }
    if (this.gridMap.get(posX).get(posY - 1) !== 9) {
      this.changeState(posX, posY - 1);
    }

  }

  changeState(x: number, y: number): void {
    const result = (Math.abs(this.gridMap.get(x).get(y) - 1));
    this.gridMap.get(x).set(y, result);
  }

  victoryCheck(): void {
    let counter0 = 0;
    for (let x = 1; x < 7; x++) {
      for (let y = 1; y < 7; y++) {
        if (this.gridMap.get(x).get(y) === 0) {
          console.log(x + ' : ' + y);
          counter0++;
          if (counter0 === Math.pow(this.dimensions, 2)) { // proč se ti nelíbili moje uherský konstanty?
            if (this.bestScore > this.turns || this.bestScore === undefined) {
              this.bestScore = this.turns;
            }
            this.turns = 0;
            console.log('Damn, congratulation! You wasted your lifetime playing this shit ');
          }
        }
      }
    }
  }
}
