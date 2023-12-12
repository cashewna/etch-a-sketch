const GRID_SIZE = 16;

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

/**
 * Highlights a cell when the mouse hovers over it.
 */
function highlight_cells_on_hover() {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("mouseover", (event) => {
            event.target.classList.add('hover');
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
            highlight_cells_on_hover();
        } else {
            alert("Please enter a number between 1 and 100.");
        }
    });
}

/** Main */
initialise_grid(GRID_SIZE, GRID_SIZE);
highlight_cells_on_hover();
resize_grid();