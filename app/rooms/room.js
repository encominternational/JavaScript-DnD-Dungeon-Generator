
import { generateItems } from '../items/generate';
import { getDescription } from './description';

export const generateRoom = (settings, roomNumber) => {
    return [
        getDescription(settings, roomNumber),
        ...generateItems(settings),
    ].join('');
};
