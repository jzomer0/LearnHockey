// access css colours
const rootStyle = getComputedStyle(document.documentElement);

const lineRed = rootStyle.getPropertyValue('--line-red').trim();
const lineBlue = rootStyle.getPropertyValue('--line-blue').trim();
const creaseBlue = rootStyle.getPropertyValue('--crease-blue').trim();
const white = rootStyle.getPropertyValue('--white').trim();

const canvas = document.getElementById('rink');
const ctx = canvas.getContext('2d');

// Get the dimensions of the viewport
const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight;

// dimensions
const rinkWidthFeet = 85;
const rinkLengthFeet = 200;
const cornerRadiusFeet = 28;
const highResFactor = 2;            // NOTE: 10 looks better zoomed-in

// set scale
const scaleWidth = window.innerWidth / rinkWidthFeet;
const scaleHeight = window.innerHeight / rinkLengthFeet;
// max scale that fits
const scale = Math.min(maxWidth / rinkWidthFeet, maxHeight / rinkLengthFeet) * highResFactor;

// math for goal line from curve
const goalLineFromCurveFeet = 28 - Math.sqrt(Math.pow(28,2) - Math.pow(17,2));

// dimensions for drawing
const rinkWidth = rinkWidthFeet * scale;
const rinkLength = rinkLengthFeet * scale;
const cornerRadius = cornerRadiusFeet * scale;
const goalLineFromBoards = 11 * scale;
const blueLineFromGoalLine = 64 * scale;
const goalLineFromCurve = goalLineFromCurveFeet * scale;
const zoneDotsFromGoalLine = 20 * scale;
const zoneDotsFromBoards = 20.5 * scale;
const circleRadius = 15 * scale;
const refCircleRadius = 10 * scale;
const hashMarksFromBoards = 3.5 * scale;
const hashMarksLength = 2 * scale;
const oneFoot = scale;
const oneInch = scale / 12;

// set canvas size
canvas.width = rinkWidth;
canvas.height = rinkLength;

// calculate css dimensions to maintain aspect ratio
const cssWidth = rinkWidthFeet * Math.min(scaleWidth, scaleHeight);
const cssHeight = rinkLengthFeet * Math.min(scaleWidth, scaleHeight);

// scale down to fit in viewport
canvas.style.width = `${cssWidth}px`;
canvas.style.height = `${cssHeight}px`;

// draw rink
drawRink(ctx);

function drawRink(ctx) {
    drawIce(ctx);
    lineDetails(ctx);       // calls drawLine()
    circleDetails(ctx);     // calls drawCircle()
    markingDetails(ctx);    // calls drawMarkings()
    creaseDetails(ctx);     // calls drawCrease()
}

// draw ice (background)
function drawIce(ctx) {
    // set styles
    ctx.fillStyle = white;

    ctx.beginPath();
    ctx.moveTo(cornerRadius, 0);                                                            // top left corner
    ctx.lineTo(rinkWidth - cornerRadius, 0);                            // top
    ctx.arcTo(rinkWidth, 0, rinkWidth, cornerRadius, cornerRadius);                         // top right corner
    ctx.lineTo(rinkWidth, rinkLength - cornerRadius);                   // right
    ctx.arcTo(rinkWidth, rinkLength, rinkWidth - cornerRadius, rinkLength, cornerRadius);   // bottom right corner
    ctx.lineTo(cornerRadius, rinkLength);                               // bottom
    ctx.arcTo(0, rinkLength, 0, rinkLength - cornerRadius, cornerRadius);                   // bottom left corner
    ctx.lineTo(0, cornerRadius);                                        // left
    ctx.arcTo(0, 0, cornerRadius, 0, cornerRadius);                                         // top left corner
    ctx.closePath();
    ctx.fill();
}

function lineDetails(ctx) {
    // set styles
    ctx.strokeStyle = lineRed;
    ctx.lineWidth = oneInch * 2;
    // draw lines
    ctx.fillStyle = lineRed;
    drawLine('centre', ctx);

    ctx.fillStyle = lineBlue;
    drawLine('topBlue', ctx);
    drawLine('bottomBlue', ctx);

    drawLine('topGoal', ctx);
    drawLine('bottomGoal', ctx);
}

