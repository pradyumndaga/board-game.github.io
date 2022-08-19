import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Board, BoardHelper } from "../board/board";
import { KEY_CODE } from "../app.constants";
import { MatDialog } from "@angular/material/dialog";
import Swal from "sweetalert2";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode == KEY_CODE.DOWN_ARROW && this.Board) {
      // Your row selection code
      this.moveDown();
      // console.log(event);
    }
    if (event.keyCode == KEY_CODE.LEFT_ARROW && this.Board) {
      // Your row selection code
      this.moveLeft();
      // console.log(event);
    }
    if (event.keyCode == KEY_CODE.RIGHT_ARROW && this.Board) {
      // Your row selection code
      this.moveRight();
      // console.log(event);
    }
    if (event.keyCode == KEY_CODE.UP_ARROW && this.Board) {
      // Your row selection code
      this.moveTop();
      // console.log(event);
    }
  }

  img = "./assets/mario.png";
  black = "#B24503";
  green = "#00FF00";
  active = "active";
  length!: number;
  gameOver = false;
  isInputError = false;

  Board!: Board;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onSubmit(event: any) {
    if (!(event === "0" || event === "1" || +event > 10)) {
      this.length = event;
      this.play();
      this.checkGreenSquareEmpty();
      this.isInputError = false;
    } else {
      this.isInputError = true;
    }
  }

  onSwipe(event: any) {
    debugger;
    const x =
      Math.abs(event.deltaX) > 40 ? (event.deltaX > 0 ? "Right" : "Left") : "";
    const y =
      Math.abs(event.deltaY) > 40 ? (event.deltaY > 0 ? "Down" : "Up") : "";
    let isVertical = false;
    isVertical = Math.abs(event.deltaY) >= Math.abs(event.deltaX);

    if (x === "Right" && !isVertical) {
      this.moveRight();
    }
    if (x === "Left" && !isVertical) {
      this.moveLeft();
    }
    if (y === "Down" && isVertical) {
      this.moveDown();
    }
    if (y === "Up" && isVertical) {
      this.moveTop();
    }
  }

  playAgain(): void {
    this.length = 0;
    this.gameOver = false;
  }

  checkGreenSquareEmpty() {
    if (BoardHelper.checkGreenSquares(this.Board)) {
      this.gameOver = true;
      const msg = "Game Over! Steps taken by you:" + this.Board.player.steps;
      Swal.fire(msg);
    }
  }

  getEmptyBoard(): number[][] {
    return Array.from({ length: this.length }, () =>
      Array(this.length).fill(0)
    );
  }

  play() {
    this.Board = BoardHelper.BuildBoard(this.length);
    console.table(this.Board);
  }

  moveRight() {
    this.Board = BoardHelper.movePlayerRight(this.Board, this.length);
    this.checkGreenSquareEmpty();
  }

  moveLeft() {
    this.Board = BoardHelper.movePlayerLeft(this.Board, this.length);
    this.checkGreenSquareEmpty();
  }

  moveTop() {
    this.Board = BoardHelper.movePlayerTop(this.Board, this.length);
    this.checkGreenSquareEmpty();
  }

  moveDown() {
    this.Board = BoardHelper.movePlayerDown(this.Board, this.length);
    this.checkGreenSquareEmpty();
  }
}
