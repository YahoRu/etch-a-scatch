const scetchBoard = document.querySelector('.scetch-board');
const colorDisplay = document.querySelector('.color-display');
const whiteColorButton = document.querySelector('.color-white');
const blackColorButton = document.querySelector('.color-black');
const rainbowColorButton = document.querySelector('.color-rainbow');
const smallBoardButton = document.querySelector('.small');
const mediumBoardButton = document.querySelector('.medium');
const largeBoardButton = document.querySelector('.large');
const refreshBoardButton = document.querySelector('.refresh');
const sliderInput = document.querySelector('#slider');
const sliderOutput = document.querySelector('.slider-value');

const BUTTON_HAS_NO_VALUE = '';

let boardRow;
let boardSection;
let elementsInRow = 16;
let mouseButtonDown = false;
let colorInRainbowMode = false;
let colorToDrawWith = 'black';

document.addEventListener('DOMContentLoaded', createTable);

whiteColorButton.addEventListener('click', changeColor);
blackColorButton.addEventListener('click', changeColor);
rainbowColorButton.addEventListener('click', changeColor);

smallBoardButton.addEventListener("click", createTable);
mediumBoardButton.addEventListener("click", createTable);
largeBoardButton.addEventListener("click", createTable);
refreshBoardButton.addEventListener('click', createTable);

sliderInput.addEventListener('input', (event) => {
  sliderOutput.textContent = event.target.value;
});
sliderInput.addEventListener('input', createTable);

document.onmousedown = () => (mouseButtonDown = true);
document.onmouseup = () => (mouseButtonDown = false);

function clearBoard() {
  scetchBoard.innerHTML = "";
};

function changeSliderValue(NumberOfBlocks) {
  sliderOutput.textContent = NumberOfBlocks;
  sliderInput.value = NumberOfBlocks;
}

function randomRGBColor() {

  function randomOneColor() {
    return Math.floor(Math.random() * 256);
  };

  return `rgb(${randomOneColor()}, ${randomOneColor()}, ${randomOneColor()})`;
};

function changeColor(e) {
  if(e.target.value === 'rainbow') {
    colorToDrawWith = 'linear-gradient(to bottom, red 0%, orange 15%, yellow 30%, green 45%, blue 60%, #ff99cc 100%)';
    colorDisplay.style.background = colorToDrawWith;
    colorInRainbowMode = true;
  }
  else if(e.target.value === 'black') {
    colorToDrawWith = 'black';
    colorDisplay.style.background = colorToDrawWith;
    colorInRainbowMode = false;
  } 
  else {
    colorToDrawWith = 'white';
    colorDisplay.style.background = colorToDrawWith;
    colorInRainbowMode = false;
  };
}

function paintOverBlock(e) {
  if (!mouseButtonDown && e.type === 'mouseover') return;

  if(colorInRainbowMode === true) {
    e.target.style.backgroundColor = randomRGBColor();
  }
  else e.target.style.backgroundColor = colorToDrawWith;
};

function createTable(e) {
  clearBoard();

  if(e.target.value !== undefined && 
     e.target.value !== BUTTON_HAS_NO_VALUE) elementsInRow = e.target.value;

  changeSliderValue(elementsInRow);

  for (let i = 0; i < elementsInRow ** 2; i++) {
    boardSection = document.createElement("div");
    boardSection.style.backgroundColor = "white";
    boardSection.style.width = 600 / elementsInRow + "px";
    boardSection.style.height = 600 / elementsInRow + "px";
    boardSection.style.border = "solid rgba(0, 0, 0, 0.5) 0.5px";
    boardSection.style.userSelect = "none";

    boardSection.classList.add("board-section");

    scetchBoard.appendChild(boardSection);

    boardSection.addEventListener("mouseover", paintOverBlock);
    boardSection.addEventListener("mousedown", paintOverBlock);
  };
};