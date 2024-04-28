const canvas = document.getElementById('rink');
const ctx = canvas.getContext('2d');

// Get the dimensions of the viewport
const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight;

// set scale
const rinkLengthFeet = 85;
const rinkWidthFeet = 200;
const cornerRadiusFeet = 28;
// max scale that fits
const scale = Math.min(maxWidth / rinkLengthFeet, maxHeight / rinkWidthFeet);

// dimensions for drawing
const rinkLength = rinkLengthFeet * scale;
const rinkWidth = rinkWidthFeet * scale;
const cornerRadius = cornerRadiusFeet * scale;

// set canvas size
canvas.width = rinkLength;
canvas.height = rinkWidth;

// draw outline
ctx.beginPath();
ctx.moveTo(cornerRadius, 0);                                                            // top left corner
ctx.lineTo(rinkLength - cornerRadius, 0);                           // top
ctx.arcTo(rinkLength, 0, rinkLength, cornerRadius, cornerRadius);                       // top right corner
ctx.lineTo(rinkLength, rinkWidth - cornerRadius);                   // right
ctx.arcTo(rinkLength, rinkWidth, rinkLength - cornerRadius, rinkWidth, cornerRadius);   // bottom right corner
ctx.lineTo(cornerRadius, rinkWidth);                                // bottom
ctx.arcTo(0, rinkWidth, 0, rinkWidth - cornerRadius, cornerRadius);                     // bottom left corner
ctx.lineTo(0, cornerRadius);                                        // left
ctx.arcTo(0, 0, cornerRadius, 0, cornerRadius);                                         // top left corner

ctx.closePath();
ctx.fillStyle = 'white';
ctx.fill();