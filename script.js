const GRID_SIZE = 16;

/**
 * Creates a grid of a specified number of rows and columns.
 * @param {int} rows 
 * @param {int} cols 
 */
function create_grid(rows, cols) {
    const canvas = document.querySelector('.canvas');
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

/** Main */
create_grid(GRID_SIZE, GRID_SIZE);
const cells = document.querySelectorAll('.cell');
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("mouseover", (event) => {
        event.target.classList.add('hover');
    });
    
    cells[i].addEventListener("mouseout", (event) => {
        event.target.classList.remove('hover');
    });
}