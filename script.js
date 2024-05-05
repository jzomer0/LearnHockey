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

// set scale
const rinkWidthFeet = 85;
const rinkLengthFeet = 200;
const cornerRadiusFeet = 28;
const highResFactor = 2;            // NOTE: 10 looks better zoomed-in

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

// draw ice (background)
ctx.beginPath();
ctx.moveTo(cornerRadius, 0);                                                            // top left corner
ctx.lineTo(rinkWidth - cornerRadius, 0);                           // top
ctx.arcTo(rinkWidth, 0, rinkWidth, cornerRadius, cornerRadius);                       // top right corner
ctx.lineTo(rinkWidth, rinkLength - cornerRadius);                   // right
ctx.arcTo(rinkWidth, rinkLength, rinkWidth - cornerRadius, rinkLength, cornerRadius);   // bottom right corner
ctx.lineTo(cornerRadius, rinkLength);                                // bottom
ctx.arcTo(0, rinkLength, 0, rinkLength - cornerRadius, cornerRadius);                     // bottom left corner
ctx.lineTo(0, cornerRadius);                                        // left
ctx.arcTo(0, 0, cornerRadius, 0, cornerRadius);                                         // top left corner
ctx.closePath();
ctx.fillStyle = white;
ctx.fill();

// Calculate the x-coordinates for the intersection points
const xOffset = Math.sqrt(Math.pow(cornerRadius, 2) - Math.pow(goalLineFromBoards, 2));

// draw top goal line
ctx.beginPath();
ctx.moveTo(goalLineFromCurve, goalLineFromBoards)
ctx.lineTo(rinkWidth - goalLineFromCurve, goalLineFromBoards);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

// draw bottom goal line
ctx.beginPath();
ctx.moveTo(goalLineFromCurve, rinkLength - goalLineFromBoards)
ctx.lineTo(rinkWidth - goalLineFromCurve, rinkLength - goalLineFromBoards);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

// draw red line
ctx.beginPath();
ctx.moveTo(0, rinkLength / 2 - oneFoot / 2);
ctx.lineTo(rinkLength, rinkLength / 2 - oneFoot / 2);
ctx.lineTo(rinkLength, rinkLength / 2 + oneFoot / 2);
ctx.lineTo(0, rinkLength / 2 + oneFoot / 2);
ctx.closePath();
ctx.fillStyle = lineRed;
ctx.fill();

// draw top blue line
ctx.beginPath();
ctx.moveTo(0, goalLineFromBoards + blueLineFromGoalLine - oneFoot / 2);
ctx.lineTo(rinkLength, goalLineFromBoards + blueLineFromGoalLine - oneFoot / 2);
ctx.lineTo(rinkLength, goalLineFromBoards + blueLineFromGoalLine + oneFoot / 2);
ctx.lineTo(0, goalLineFromBoards + blueLineFromGoalLine + oneFoot / 2);
ctx.closePath();
ctx.fillStyle = lineBlue;
ctx.fill();

// draw bottom blue line
ctx.beginPath();
ctx.moveTo(0, rinkLength - goalLineFromBoards - blueLineFromGoalLine + oneFoot / 2);
ctx.lineTo(rinkLength, rinkLength - goalLineFromBoards - blueLineFromGoalLine + oneFoot / 2);
ctx.lineTo(rinkLength, rinkLength - goalLineFromBoards - blueLineFromGoalLine - oneFoot / 2);
ctx.lineTo(0, rinkLength - goalLineFromBoards - blueLineFromGoalLine - oneFoot / 2);
ctx.closePath();
ctx.fillStyle = lineBlue;
ctx.fill();

// draw centre circle
ctx.beginPath();
ctx.arc(rinkWidth / 2, rinkLength / 2, circleRadius, 0, 2 * Math.PI);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

// draw centre faceoff dot
ctx.beginPath();
ctx.arc(rinkWidth / 2, rinkLength / 2, oneFoot / 2, 0, 2 * Math.PI);
ctx.closePath();
ctx.fillStyle = lineBlue;
ctx.fill();

// draw ref circle
ctx.beginPath();
ctx.arc(rinkWidth, rinkLength / 2, refCircleRadius, 0, 2 * Math.PI);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

// draw top left circle
ctx.beginPath();
ctx.arc(zoneDotsFromBoards, goalLineFromBoards + zoneDotsFromGoalLine, circleRadius, 0, 2 * Math.PI);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

