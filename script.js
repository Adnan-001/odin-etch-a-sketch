
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

    addHoverEffectToGrid();
}

function isElementContainClass(element, className)
{
    if (element.classList.contains(className)) 
    {
        return true;
    }
    return false;
}

function applyColorShading(element) {
    let elementColor = element.style.backgroundColor;

    if (elementColor === '' ||
    elementColor === 'transparent') 
    {
        return;
    }

    let elementColorArr = elementColor.split(',');

    let r,g,b;
    r = elementColorArr[0].slice(4);
    g = elementColorArr[1];
    b = elementColorArr[2].slice(0, elementColorArr[2].length-1);
    
    r = r*0.9;
    g = g*0.9;
    b = b*0.9;

    element.style.backgroundColor = `rgb(${r.toFixed(2)}, ${g.toFixed(2)}, ${b.toFixed(2)})`;
}

function applyColorLighting(element) {
    let elementColor = element.style.backgroundColor;

    if (elementColor === '' ||
    elementColor === 'transparent') 
    {
        return;
    }

    let elementColorArr = elementColor.split(',');

    let r,g,b;
    r = elementColorArr[0].slice(4);
    g = elementColorArr[1];
    b = elementColorArr[2].slice(0, elementColorArr[2].length-1);
    
    r = +r + (255-r)*0.1;
    g = +g + (255-g)*0.1;
    b = +b + (255-b)*0.1;

    element.style.backgroundColor = `rgb(${r.toFixed(2)}, ${g.toFixed(2)}, ${b.toFixed(2)})`;
}

function applyEraser(element) {
    element.style.backgroundColor = '';
}

function performPenOperation(gridElement) 
{
    if (isElementContainClass(gridContainer, 'eraser')) {
        applyEraser(gridElement)
        return;
    }

    if (isElementContainClass(gridContainer, 'color-lighting')) {
        applyColorLighting(gridElement)
        return;
    }

    if (isElementContainClass(gridContainer, 'color-shading')) {
        applyColorShading(gridElement)
        return;
    }

    if (isElementContainClass(gridContainer, 'rainbow-mode')) {
        gridElement.style.backgroundColor = generateRandomRGB();
        return;
    }

    gridElement.style.backgroundColor = penColor;     
}

function addHoverEffectToGrid() {
    const allGridElements = document.querySelectorAll('.grid-element');
    let isDrag = false;

    gridContainer.onmousedown = function() {
        isDrag = true;
    }
    window.onmouseup = function () {
        isDrag = false;
    }

    allGridElements.forEach(element =>{
        // if user wants drag effect 
        element.addEventListener('mouseenter', (e) => {
            if (!isDrag) {
                return;
            }
            performPenOperation(e.target);
        });

        // if user only clicks on a single grid-element
        element.addEventListener('mousedown', (e) => {
            performPenOperation(e.target);
        });
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
        if (!isElementContainClass(gridContainer, 'rainbow-mode')) {
            let classList = ['color-shading', 'color-lighting', 'eraser'];
            removeClassListFromElement(gridContainer, classList);    
        }
        if (!isElementContainClass(rainbowModeBtn, 'style-selected-btn')) {
            removeHighlightingToPenBtns();
        }
    
        rainbowModeBtn.classList.toggle('style-selected-btn');
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
            || parseInt(gridSize) > 100
            || parseInt(gridSize) < 1)
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
        toggleGridLineBtn.classList.toggle('style-selected-btn');
    }
}

function removeClassFromElement(element, className) {
    if (!isElementContainClass(element, className)) {
        return;
    }
    element.classList.toggle(className);
}

function removeClassListFromElement(element, classArr)
{
    classArr.forEach(className => {
        removeClassFromElement(element, className);
    });
}

function addListenerToShadingBtn() {
    const shadingBtn = document.querySelector('#toggle-shading');

    shadingBtn.onclick = function () {
        if (!isElementContainClass(gridContainer, 'color-shading')) {
            let classList = ['rainbow-mode', 'color-lighting', 'eraser'];
            removeClassListFromElement(gridContainer, classList);    
        }
        if (!isElementContainClass(shadingBtn, 'style-selected-btn')) {
            removeHighlightingToPenBtns();
        }

        shadingBtn.classList.toggle('style-selected-btn');
        gridContainer.classList.toggle('color-shading');
    }
}

function addListenerToLightingBtn() {
    const lightingBtn = document.querySelector('#toggle-lighting')

    lightingBtn.onclick = function () {
        if (!isElementContainClass(gridContainer, 'color-lighting')) {
            let classList = ['rainbow-mode', 'color-shading', 'eraser'];
            removeClassListFromElement(gridContainer, classList);    
        }
        if (!isElementContainClass(lightingBtn, 'style-selected-btn')) {
            removeHighlightingToPenBtns();
        }

        lightingBtn.classList.toggle('style-selected-btn');
        gridContainer.classList.toggle('color-lighting')
    }
}

function addListenerToEraserBtn() {
    const eraseBtn = document.querySelector('#eraser');

    eraseBtn.onclick = function () {
        if (!isElementContainClass(gridContainer, 'eraser')) {
            let classList = ['rainbow-mode', 'color-shading', 'color-lighting'];
            removeClassListFromElement(gridContainer, classList);    
        }

        if (!isElementContainClass(eraseBtn, 'style-selected-btn')) {
            removeHighlightingToPenBtns();
        }

        eraseBtn.classList.toggle('style-selected-btn');
        gridContainer.classList.toggle('eraser');
    }
}

function removeHighlightingToPenBtns() {
    const btnList = document.querySelectorAll('.side-panel .pen');

    btnList.forEach(btn => {
        removeClassFromElement(btn, 'style-selected-btn');
    });
}

function addListenerToColorInput() {
    const colorPicker = document.getElementById('color-picker');
    const colorPickerWrapper = document.getElementById('color-picker-wrapper');

    colorPicker.addEventListener('input', (e)=> {
        penColor = colorPicker.value;
        colorPickerWrapper.style.backgroundColor = penColor;
    });

    colorPickerWrapper.onclick = function () {
        colorPicker.click();
    }

    colorPickerWrapper.style.backgroundColor = penColor;

}

const gridContainer = document.querySelector('.grid-container');
let gridSize = 16;
let penColor = `rgb(40, 42, 46)`;

addListenerToRainbowBtn();
addListenerToClearBtn();
addListenerToGridLinesBtn();
addListenerToShadingBtn();
addListenerToLightingBtn();
addListenerToEraserBtn();
addListenerToColorInput();

addListenerToUserInputBtn();


makeGrid(gridSize);
