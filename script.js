
function getDivDimensions(div) {
    return gridContainer.offsetWidth;
}

function calculateGridElementSize(gridSize) {
    const gridContainerDimension = getDivDimensions(gridContainer);
    return Math.floor(gridContainerDimension/gridSize);
}

function addElementToGrid(gridContainer, gridElementSize) {
    const gridElement = document.createElement('div');

    gridElement.setAttribute('style', `width: ${gridElementSize+'px'}`);
    gridElement.style.height = gridElementSize+'px';

    // gridElement.style.backgroundColor = 'blue';
    
    gridContainer.appendChild(gridElement);
}

function makeGrid() {
    const gridElementSize = calculateGridElementSize(16);

    for (let i = 0; i < 16*16; i++) {
        addElementToGrid(gridContainer, gridElementSize);        
    }

        // addElementToGrid(gridContainer, gridElementSize);        
        // addElementToGrid(gridContainer, gridElementSize);        


}

const gridContainer = document.querySelector('.grid-container');

makeGrid();
