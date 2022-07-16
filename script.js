
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

function makeGrid(gridSize) {
    const gridElementSize = calculateGridElementSize(gridSize);

    for (let i = 0; i < gridSize*gridSize; i++) {
        addElementToGrid(gridContainer, gridElementSize);        
    }


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
const gridSize = 30;


makeGrid(gridSize);

addHoverToGrid();