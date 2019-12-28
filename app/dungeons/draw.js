
import { createAttrs } from '../utility/html';
import { directions } from './map';

const pxBorder   = 2;
const pxCell     = 24;
const pxGridLine = 1;

const colorGridBg     = '#f0f0f0';
const colorGridStroke = '#cfcfcf';
const colorRoomBg     = 'rgba(255, 255, 255, 0.7)';
const colorRoomStroke = '#a9a9a9';
const colorText       = '#666666';

export const getRectAttrs = ({ x, y, width, height }) => {
    let xPx = x * pxCell;
    let yPx = y * pxCell;

    let widthPx  = width * pxCell;
    let heightPx = height * pxCell;

    return { x: xPx, y: yPx, width: widthPx, height: heightPx }
};

export const drawText = (text, [ x, y ], { fontSize }) => {
    let attrs = createAttrs({
        x, y: y + 2,
        fill: colorText,
        'alignment-baseline': 'middle',
        'font-family': 'monospace',
        'font-size': `${fontSize}px`,
        'text-anchor': 'middle',
    });

    return `<text ${attrs}>${text}</text>`;
};

const drawLine = ({ x1, y1, x2, y2, color, width }) => {
    let attrs = createAttrs({
        x1, y1, x2, y2,
        stroke: color,
        'shape-rendering': 'crispEdges',
        'stroke-linecap': 'square',
        'stroke-width': width,
    });

    return `<line ${attrs} />`;
};

export const drawGrid = ({ gridWidth, gridHeight }) => {
    let lines = '';

    let gridLineAttrs = {
        color: colorGridStroke,
        width: pxGridLine,
    };

    for (let i = 0; i <= gridHeight; i++) {
        let unit = i * pxCell;

        lines += drawLine({
            ...gridLineAttrs,
            x1: 0,
            y1: unit,
            x2: gridWidth * pxCell,
            y2: unit,

        });
    }

    for (let i = 0; i <= gridWidth; i++) {
        let unit = i * pxCell;

        lines += drawLine({
            ...gridLineAttrs,
            x1: unit,
            y1: 0,
            x2: unit,
            y2: gridHeight * pxCell,
        });
    }

    return lines;
};

export const drawRoom = (rectAttrs) => {
    let attrs = createAttrs({
        ...rectAttrs,
        fill: colorRoomBg,
        stroke: colorRoomStroke,
        'shape-rendering': 'crispEdges',
        'stroke-width': pxBorder,
    });

    return `<rect ${attrs} />`;
};

export const drawDoor = (rectConfig) => {
    let direction = rectConfig.direction;
    let rectAttrs = getRectAttrs(rectConfig)

    let attrs = createAttrs({
        ...rectAttrs,
        fill: colorRoomBg,
        stroke: colorRoomBg,
        'stroke-width': pxBorder,
    });

    let { x, y, width, height } = rectAttrs;

    let lineAttrs = {
        color: colorRoomStroke,
        width: pxBorder,
    };

    let lines = [];

    let x1 = x;
    let y1 = y;
    let x2 = x;
    let y2 = y;

    if (direction === directions.north || direction === directions.south) {
            y2     = y + height;
        let xRight = x + width
        let yHalf  = y + (height / 2);

        lines.push(
            drawLine({ ...lineAttrs, x1, y1, x2, y2 }),
            drawLine({ ...lineAttrs, x1: xRight, y1, x2: xRight, y2 }),
            drawLine({ ...lineAttrs, x1, y1: yHalf, x2: xRight, y2: yHalf }),
        );
    } else {
            x2      = x + width;
        let yBottom = y + height
        let xHalf   = x + (width / 2);

        lines.push(
            drawLine({ ...lineAttrs, x1, y1, x2, y2 }),
            drawLine({ ...lineAttrs, x1, y1: yBottom, x2, y2: yBottom }),
            drawLine({ ...lineAttrs, x1: xHalf, y1, x2: xHalf, y2: yBottom }),
        );
    }

    return `<rect ${attrs} />${lines.join('')}`;
};

export const drawMap = ({ gridWidth, gridHeight }, content) => {
    let attrs = createAttrs({
        width : (gridWidth * pxCell),
        height: (gridHeight * pxCell),
        style : `background: ${colorGridBg}; overflow: visible;`,
    });

    return `<svg ${attrs}>${content}</svg>`;
};