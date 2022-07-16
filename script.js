
function getDivDimensions(div) {
    return gridContainer.offsetWidth;
}

function calculateGridElementSize(gridSize) {
    let gridContainerDimension = getDivDimensions(gridContainer);

    console.log(gridContainerDimension);
    return Math.floor(gridContainerDimension/gridSize);
}

// function makeGrid() {
//     let [gridElementHeight, gridElementWidth] = calculateGridElementSize(16);

//     for (let i = 0; i < 16; i++) {

//     }



// }

const gridContainer = document.querySelector('.grid-container');

// makeGrid();
