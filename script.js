
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

function addHoverToGrid() {
    const allGridElements = document.querySelectorAll('.grid-element');

    allGridElements.forEach(element =>{
        element.addEventListener('mouseenter', (e) => {
            e.target.style.backgroundColor = 'hotpink';
        })
    });
        
}

const gridContainer = document.querySelector('.grid-container');

let gridSize = 16;


const inputBtn = document.querySelector('.change-grid button');
inputBtn.addEventListener('click', (e) =>{
    gridSize = prompt("Enter Grid Size (upto 100): ", "16");

    if (isNaN(gridSize)) {
        gridSize = 16;
    }

    if (parseInt(gridSize) > 100) {
        gridSize = 16;
    }

    makeGrid(+gridSize);
});




makeGrid(gridSize);