function drawLine(location, ctx) {
    ctx.beginPath();
    if (location === 'centre') {
        ctx.moveTo(0, rinkLength / 2 - oneFoot / 2);
        ctx.lineTo(rinkLength, rinkLength / 2 - oneFoot / 2);
        ctx.lineTo(rinkLength, rinkLength / 2 + oneFoot / 2);
        ctx.lineTo(0, rinkLength / 2 + oneFoot / 2);
    } else if (location === 'topBlue') {
        ctx.moveTo(0, goalLineFromBoards + blueLineFromGoalLine - oneFoot / 2);
        ctx.lineTo(rinkLength, goalLineFromBoards + blueLineFromGoalLine - oneFoot / 2);
        ctx.lineTo(rinkLength, goalLineFromBoards + blueLineFromGoalLine + oneFoot / 2);
        ctx.lineTo(0, goalLineFromBoards + blueLineFromGoalLine + oneFoot / 2);
    } else if (location === 'bottomBlue') {
        ctx.moveTo(0, rinkLength - goalLineFromBoards - blueLineFromGoalLine + oneFoot / 2);
        ctx.lineTo(rinkLength, rinkLength - goalLineFromBoards - blueLineFromGoalLine + oneFoot / 2);
        ctx.lineTo(rinkLength, rinkLength - goalLineFromBoards - blueLineFromGoalLine - oneFoot / 2);
        ctx.lineTo(0, rinkLength - goalLineFromBoards - blueLineFromGoalLine - oneFoot / 2);
    } else if (location === 'topGoal') {
        ctx.moveTo(goalLineFromCurve, goalLineFromBoards);
        ctx.lineTo(rinkWidth - goalLineFromCurve, goalLineFromBoards);
    } else if (location === 'bottomGoal') {
        ctx.moveTo(goalLineFromCurve, rinkLength - goalLineFromBoards);
        ctx.lineTo(rinkWidth - goalLineFromCurve, rinkLength - goalLineFromBoards);
    }
    ctx.fill();
    ctx.stroke();
}

function circleDetails(ctx) {
    // set styles
    ctx.strokeStyle = lineRed;
    ctx.lineWidth = oneInch * 2;
    ctx.fillStyle = lineBlue;

    // draw circles
    drawCircle('centre', ctx);
    drawCircle('refCircle', ctx);
    drawCircle('topLeft', ctx);
    drawCircle('topRight', ctx);
    drawCircle('bottomLeft', ctx);
    drawCircle('bottomRight', ctx);
}

function drawCircle(location, ctx) {
    ctx.beginPath();
    if (location === 'centre') {
        // draw centre dot
        ctx.arc(rinkWidth / 2, rinkLength / 2, oneFoot / 2, 0, 2 * Math.PI);
        ctx.fill();

        ctx.arc(rinkWidth / 2, rinkLength / 2, circleRadius, 0, 2 * Math.PI);
    } else if (location === 'refCircle') {
        ctx.arc(rinkWidth, rinkLength / 2, refCircleRadius, 0, 2 * Math.PI);
    } else if (location === 'topLeft') {
        ctx.arc(zoneDotsFromBoards, goalLineFromBoards + zoneDotsFromGoalLine, circleRadius, 0, 2 * Math.PI);
    } else if (location === 'topRight') {
        ctx.arc(rinkWidth - zoneDotsFromBoards, goalLineFromBoards + zoneDotsFromGoalLine, circleRadius, 0, 2 * Math.PI);
    } else if (location === 'bottomLeft') {
        ctx.arc(zoneDotsFromBoards, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine, circleRadius, 0, 2 * Math.PI);
    } else if (location === 'bottomRight') {
        ctx.arc(rinkWidth - zoneDotsFromBoards, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine, circleRadius, 0, 2 * Math.PI);
    } 
    ctx.stroke();
}

