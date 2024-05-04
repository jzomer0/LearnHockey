const canvas = document.getElementById('rink');
const ctx = canvas.getContext('2d');

// Get the dimensions of the viewport
const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight;

// set scale
const rinkWidthFeet = 85;
const rinkLengthFeet = 200;
const cornerRadiusFeet = 28;
// max scale that fits
const scale = Math.min(maxWidth / rinkWidthFeet, maxHeight / rinkLengthFeet);

// math for goal line from curve
const goalLineFromCurveFeet = 28 - Math.sqrt(Math.pow(28,2) - Math.pow(17,2));

// dimensions for drawing
const rinkWidth = rinkWidthFeet * scale;
const rinkLength = rinkLengthFeet * scale;
const cornerRadius = cornerRadiusFeet * scale;
const goalLineFromBoards = 11 * scale;
const blueLineFromGoalLine = 64 * scale;
const goalLineFromCurve = goalLineFromCurveFeet * scale;
const oneFoot = scale;

// set canvas size
canvas.width = rinkWidth;
canvas.height = rinkLength;

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

ctx.fillStyle = 'white';
ctx.fill();

// Calculate the x-coordinates for the intersection points
const xOffset = Math.sqrt(Math.pow(cornerRadius, 2) - Math.pow(goalLineFromBoards, 2));

// draw top goal line
ctx.beginPath();
ctx.moveTo(goalLineFromCurve, goalLineFromBoards)
ctx.lineTo(rinkWidth - goalLineFromCurve, goalLineFromBoards);
ctx.closePath();

ctx.strokeStyle = 'red';
ctx.lineWidth = 2;
ctx.stroke();

// draw bottom goal line
ctx.beginPath();
ctx.moveTo(goalLineFromCurve, rinkLength - goalLineFromBoards)
ctx.lineTo(rinkWidth - goalLineFromCurve, rinkLength - goalLineFromBoards);
ctx.closePath();

ctx.strokeStyle = 'red';
ctx.lineWidth = 2;
ctx.stroke();

// draw red line
ctx.beginPath();
ctx.moveTo(0, rinkLength / 2 - oneFoot / 2);
ctx.lineTo(rinkLength, rinkLength / 2 - oneFoot / 2);
ctx.lineTo(rinkLength, rinkLength / 2 + oneFoot / 2);
ctx.lineTo(0, rinkLength / 2 + oneFoot / 2);
ctx.closePath();

ctx.fillStyle = 'red';
ctx.fill();

// draw top blue line
ctx.beginPath();  
ctx.moveTo(0, goalLineFromBoards + blueLineFromGoalLine - oneFoot / 2);
ctx.lineTo(rinkLength, goalLineFromBoards + blueLineFromGoalLine - oneFoot / 2);
ctx.lineTo(rinkLength, goalLineFromBoards + blueLineFromGoalLine + oneFoot / 2);
ctx.lineTo(0, goalLineFromBoards + blueLineFromGoalLine + oneFoot / 2);
ctx.closePath();

ctx.fillStyle = 'blue';
ctx.fill();

// draw bottom blue line
ctx.beginPath();
ctx.moveTo(0, rinkLength - goalLineFromBoards - blueLineFromGoalLine + oneFoot / 2);
ctx.lineTo(rinkLength, rinkLength - goalLineFromBoards - blueLineFromGoalLine + oneFoot / 2);
ctx.lineTo(rinkLength, rinkLength - goalLineFromBoards - blueLineFromGoalLine - oneFoot / 2);
ctx.lineTo(0, rinkLength - goalLineFromBoards - blueLineFromGoalLine - oneFoot / 2);
ctx.closePath();

ctx.fillStyle = 'blue';
ctx.fill();