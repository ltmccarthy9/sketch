const initialMode = 'color'
const initialColor = '#1f2937'
const initialDimensions = 20

let currentColor = initialColor
let currentMode = initialMode
let currentSize = initialDimensions

const grid = document.getElementById('grid')

const colorPicker = document.getElementById('colorPicker')
colorPicker.oninput = (e) => setCurrentColor(e.target.value)

const saveBtn = document.getElementById('saveButton')
saveBtn.onclick = () => saveColor(currentColor)
const clearColorsBtn = document.getElementById('clearColors')
clearColorsBtn.onclick = () => deleteColors()
let colors = [];

const savedColors = document.getElementById('savedColors');
savedColors.onchange = () => setSavedColor()

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

function saveColor(color) {
    if(colors.includes(color)){
        return;
    }
    colors.push(color)
    localStorage.setItem('colors', JSON.stringify(colors))
    appendColor(color)
}

function appendColor(color){
    let colorOption = document.createElement('option')
    colorOption.setAttribute('value', color)
    colorOption.textContent = color
    colorOption.style.backgroundColor = `${color}`
    savedColors.append(colorOption)
}

function setSavedColor(){
    currentColor = savedColors.value
}

function deleteColors() {
    colors = []
    localStorage.removeItem('colors')
    removeColorOptions()
}

function initialColorSelect() {
    let ourColors = JSON.parse(localStorage.getItem('colors'))
    ourColors.forEach((c, index) => {
        let colorElement = document.createElement('option')
        colorElement.setAttribute("value", c)
        colorElement.textContent = c
        colorElement.style.backgroundColor = `${c}`
        savedColors.append(colorElement)
    })
}

function removeColorOptions() {
    savedColors.textContent = ''
    let chooseColor = document.createElement('option')
    chooseColor.textContent = 'choose a color'
    savedColors.append(chooseColor)
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

if(savedColors.value !== 'choose a color'){
    console.log(savedColors.value)
}

window.onload = () => {
  createGrid(initialDimensions)
  changeMode(initialMode)
  initialColorSelect()
}