function markingDetails(ctx) {
    // set styles
    ctx.fillStyle = lineRed;
    ctx.strokeStyle = lineRed;
    ctx.lineWidth = oneInch * 2;

    // draw neutral zone faceoff dots
    drawMarkings('topLeftN', ctx);
    drawMarkings('topRightN', ctx);
    drawMarkings('bottomLeftN', ctx);
    drawMarkings('bottomRightN', ctx);

    // draw zone faceoff dots
    drawMarkings('topLeft', ctx);
    drawMarkings('topRight', ctx);
    drawMarkings('bottomLeft', ctx);
    drawMarkings('bottomRight', ctx);

    // draw faceoff markings
    drawMarkings('topLeftFaceoffMarks', ctx);
    drawMarkings('topLeftHashMarks', ctx);
    drawMarkings('topRightFaceoffMarks', ctx);
    drawMarkings('topRightHashMarks', ctx);
    drawMarkings('bottomLeftFaceoffMarks', ctx);
    drawMarkings('bottomLeftHashMarks', ctx);
    drawMarkings('bottomRightFaceoffMarks', ctx);
    drawMarkings('bottomRightHashMarks', ctx);
}

function drawMarkings(location, ctx) {
    ctx.beginPath();
    // draw neutral zone faceoff dots
    if (location === 'topLeftN') {
        ctx.arc(zoneDotsFromBoards, goalLineFromBoards + blueLineFromGoalLine + oneFoot / 2 + 5 * oneFoot, oneFoot, 0, 2 * Math.PI);
    } else if (location === 'topRightN') {
        ctx.arc(rinkWidth - zoneDotsFromBoards, goalLineFromBoards + blueLineFromGoalLine + oneFoot / 2 + 5 * oneFoot, oneFoot, 0, 2 * Math.PI);
    } else if (location === 'bottomLeftN') {
        ctx.arc(zoneDotsFromBoards, rinkLength - goalLineFromBoards - blueLineFromGoalLine - oneFoot / 2 - 5 * oneFoot, oneFoot, 0, 2 * Math.PI);
    } else if (location === 'bottomRightN') {
        ctx.arc(rinkWidth - zoneDotsFromBoards, rinkLength - goalLineFromBoards - blueLineFromGoalLine - oneFoot / 2 - 5 * oneFoot, oneFoot, 0, 2 * Math.PI);
    }
    // draw zone faceoff dots
    else if (location === 'topLeft') {
        ctx.arc(zoneDotsFromBoards, goalLineFromBoards + zoneDotsFromGoalLine, oneFoot, 0, 2 * Math.PI);
    } else if (location === 'topRight') {
        ctx.arc(rinkWidth - zoneDotsFromBoards, goalLineFromBoards + zoneDotsFromGoalLine, oneFoot, 0, 2 * Math.PI);
    } else if (location === 'bottomLeft') {
        ctx.arc(zoneDotsFromBoards, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine, oneFoot, 0, 2 * Math.PI);
    } else if (location === 'bottomRight') {
        ctx.arc(rinkWidth - zoneDotsFromBoards, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine, oneFoot, 0, 2 * Math.PI);
    }
    // draw faceoff markings
    else if (location === 'topLeftFaceoffMarks') {
        ctx.beginPath();
        ctx.moveTo(zoneDotsFromBoards - 4 * oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 2 * oneFoot);
        ctx.lineTo(zoneDotsFromBoards - oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 2 * oneFoot);
        ctx.lineTo(zoneDotsFromBoards - oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 6 * oneFoot);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(zoneDotsFromBoards + 4 * oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 2 * oneFoot);
        ctx.lineTo(zoneDotsFromBoards + oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 2 * oneFoot);
        ctx.lineTo(zoneDotsFromBoards + oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 6 * oneFoot);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(zoneDotsFromBoards - 4 * oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 2 * oneFoot);
        ctx.lineTo(zoneDotsFromBoards - oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 2 * oneFoot);
        ctx.lineTo(zoneDotsFromBoards - oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 6 * oneFoot);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(zoneDotsFromBoards + 4 * oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 2 * oneFoot);
        ctx.lineTo(zoneDotsFromBoards + oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 2 * oneFoot);
        ctx.lineTo(zoneDotsFromBoards + oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 6 * oneFoot);
        ctx.stroke();

        ctx.beginPath();
    } else if (location === 'topLeftHashMarks') {
        ctx.moveTo(hashMarksFromBoards, goalLineFromBoards + zoneDotsFromGoalLine - oneFoot * 1.5)
        ctx.lineTo(hashMarksFromBoards + hashMarksLength, goalLineFromBoards + zoneDotsFromGoalLine - oneFoot * 1.5);

        ctx.moveTo(hashMarksFromBoards, goalLineFromBoards + zoneDotsFromGoalLine + oneFoot * 1.5)
        ctx.lineTo(hashMarksFromBoards + hashMarksLength, goalLineFromBoards + zoneDotsFromGoalLine + oneFoot * 1.5);

        ctx.moveTo(zoneDotsFromBoards + circleRadius, goalLineFromBoards + zoneDotsFromGoalLine - oneFoot * 1.5)
        ctx.lineTo(zoneDotsFromBoards + circleRadius + hashMarksLength, goalLineFromBoards + zoneDotsFromGoalLine - oneFoot * 1.5);

        ctx.moveTo(zoneDotsFromBoards + circleRadius, goalLineFromBoards + zoneDotsFromGoalLine + oneFoot * 1.5)
        ctx.lineTo(zoneDotsFromBoards + circleRadius + hashMarksLength, goalLineFromBoards + zoneDotsFromGoalLine + oneFoot * 1.5);
    } else if (location === 'topRightFaceoffMarks') {
        ctx.beginPath();
        ctx.moveTo(rinkWidth - zoneDotsFromBoards - 4 * oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 2 * oneFoot);
        ctx.lineTo(rinkWidth - zoneDotsFromBoards - oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 2 * oneFoot);
        ctx.lineTo(rinkWidth - zoneDotsFromBoards - oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 6 * oneFoot);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(rinkWidth - zoneDotsFromBoards + 4 * oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 2 * oneFoot);
        ctx.lineTo(rinkWidth - zoneDotsFromBoards + oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 2 * oneFoot);
        ctx.lineTo(rinkWidth - zoneDotsFromBoards + oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 6 * oneFoot);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(rinkWidth - zoneDotsFromBoards - 4 * oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 2 * oneFoot);
        ctx.lineTo(rinkWidth - zoneDotsFromBoards - oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 2 * oneFoot);
        ctx.lineTo(rinkWidth - zoneDotsFromBoards - oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 6 * oneFoot);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(rinkWidth - zoneDotsFromBoards + 4 * oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 2 * oneFoot);
        ctx.lineTo(rinkWidth - zoneDotsFromBoards + oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 2 * oneFoot);
        ctx.lineTo(rinkWidth - zoneDotsFromBoards + oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 6 * oneFoot);
        ctx.stroke();

        ctx.beginPath();
    } else if (location === 'topRightHashMarks') {
        ctx.moveTo(rinkWidth - hashMarksFromBoards, goalLineFromBoards + zoneDotsFromGoalLine - oneFoot * 1.5)
        ctx.lineTo(rinkWidth - hashMarksFromBoards - hashMarksLength, goalLineFromBoards + zoneDotsFromGoalLine - oneFoot * 1.5);

        ctx.moveTo(rinkWidth - hashMarksFromBoards, goalLineFromBoards + zoneDotsFromGoalLine + oneFoot * 1.5)
        ctx.lineTo(rinkWidth - hashMarksFromBoards - hashMarksLength, goalLineFromBoards + zoneDotsFromGoalLine + oneFoot * 1.5);

        ctx.moveTo(rinkWidth - zoneDotsFromBoards - circleRadius, goalLineFromBoards + zoneDotsFromGoalLine - oneFoot * 1.5)
        ctx.lineTo(rinkWidth - zoneDotsFromBoards - circleRadius - hashMarksLength, goalLineFromBoards + zoneDotsFromGoalLine - oneFoot * 1.5);

        ctx.moveTo(rinkWidth - zoneDotsFromBoards - circleRadius, goalLineFromBoards + zoneDotsFromGoalLine + oneFoot * 1.5)
        ctx.lineTo(rinkWidth - zoneDotsFromBoards - circleRadius - hashMarksLength, goalLineFromBoards + zoneDotsFromGoalLine + oneFoot * 1.5);
    } else if (location === 'bottomLeftFaceoffMarks') {
        ctx.beginPath();
        ctx.moveTo(zoneDotsFromBoards - 4 * oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 2 * oneFoot);
        ctx.lineTo(zoneDotsFromBoards - oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 2 * oneFoot);
        ctx.lineTo(zoneDotsFromBoards - oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 6 * oneFoot);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(zoneDotsFromBoards + 4 * oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 2 * oneFoot);
        ctx.lineTo(zoneDotsFromBoards + oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 2 * oneFoot);
        ctx.lineTo(zoneDotsFromBoards + oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 6 * oneFoot);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(zoneDotsFromBoards - 4 * oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 2 * oneFoot);
        ctx.lineTo(zoneDotsFromBoards - oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 2 * oneFoot);
        ctx.lineTo(zoneDotsFromBoards - oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 6 * oneFoot);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(zoneDotsFromBoards + 4 * oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 2 * oneFoot);
        ctx.lineTo(zoneDotsFromBoards + oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 2 * oneFoot);
        ctx.lineTo(zoneDotsFromBoards + oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 6 * oneFoot);
        ctx.stroke();

        ctx.beginPath();
    } else if (location === 'bottomLeftHashMarks') {
        ctx.moveTo(hashMarksFromBoards, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + oneFoot * 1.5)
        ctx.lineTo(hashMarksFromBoards + hashMarksLength, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + oneFoot * 1.5);

        ctx.moveTo(hashMarksFromBoards, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - oneFoot * 1.5)
        ctx.lineTo(hashMarksFromBoards + hashMarksLength, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - oneFoot * 1.5);

        ctx.moveTo(zoneDotsFromBoards + circleRadius, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + oneFoot * 1.5)
        ctx.lineTo(zoneDotsFromBoards + circleRadius + hashMarksLength, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + oneFoot * 1.5);

        ctx.moveTo(zoneDotsFromBoards + circleRadius, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - oneFoot * 1.5)
        ctx.lineTo(zoneDotsFromBoards + circleRadius + hashMarksLength, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - oneFoot * 1.5);
    } else if (location === 'bottomRightFaceoffMarks') {
        ctx.beginPath();
        ctx.moveTo(rinkWidth - zoneDotsFromBoards - 4 * oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 2 * oneFoot);
        ctx.lineTo(rinkWidth - zoneDotsFromBoards - oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 2 * oneFoot);
        ctx.lineTo(rinkWidth - zoneDotsFromBoards - oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 6 * oneFoot);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(rinkWidth - zoneDotsFromBoards + 4 * oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 2 * oneFoot);
        ctx.lineTo(rinkWidth - zoneDotsFromBoards + oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 2 * oneFoot);
        ctx.lineTo(rinkWidth - zoneDotsFromBoards + oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 6 * oneFoot);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(rinkWidth - zoneDotsFromBoards - 4 * oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 2 * oneFoot);
        ctx.lineTo(rinkWidth - zoneDotsFromBoards - oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 2 * oneFoot);
        ctx.lineTo(rinkWidth - zoneDotsFromBoards - oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 6 * oneFoot);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(rinkWidth - zoneDotsFromBoards + 4 * oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 2 * oneFoot);
        ctx.lineTo(rinkWidth - zoneDotsFromBoards + oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 2 * oneFoot);
        ctx.lineTo(rinkWidth - zoneDotsFromBoards + oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 6 * oneFoot);
        ctx.stroke();

        ctx.beginPath();
    } else if (location === 'bottomRightHashMarks') {
        ctx.moveTo(rinkWidth - hashMarksFromBoards, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + oneFoot * 1.5)
        ctx.lineTo(rinkWidth - hashMarksFromBoards - hashMarksLength, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + oneFoot * 1.5);

        ctx.moveTo(rinkWidth - hashMarksFromBoards, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - oneFoot * 1.5)
        ctx.lineTo(rinkWidth - hashMarksFromBoards - hashMarksLength, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - oneFoot * 1.5);

        ctx.moveTo(rinkWidth - zoneDotsFromBoards - circleRadius, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + oneFoot * 1.5)
        ctx.lineTo(rinkWidth - zoneDotsFromBoards - circleRadius - hashMarksLength, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + oneFoot * 1.5);

        ctx.moveTo(rinkWidth - zoneDotsFromBoards - circleRadius, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - oneFoot * 1.5)
        ctx.lineTo(rinkWidth - zoneDotsFromBoards - circleRadius - hashMarksLength, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - oneFoot * 1.5);
    }
    ctx.fill();
    ctx.stroke();
}