// draw faceoff dot (top left)
ctx.beginPath();
ctx.arc(zoneDotsFromBoards, goalLineFromBoards + zoneDotsFromGoalLine, oneFoot, 0, 2 * Math.PI);
ctx.fillStyle = lineRed;
ctx.fill();

// draw faceoff marks (top left)
ctx.beginPath();
ctx.moveTo(zoneDotsFromBoards - 4 * oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 2 * oneFoot);
ctx.lineTo(zoneDotsFromBoards - oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 2 * oneFoot);
ctx.lineTo(zoneDotsFromBoards - oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 6 * oneFoot);
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(zoneDotsFromBoards + 4 * oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 2 * oneFoot);
ctx.lineTo(zoneDotsFromBoards + oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 2 * oneFoot);
ctx.lineTo(zoneDotsFromBoards + oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 6 * oneFoot);
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(zoneDotsFromBoards - 4 * oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 2 * oneFoot);
ctx.lineTo(zoneDotsFromBoards - oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 2 * oneFoot);
ctx.lineTo(zoneDotsFromBoards - oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 6 * oneFoot);
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(zoneDotsFromBoards + 4 * oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 2 * oneFoot);
ctx.lineTo(zoneDotsFromBoards + oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 2 * oneFoot);
ctx.lineTo(zoneDotsFromBoards + oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 6 * oneFoot);
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

// draw hash marks (top left circle)
ctx.beginPath();
ctx.moveTo(hashMarksFromBoards, goalLineFromBoards + zoneDotsFromGoalLine - oneFoot * 1.5)
ctx.lineTo(hashMarksFromBoards + hashMarksLength, goalLineFromBoards + zoneDotsFromGoalLine - oneFoot * 1.5);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(hashMarksFromBoards, goalLineFromBoards + zoneDotsFromGoalLine + oneFoot * 1.5)
ctx.lineTo(hashMarksFromBoards + hashMarksLength, goalLineFromBoards + zoneDotsFromGoalLine + oneFoot * 1.5);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(zoneDotsFromBoards + circleRadius, goalLineFromBoards + zoneDotsFromGoalLine - oneFoot * 1.5)
ctx.lineTo(zoneDotsFromBoards + circleRadius + hashMarksLength, goalLineFromBoards + zoneDotsFromGoalLine - oneFoot * 1.5);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(zoneDotsFromBoards + circleRadius, goalLineFromBoards + zoneDotsFromGoalLine + oneFoot * 1.5)
ctx.lineTo(zoneDotsFromBoards + circleRadius + hashMarksLength, goalLineFromBoards + zoneDotsFromGoalLine + oneFoot * 1.5);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

// draw top right circle
ctx.beginPath();
ctx.arc(rinkWidth - zoneDotsFromBoards, goalLineFromBoards + zoneDotsFromGoalLine, circleRadius, 0, 2 * Math.PI);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

// draw faceoff dot (top right)
ctx.beginPath();
ctx.arc(rinkWidth - zoneDotsFromBoards, goalLineFromBoards + zoneDotsFromGoalLine, oneFoot, 0, 2 * Math.PI);
ctx.fillStyle = lineRed;
ctx.fill();

// draw faceoff marks (top right)
ctx.beginPath();
ctx.moveTo(rinkWidth - zoneDotsFromBoards - 4 * oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 2 * oneFoot);
ctx.lineTo(rinkWidth - zoneDotsFromBoards - oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 2 * oneFoot);
ctx.lineTo(rinkWidth - zoneDotsFromBoards - oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 6 * oneFoot);
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(rinkWidth - zoneDotsFromBoards + 4 * oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 2 * oneFoot);
ctx.lineTo(rinkWidth - zoneDotsFromBoards + oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 2 * oneFoot);
ctx.lineTo(rinkWidth - zoneDotsFromBoards + oneFoot, goalLineFromBoards + zoneDotsFromGoalLine - 6 * oneFoot);
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(rinkWidth - zoneDotsFromBoards - 4 * oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 2 * oneFoot);
ctx.lineTo(rinkWidth - zoneDotsFromBoards - oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 2 * oneFoot);
ctx.lineTo(rinkWidth - zoneDotsFromBoards - oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 6 * oneFoot);
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(rinkWidth - zoneDotsFromBoards + 4 * oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 2 * oneFoot);
ctx.lineTo(rinkWidth - zoneDotsFromBoards + oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 2 * oneFoot);
ctx.lineTo(rinkWidth - zoneDotsFromBoards + oneFoot, goalLineFromBoards + zoneDotsFromGoalLine + 6 * oneFoot);
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

