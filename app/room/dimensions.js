// @ts-check

import { roomTypes } from './room.js';
import { roll } from '../utility/roll.js';
import { list as sizes } from '../attribute/size.js';

// -- Types --------------------------------------------------------------------

/** @typedef {import('./room.js').RoomType} RoomType */
/** @typedef {import('../attribute/size').Size} Size */

/** @typedef {[ number, number ]} RoomDimensions */ // TODO use Dimensions type

// -- Config -------------------------------------------------------------------

// TODO rename to not confuse "width" with x-axis
const hallLengthMin = 3;
const hallWidthMin  = 1;
const hallWidthMax  = 1;

/**
 * Dimension ranges
 *
 * @type {{ [key in Size]?: RoomDimensions }}
 */
export const dimensionRanges = {
    tiny   : [ 2, 3  ],
    small  : [ 2, 4  ],
    medium : [ 2, 5  ],
    large  : [ 3, 10 ],
    massive: [ 5, 15 ],
};

/**
 * Room sizes
 *
 * TODO make into Sets?
 *
 * @type {{ [key in RoomType]?: Size[] }}
 */
const roomSizes = {
    ballroom : [ 'medium', 'large', 'massive' ],
    bathhouse: [ 'small', 'medium', 'large', 'massive' ],
    dining   : [ 'small', 'medium', 'large', 'massive' ],
    dormitory: [ 'medium', 'large', 'massive' ],
    greatHall: [ 'large', 'massive' ],
    pantry   : [ 'tiny', 'small', 'medium' ],
    parlour  : [ 'tiny', 'small', 'medium' ],
    study    : [ 'tiny', 'small', 'medium' ],
    throne   : [ 'medium', 'large', 'massive' ],
    torture  : [ 'tiny', 'small', 'medium' ],
};

/**
 * Custom room dimensions
 *
 * @type {{
 *     hallway: (roomSize: string, options?: { isHorizontal?: boolean }) => RoomDimensions
 * }}
 */
export const customDimensions = {
    // TODO see below
    hallway: (roomSize, { isHorizontal = roll() } = {}) => {
        let [ min, max ] = dimensionRanges[roomSize];

        let length = roll(Math.max(hallLengthMin, min), max);
        let width  = roll(hallWidthMin, hallWidthMax);

        let roomWidth  = isHorizontal ? length : width;
        let roomHeight = isHorizontal ? width  : length;

        // TODO update Dimensions type object.
        return { roomWidth, roomHeight };
    },
};

/**
 * Room sizes by room RoomType.
 *
 * All room sizes are returned if the room type is not limited to a sub-set of
 * sizes defined in `roomSizes`.
 *
 * Rename to `roomSizesByType` & combine with constant object
 *
 * @type {{ [key: string]: string[] }}
 */
export const roomTypeSizes = roomTypes.reduce((obj, roomType) => {
    obj[roomType] = roomSizes[roomType] || sizes;

    return obj;
}, {});

export {
    hallLengthMin as testHallLengthMin,
    hallWidthMin  as testHallWidthMin,
    hallWidthMax  as testHallWidthMax,
};