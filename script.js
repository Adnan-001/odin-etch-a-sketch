
function getDivDimensions(div) {
    return gridContainer.offsetWidth;
}

function calculateGridElementSize(gridSize) {
    const gridContainerDimension = getDivDimensions(gridContainer);
    return gridContainerDimension/gridSize;
}

function addElementToGrid(gridContainer, gridElementSize) {
    const gridElement = document.createElement('div');

    gridElement.setAttribute('style', `width: ${gridElementSize+'px'}`);
    gridElement.style.height = gridElementSize+'px';

    gridElement.classList.add('grid-element');
    gridContainer.appendChild(gridElement);
}

function isGridAlreadyExist() {
    let element = document.querySelector('.grid-element');
    if (element === null) {
        return false;
    }
    return true;
}

function removeGrid() {
    const allGridElements = document.querySelectorAll('.grid-element');

    allGridElements.forEach(element => {
        gridContainer.removeChild(element);
    });
}

function makeGrid(gridSize) {
    const gridElementSize = calculateGridElementSize(gridSize);

    if (isGridAlreadyExist()) {
        removeGrid();
    }

    for (let i = 0; i < gridSize*gridSize; i++) {
        addElementToGrid(gridContainer, gridElementSize);        
    }

    addHoverToGrid();
}

function getAlphaValueForBackgroundColor(element) {
    let elementColor = element.style.backgroundColor;

    if (elementColor.charAt(3) !== 'a') {
        return 1;
    }

    let elementColorArr = elementColor.split(',');
    let alphaVal = elementColorArr[3];
    alphaVal = alphaVal.substr(0, alphaVal.length-1);

    return parseFloat(alphaVal);
}

function addHoverToGrid() {
    const allGridElements = document.querySelectorAll('.grid-element');

    allGridElements.forEach(element =>{
        element.addEventListener('mouseenter', (e) => {
            if (gridContainer.classList.contains('rainbow-mode')) {
                e.target.style.backgroundColor = generateRandomRGB(.4);
                return;
            }

            if (gridContainer.classList.contains('color-shading')) {
                let currentAlphaVal = getAlphaValueForBackgroundColor(e.target);
                console.log(currentAlphaVal);
            }
            e.target.style.backgroundColor = 'rgb(12,3,3)';
        })
    });
        
}

function generateRandomRGB(alphaValForRGB = 1.0) {
    let r,g,b, colorVal;

    r = Math.floor(Math.random()*256);
    g = Math.floor(Math.random()*256);
    b = Math.floor(Math.random()*256);
    colorVal =  `rgba(${r}, ${g}, ${b}, ${alphaValForRGB})`;

    return colorVal;
}

function addListenerToRainbowBtn() {
    const rainbowModeBtn = document.querySelector('#rainbowMode');
    rainbowModeBtn.addEventListener('click', (e) => {
        console.log(rainbowModeBtn);
        gridContainer.classList.toggle('rainbow-mode');
    });
}

function addListenerToUserInputBtn() {
    const inputBtn = document.querySelector('#gridSize');
    inputBtn.addEventListener('click', (e) => {
        gridSize = prompt("Enter Grid Size (upto 100): ", "16");

        if (gridSize === null) {
            return;
        }

        gridSize = gridSize.trim();
        if (gridSize === '' 
            || isNaN(gridSize) 
            || parseInt(gridSize) > 100)
        {
            return;
        }

        makeGrid(+gridSize);
    });
}


function addListenerToClearBtn() {
    const clearBtn = document.querySelector('#clear-grid');
    
    clearBtn.onclick = function()
    {
        const allGridElements = document.querySelectorAll('.grid-element');
        allGridElements.forEach(element => {
            element.style.backgroundColor = 'transparent';
        });
    }
}

function addListenerToGridLinesBtn() {
    const toggleGridLineBtn = document.querySelector('#toggle-gridLines');

    toggleGridLineBtn.onclick = function () {
        const allGridElements = document.querySelectorAll('.grid-element');

        allGridElements.forEach(element => {
            element.classList.toggle('grid-element-border');
        });
    }
}

function addListenerToShadingBtn() {
    const shaddingBtn = document.querySelector('#toggle-shading');

    shaddingBtn.onclick = function () {
        gridContainer.classList.toggle('color-shading');
    }
}

const gridContainer = document.querySelector('.grid-container');
let gridSize = 16;

addListenerToRainbowBtn();
addListenerToClearBtn();
addListenerToGridLinesBtn();
addListenerToShadingBtn();

addListenerToUserInputBtn();


makeGrid(gridSize);