// draw hash marks (top right circle)
ctx.beginPath();
ctx.moveTo(rinkWidth - hashMarksFromBoards, goalLineFromBoards + zoneDotsFromGoalLine - oneFoot * 1.5)
ctx.lineTo(rinkWidth - hashMarksFromBoards - hashMarksLength, goalLineFromBoards + zoneDotsFromGoalLine - oneFoot * 1.5);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(rinkWidth - hashMarksFromBoards, goalLineFromBoards + zoneDotsFromGoalLine + oneFoot * 1.5)
ctx.lineTo(rinkWidth - hashMarksFromBoards - hashMarksLength, goalLineFromBoards + zoneDotsFromGoalLine + oneFoot * 1.5);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(rinkWidth - zoneDotsFromBoards - circleRadius, goalLineFromBoards + zoneDotsFromGoalLine - oneFoot * 1.5)
ctx.lineTo(rinkWidth - zoneDotsFromBoards - circleRadius - hashMarksLength, goalLineFromBoards + zoneDotsFromGoalLine - oneFoot * 1.5);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(rinkWidth - zoneDotsFromBoards - circleRadius, goalLineFromBoards + zoneDotsFromGoalLine + oneFoot * 1.5)
ctx.lineTo(rinkWidth - zoneDotsFromBoards - circleRadius - hashMarksLength, goalLineFromBoards + zoneDotsFromGoalLine + oneFoot * 1.5);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

// draw bottom left circle
ctx.beginPath();
ctx.arc(zoneDotsFromBoards, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine, circleRadius, 0, 2 * Math.PI);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

// draw faceoff dot (bottom left)
ctx.beginPath();
ctx.arc(zoneDotsFromBoards, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine, oneFoot, 0, 2 * Math.PI);
ctx.fillStyle = lineRed;
ctx.fill();

// draw faceoff marks (bottom left)
ctx.beginPath();
ctx.moveTo(zoneDotsFromBoards - 4 * oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 2 * oneFoot);
ctx.lineTo(zoneDotsFromBoards - oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 2 * oneFoot);
ctx.lineTo(zoneDotsFromBoards - oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 6 * oneFoot);
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(zoneDotsFromBoards + 4 * oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 2 * oneFoot);
ctx.lineTo(zoneDotsFromBoards + oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 2 * oneFoot);
ctx.lineTo(zoneDotsFromBoards + oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 6 * oneFoot);
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(zoneDotsFromBoards - 4 * oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 2 * oneFoot);
ctx.lineTo(zoneDotsFromBoards - oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 2 * oneFoot);
ctx.lineTo(zoneDotsFromBoards - oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 6 * oneFoot);
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(zoneDotsFromBoards + 4 * oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 2 * oneFoot);
ctx.lineTo(zoneDotsFromBoards + oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 2 * oneFoot);
ctx.lineTo(zoneDotsFromBoards + oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 6 * oneFoot);
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

// draw hash marks (bottom left circle)
ctx.beginPath();
ctx.moveTo(hashMarksFromBoards, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + oneFoot * 1.5)
ctx.lineTo(hashMarksFromBoards + hashMarksLength, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + oneFoot * 1.5);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(hashMarksFromBoards, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - oneFoot * 1.5)
ctx.lineTo(hashMarksFromBoards + hashMarksLength, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - oneFoot * 1.5);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(zoneDotsFromBoards + circleRadius, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + oneFoot * 1.5)
ctx.lineTo(zoneDotsFromBoards + circleRadius + hashMarksLength, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + oneFoot * 1.5);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(zoneDotsFromBoards + circleRadius, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - oneFoot * 1.5)
ctx.lineTo(zoneDotsFromBoards + circleRadius + hashMarksLength, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - oneFoot * 1.5);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

// draw bottom right circle
ctx.beginPath();
ctx.arc(rinkWidth - zoneDotsFromBoards, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine, circleRadius, 0, 2 * Math.PI);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

// draw faceoff dot (bottom right)
ctx.beginPath();
ctx.arc(rinkWidth - zoneDotsFromBoards, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine, oneFoot, 0, 2 * Math.PI);
ctx.fillStyle = lineRed;
ctx.fill();

