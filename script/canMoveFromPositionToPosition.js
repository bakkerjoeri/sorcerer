import isPositionFree from './isPositionFree';

export default function canMoveFromPositionToPosition(fromPosition, toPosition) {
	return isPositionFree(toPosition);
}
