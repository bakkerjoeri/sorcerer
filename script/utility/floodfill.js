export default function floodfill(cellMap, fromPosition, visitedCells = []) {
    if (cellMap.hasCellAtPosition(fromPosition)) {
        let currentCell = cellMap.findCellAtPosition(fromPosition);

        if (!visitedCells.includes(currentCell) && currentCell.passable) {
            visitedCells.push(currentCell);

            let neighbours = cellMap.findNeighbours(fromPosition);

            neighbours.forEach((neighbour) => {
                floodfill(cellMap, neighbour.position, visitedCells);
            });
        }
    }

    return visitedCells;
}