// draw faceoff marks (bottom right)
ctx.beginPath();
ctx.moveTo(rinkWidth - zoneDotsFromBoards - 4 * oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 2 * oneFoot);
ctx.lineTo(rinkWidth - zoneDotsFromBoards - oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 2 * oneFoot);
ctx.lineTo(rinkWidth - zoneDotsFromBoards - oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 6 * oneFoot);
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(rinkWidth - zoneDotsFromBoards + 4 * oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 2 * oneFoot);
ctx.lineTo(rinkWidth - zoneDotsFromBoards + oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 2 * oneFoot);
ctx.lineTo(rinkWidth - zoneDotsFromBoards + oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - 6 * oneFoot);
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(rinkWidth - zoneDotsFromBoards - 4 * oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 2 * oneFoot);
ctx.lineTo(rinkWidth - zoneDotsFromBoards - oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 2 * oneFoot);
ctx.lineTo(rinkWidth - zoneDotsFromBoards - oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 6 * oneFoot);
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(rinkWidth - zoneDotsFromBoards + 4 * oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 2 * oneFoot);
ctx.lineTo(rinkWidth - zoneDotsFromBoards + oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 2 * oneFoot);
ctx.lineTo(rinkWidth - zoneDotsFromBoards + oneFoot, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + 6 * oneFoot);
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

// draw hash marks (bottom right circle)
ctx.beginPath();
ctx.moveTo(rinkWidth - hashMarksFromBoards, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + oneFoot * 1.5)
ctx.lineTo(rinkWidth - hashMarksFromBoards - hashMarksLength, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + oneFoot * 1.5);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(rinkWidth - hashMarksFromBoards, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - oneFoot * 1.5)
ctx.lineTo(rinkWidth - hashMarksFromBoards - hashMarksLength, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - oneFoot * 1.5);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(rinkWidth - zoneDotsFromBoards - circleRadius, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + oneFoot * 1.5)
ctx.lineTo(rinkWidth - zoneDotsFromBoards - circleRadius - hashMarksLength, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine + oneFoot * 1.5);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(rinkWidth - zoneDotsFromBoards - circleRadius, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - oneFoot * 1.5)
ctx.lineTo(rinkWidth - zoneDotsFromBoards - circleRadius - hashMarksLength, rinkLength - goalLineFromBoards - zoneDotsFromGoalLine - oneFoot * 1.5);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

// draw neutral zone faceoff dot (top left)
ctx.beginPath();
ctx.arc(zoneDotsFromBoards, goalLineFromBoards + blueLineFromGoalLine + oneFoot / 2 + 5 * oneFoot, oneFoot, 0, 2 * Math.PI);
ctx.fillStyle = lineRed;
ctx.fill();

// draw neutral zone faceoff dot (top right)
ctx.beginPath();
ctx.arc(rinkWidth - zoneDotsFromBoards, goalLineFromBoards + blueLineFromGoalLine + oneFoot / 2 + 5 * oneFoot, oneFoot, 0, 2 * Math.PI);
ctx.fillStyle = lineRed;
ctx.fill();

// draw neutral zone faceoff dot (bottom left)
ctx.beginPath();
ctx.arc(zoneDotsFromBoards, rinkLength - goalLineFromBoards - blueLineFromGoalLine - oneFoot / 2 - 5 * oneFoot, oneFoot, 0, 2 * Math.PI);
ctx.fillStyle = lineRed;
ctx.fill();

// draw neutral zone faceoff dot (bottom right)
ctx.beginPath();
ctx.arc(rinkWidth - zoneDotsFromBoards, rinkLength - goalLineFromBoards - blueLineFromGoalLine - oneFoot / 2 - 5 * oneFoot, oneFoot, 0, 2 * Math.PI);
ctx.fillStyle = lineRed;
ctx.fill();

// draw top crease
ctx.beginPath();
ctx.arc(rinkWidth / 2, goalLineFromBoards, 6 * oneFoot, 0, Math.PI);
ctx.fillStyle = creaseBlue;
ctx.fill();

ctx.beginPath();
ctx.arc(rinkWidth / 2, goalLineFromBoards, 6 * oneFoot, 0, Math.PI);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();

// draw bottom crease
ctx.beginPath();
ctx.arc(rinkWidth / 2, rinkLength - goalLineFromBoards, 6 * oneFoot, Math.PI, 2 * Math.PI);
ctx.fillStyle = creaseBlue;
ctx.fill();

ctx.beginPath();
ctx.arc(rinkWidth / 2, rinkLength - goalLineFromBoards, 6 * oneFoot, Math.PI, 2 * Math.PI);
ctx.closePath();
ctx.strokeStyle = lineRed;
ctx.lineWidth = oneInch * 2;
ctx.stroke();
