const DEFAULT_MODE = 'color'
const DEFAULT_COLOR = '#1f2937'
const DEFAULT_SIZE = 20

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

const grid = document.getElementById('grid')

const colorPicker = document.getElementById('colorPicker')
colorPicker.oninput = (e) => setCurrentColor(e.target.value)

const solidModeBtn = document.getElementById('solidMode')
solidModeBtn.onclick = () => setCurrentMode('color')

const eraserBtn = document.getElementById('eraserBtn')
eraserBtn.onclick = () => setCurrentMode('eraser')

const clearBtn = document.getElementById('clearBtn')
clearBtn.onclick = () => reloadGrid()

const sizeValue = document.getElementById('gridSize')

const sizeSlider = document.getElementById('gridSizeSlider')
sizeSlider.onmousemove = (e) => changeGridSizeDisplay(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)

const body = document.querySelector('body')
let mouseDown = false
body.onmousedown = () => (mouseDown = true)
body.onmouseup = () => (mouseDown = false)

function setCurrentSize(newSize) {
    currentSize = newSize
}
function setCurrentColor(newColor) {
  currentColor = newColor
}
function setCurrentMode(newMode) {
  changeMode(newMode)
  currentMode = newMode
}

function createGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
    for (let i = 0; i < size * size; i++) {
      const gridElement = document.createElement('div')
      gridElement.classList.add('grid-element')
      gridElement.addEventListener('mouseover', changeColor)
      gridElement.addEventListener('mousedown', changeColor)
      grid.appendChild(gridElement)
    }
  }
  
function reloadGrid() {
    grid.textContent = ''
    createGrid(currentSize)
}
  
function changeSize(value) {
  setCurrentSize(value)
  changeGridSizeDisplay(value)
  reloadGrid()
}

function changeGridSizeDisplay(value) {
  sizeValue.textContent = `${value} x ${value}`
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return
  
  if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#fefefe'
  }
}

function changeMode(newMode) {
  if (currentMode === 'color') {
    solidModeBtn.classList.remove('active')
  } else if (currentMode === 'eraser') {
    eraserBtn.classList.remove('active')
  }

  if (newMode === 'color') {
    solidModeBtn.classList.add('active')
  } else if (newMode === 'eraser') {
    eraserBtn.classList.add('active')
  }
}

window.onload = () => {
  createGrid(DEFAULT_SIZE)
  changeMode(DEFAULT_MODE)
}