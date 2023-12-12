let GRID_SIZE = 16;

/**
 * Removes all children of a given node.
 * @param {Node} parent 
 */
function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/**
 * Creates a grid of a specified number of rows and columns.
 * @param {int} rows 
 * @param {int} cols 
 */
function initialise_grid(rows, cols) {
    const canvas = document.querySelector('.canvas');
    removeChildren(canvas);

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        canvas.appendChild(row);
    }
}

let mouseDown = 0;
document.body.onmousedown = () => {
    mouseDown = 1;
}

document.body.onmouseup = () => {
    mouseDown = 0;
}

/**
 * Add effects to a cell:
 *   - highlight a cell onhover
 *   - change a cell's color on click
 */
function initialise_cell_effects() {
    const cells = document.querySelectorAll('.cell');
    
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("mouseover", (event) => {
            event.target.classList.add('hover');

            /** Progressively darken squares on mouseDown */
            if (mouseDown) {
                let currentColor = event.target.style.backgroundColor;
                let match = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(currentColor);
                let red = match ? Math.max(0, match[1] - 25) : 200;
                let green = match ? Math.max(0, match[2] - 25) : 200;
                let blue = match ? Math.max(0, match[3] - 25) : 200;
                event.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

            }
        });

        cells[i].addEventListener("mouseout", (event) => {
            event.target.classList.remove('hover');
        });
    }
}

function resize_grid() {
    const resizeButton = document.querySelector('#resize');
    resizeButton.addEventListener("click", (event) => {
        let result = prompt("Enter a new grid size: ");
        if (result === null || result === "") {
            alert("Please enter a number between 1 and 100.");
            return;
        }

        let newGridSize = parseInt(result);
        if (newGridSize > 1 || newGridSize < 100) {
            initialise_grid(newGridSize, newGridSize);
            initialise_cell_effects();
            GRID_SIZE = newGridSize;
        } else {
            alert("Please enter a number between 1 and 100.");
        }
    });
}

function clear_grid() {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "rgb(255, 255, 255)";
    }
    initialise_grid(GRID_SIZE, GRID_SIZE);
    initialise_cell_effects();
}

const clearButton = document.querySelector('#clear');
clearButton.addEventListener("click", (_event) => {
    clear_grid();
});
/** Main */
initialise_grid(GRID_SIZE, GRID_SIZE);
initialise_cell_effects();
resize_grid();