function creaseDetails(ctx) {
    // set styles
    ctx.fillStyle = creaseBlue;
    ctx.strokeStyle = lineRed;
    ctx.lineWidth = oneInch * 2;

    // draw creases
    drawCrease('top', ctx);
    drawCrease('bottom', ctx);
}

function drawCrease(position, ctx) {
    ctx.beginPath();
    if (position === 'top') {
        ctx.arc(rinkWidth / 2, goalLineFromBoards, 6 * oneFoot, 0, Math.PI);
    } else if (position === 'bottom') {
        ctx.arc(rinkWidth / 2, rinkLength - goalLineFromBoards, 6 * oneFoot, Math.PI, 2 * Math.PI);
    }
    ctx.fill();
    ctx.stroke();
}

const squareBox = document.getElementById('square-box');
const circleBox = document.getElementById('circle-box');
const rinkCanvas = document.getElementById('rink');

// add event listeners
const draggableSquares = document.querySelectorAll('.draggable-square');
draggableSquares.forEach(square => {
    square.addEventListener('dragstart', event => {
        // store initial position of squares
        const rect = square.getBoundingClientRect();
        event.dataTransfer.setData('square-offset', JSON.stringify({
            offsetX: event.clientX - rect.left,
            offsetY: event.clientY - rect.top,
            color: square.style.backgroundColor
        }));
    });

    rinkCanvas.addEventListener('dragover', event => {
        event.preventDefault();
    });

    rinkCanvas.addEventListener('drop', event => {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData('square-offset'));
        const rinkRect = rinkCanvas.getBoundingClientRect();

        // position of square relative to rink
        const squareX = 2 * (event.clientX - rinkRect.left - data.offsetX + 10);
        const squareY = 2 * (event.clientY - rinkRect.top - data.offsetY + 10);

        // draw square on rink
        ctx.beginPath();
        ctx.moveTo(squareX - 20, squareY - 20);
        ctx.lineTo(squareX + 20, squareY - 20);
        ctx.lineTo(squareX + 20, squareY + 20);
        ctx.lineTo(squareX - 20, squareY + 20);
        ctx.fillStyle = data.color;
        ctx.fill();

        // remove original square
        // square.parentNode.removeChild(square);
    });
    square.addEventListener('dragend', event => {
        // reset cursor style
        event.target.style.cursor = 'auto';
    });
});

