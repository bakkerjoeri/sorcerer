// When `entity` does not know about `currentLevelId`:
function addEntityToLevelAtPosition(entityId, levelId, position) {
    let entity = getEntityWithId(entityId);
    let level = getLevelWithId(levelId);
    
    // add `entityId` to room with `level.roomId`
    // add `entityId` to `level.entities`
    // add `entityId` to `tile.entities` with `tiles.position` in `level.tiles`
    // update `entity.currentLevelId` to `levelId`
    // update `entity.position` to `position`
}

function moveEntityToPosition(entityId, newPosition, currentLevelId) {
    let entity = getEntityWithId(entityId);
    
    // if `newPosition` is not `entity.position`
        let oldTile = getTileAtPosition(entity.position, currentLevelId);
        let newTile = getTileAtPositionInLevel(newPosition, currentLevelId);
        // remove `entityId` from `tile.entities` with `entity.position` in `level.tiles`
        // add `entityId` to `tile.entities` with `newPosition` in `level.tiles`
        // update `entity.position` to `position`
}

function moveEntityToLevelAtPosition(entityId, oldLevelId, newLevelId, newPosition) {
    let entity = getEntityWithId(entityId);
    let oldLevel = getLevelWithId(oldLevelId);
    let newLevel = getLevelWithId(newLevelId);

    // if `newLevelId` is not `oldLevelId`
        // remove `entityId` from `tile.entities` with `entity.position` in `oldLevel.tiles`
        // remove `entityId` from `oldLevel.entities`
        // add `entityId` to `newLevel.entities`
        // update `entity.currentLevelId` to `levelId`
        // add `entityId` to `tile.entities` with `newPosition` in `newLevel.tiles`
        // update `entity.position` to `newPosition`
    // else if `newPosition` is not `entity.position`
        // moveEntityToPosition(entityId, newPosition)
}

function canEntityBeAtPosition(entityId, position) {
    let entity = getEntityWithId(entityId);
    
    
}

function isPositionInLevelFree(position, levelId) {
    
}

// When `entity` does know about `currentLevelId`
function addEntityToLevelAtPosition(entityId, levelId, position) {
    let entity = getEntityWithId(entityId);
    let level = getLevelWithId(levelId);
    
    // add `entityId` to room with `level.roomId`
    // add `entityId` to `level.entities`
    // add `entityId` to `tile.entities` with `tiles.position` in `level.tiles`
    // update `entity.currentLevelId` to `levelId`
    // update `entity.position` to `position`
}

function moveEntityToPosition(entityId, newPosition) {
    let entity = getEntityWithId(entityId);
    
    // if `newPosition` is not `entity.position`
        let oldTile = getTileAtPosition(entity.position, entity.currentLevelId);
        let newTile = getTileAtPositionInLevel(newPosition, entity.currentLevelId);
        // remove `entityId` from `tile.entities` with `entity.position` in `level.tiles`
        // add `entityId` to `tile.entities` with `newPosition` in `level.tiles`
        // update `entity.position` to `position`
}

function moveEntityToLevelAtPosition(entityId, newLevelId, newPosition) {
    let entity = getEntityWithId(entityId);
    let oldLevel = getLevelWithId(entity.currentLevelId);
    let newLevel = getLevelWithId(newLevelId);

    // if `newLevelId` is not `entity.currentLevelId`
        // remove `entityId` from `tile.entities` with `entity.position` in `oldLevel.tiles`
        // remove `entityId` from `oldLevel.entities`
        // add `entityId` to `newLevel.entities`
        // add `entityId` to `tile.entities` with `newPosition` in `newLevel.tiles`
        // update `entity.position` to `newPosition`
    // else if `newPosition` is not `entity.position`
        // moveEntityToPosition(entityId, newPosition)
}