const draggableCircles = document.querySelectorAll('.draggable-circle');
draggableCircles.forEach(circle => {
    circle.addEventListener('dragstart', event => {
        // store initial position of circles
        const rect = circle.getBoundingClientRect();
        event.dataTransfer.setData('circle-offset', JSON.stringify({
            offsetX: event.clientX - rect.left,
            offsetY: event.clientY - rect.top,
            color: circle.style.backgroundColor
        }));
    });

    rinkCanvas.addEventListener('dragover', event => {
        event.preventDefault();
    });

    rinkCanvas.addEventListener('drop', event => {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData('circle-offset'));
        const rinkRect = rinkCanvas.getBoundingClientRect();

        // position of circle relative to rink
        const circleX = 2 * (event.clientX - rinkRect.left - data.offsetX + 20);
        const circleY = 2 * (event.clientY - rinkRect.top - data.offsetY + 20);

        // draw circle on rink
        ctx.beginPath();
        ctx.arc(circleX - 20, circleY - 20, 20, 0, 2 * Math.PI);        // radius of 20
        ctx.fillStyle = data.color;
        ctx.fill();

        // remove original circle
        // circle.parentNode.removeChild(circle);
    });
    circle.addEventListener('dragend', event => {
        // reset cursor style
        event.target.style.cursor = 'auto';
    });
});

rinkCanvas.addEventListener('dragenter', event => {
    // cursor style indicating valid drop
    event.target.style.cursor = 'pointer';
});

rinkCanvas.addEventListener('dragover', event => {
    event.preventDefault();
});

rinkCanvas.addEventListener('dragleave', event => {
    // reset cursor style
    event.target.style.cursor = 'auto';
});
