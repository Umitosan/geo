/* jshint esversion: 6 */


// moss    = 'rgb(100, 200, 100)'
// ltGreen = 'rgb(200, 200, 100)'
// blue    = 'rgb(30, 30, 255)';

// http://mathworld.wolfram.com/Circle-CircleIntersection.html
// circle-circle intersection
// d = distance between centers
// x = distance between Circle1 center and X val of intersections
// x = ( d^2 - r2^2 + r1^2) / ( 2d )
//
// sin(angle) = opp / hyp
// cos(angle) = adj / hyp
// tan(angle) = opp / adj
//
// point (x,y) on circle using Radius r and angle a
// x = r * cos(a)
// y = r * sin(a)


var myReq;
var canvas;
var ctx;
var mySeed;


function Seed(context) {
  this.ctx = context;
  this.arcLayers = [];
  this.defaultColor = 'rgba(20, 20, 200,1)';  // blue
  this.defaultWidth = 2;
  this.radCoef = (Math.PI / 3);
  this.stretch = 0;
  this.radRotate = Math.PI/540;  // speed of rotation in radians
  this.cr = 40; // base circle radius

  this.init = function() {
    let radius = this.cr;
    let cl;

    let rc0 = randColor('rgba');
    let layerNumber = 0;
    // center circle layer
    this.arcLayers.push([{  x:     400,
                            y:     400,
                            r:     radius,
                            color: rc0
                        }]);
    // layer 1
    let rc1 = randColor('rgba');
    cl = 1;
    this.arcLayers.push([]);
    for (let i = 0; i < 6; i++) {
      let theta = i * (Math.PI / (3*cl));
      let computedX = radius * Math.cos(theta);
      let computedY = radius * Math.sin(theta);
      this.arcLayers[1].push({ x:     computedX,
                               y:     computedY,
                               r:     radius,
                               color: rc1
                            });
    }
    // layer 2
    let rc2 = randColor('rgba');
    cl = 2;
    this.arcLayers.push([]);
    for (let i = 0; i < 6; i++) {
      let theta = i * (Math.PI / (3));
      let computedX = radius * Math.cos(theta)*cl;
      let computedY = radius * Math.sin(theta)*cl;
      this.arcLayers[2].push({ x:     computedX,
                               y:     computedY,
                               r:     radius,
                               color: rc2
                            });
    }
    // layer 2a
    let rc2a = randColor('rgba');
    // d = distance between centers
    let d = mySeed.arcLayers[2][0].x - mySeed.arcLayers[1][0].x;
    let r1 = mySeed.arcLayers[1][0].r;
    let r2 = mySeed.arcLayers[2][0].r;
    // x = ( d^2 - r2^2 + r1^2) / ( 2d )
    let x = ( (Math.pow(d,2) - Math.pow(r2,2) + Math.pow(r1,2)) / ( 2*d ) ) + r1;
    // tan(angle) = opp / adj
    // y = x * tan(angle)
    let y = x * Math.tan(Math.PI / 6);
    let nRadius = Math.sqrt( Math.pow(x,2) + Math.pow(y,2) );
    for (let i = 0; i < 6; i++) {
      let theta = i * (Math.PI / 3) + (Math.PI / 6);
      let computedX = nRadius * Math.cos(theta);
      let computedY = nRadius * Math.sin(theta);
      this.arcLayers[2].push({ x:     computedX,
                               y:     computedY,
                               r:     radius,
                               color: rc2a
                            });
    }
    // layer 3
    let rc3 = randColor('rgba');
    cl = 3;
    this.arcLayers.push([]);
    for (let i = 0; i < 6; i++) {
      let theta = i * (Math.PI / (3));
      let computedX = radius * Math.cos(theta)*cl;
      let computedY = radius * Math.sin(theta)*cl;
      this.arcLayers[3].push({ x:     computedX,
                               y:     computedY,
                               r:     radius,
                               color: rc3
                            });
    }
    // layer 3a
    let rc3a = randColor('rgba');
    cl = 3;
    for (let i = 0; i < 6; i++) {
      let xdif, ydif;
      if (i !== 5) {
        xdif = this.arcLayers[3][i].x - this.arcLayers[3][i+1].x;
        ydif = this.arcLayers[3][i].y - this.arcLayers[3][i+1].y;
      } else {
        xdif = this.arcLayers[3][5].x - this.arcLayers[3][0].x;
        ydif = this.arcLayers[3][5].y - this.arcLayers[3][0].y;
      }
      let someX1 = this.arcLayers[3][i].x - (xdif/3);
      let someY1 = this.arcLayers[3][i].y - (ydif/3);
      let someX2 = this.arcLayers[3][i].x - (2*xdif/3);
      let someY2 = this.arcLayers[3][i].y - (2*ydif/3);
      this.arcLayers[3].push({ x:     someX1,
                               y:     someY1,
                               r:     radius,
                               color: rc3a
                            });
      this.arcLayers[3].push({ x:     someX2,
                               y:     someY2,
                               r:     radius,
                               color: rc3a
                            });
    }

    // layer 4
    let rc4 = randColor('rgba');
    cl = 4;
    this.arcLayers.push([]);
    for (let i = 0; i < 6; i++) {
      let theta = i * (Math.PI / (3));
      let computedX = radius * Math.cos(theta)*cl;
      let computedY = radius * Math.sin(theta)*cl;
      this.arcLayers[cl].push({ x:     computedX,
                               y:     computedY,
                               r:     radius,
                               color: rc4
                            });
    }
    // layer 4a
    let rc4a = randColor('rgba');
    cl = 4;
    for (let i = 0; i < 6; i++) {
      let xdif, ydif;
      if (i !== 5) {
        xdif = this.arcLayers[cl][i].x - this.arcLayers[cl][i+1].x;
        ydif = this.arcLayers[cl][i].y - this.arcLayers[cl][i+1].y;
      } else {
        xdif = this.arcLayers[cl][5].x - this.arcLayers[cl][0].x;
        ydif = this.arcLayers[cl][5].y - this.arcLayers[cl][0].y;
      }
      let someX1 = this.arcLayers[cl][i].x - (xdif/4);
      let someY1 = this.arcLayers[cl][i].y - (ydif/4);
      let someX2 = this.arcLayers[cl][i].x - (2*xdif/4);
      let someY2 = this.arcLayers[cl][i].y - (2*ydif/4);
      let someX3 = this.arcLayers[cl][i].x - (3*xdif/4);
      let someY3 = this.arcLayers[cl][i].y - (3*ydif/4);
      this.arcLayers[cl].push({ x:     someX1,
                                y:     someY1,
                                r:     radius,
                                color: rc4a
                              });
      this.arcLayers[cl].push({ x:     someX2,
                                y:     someY2,
                                r:     radius,
                                color: rc4a
                              });
      this.arcLayers[cl].push({ x:     someX3,
                                y:     someY3,
                                r:     radius,
                                color: rc4a
                              });
    }


  }; // init

  this.draw = function() {
    let cl = 0; // cl = current layer
    clearCanvas();

    // draw tmp intersection liney
    // this.ctx.beginPath();
    // this.ctx.translate(400,400);
    // this.ctx.moveTo(-400,this.liney);
    // this.ctx.lineTo(400,this.liney);
    // this.ctx.translate(-400,-400);
    // this.ctx.stroke();

    // draw the center circle
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.arcLayers[0][0].color;
    this.ctx.lineWidth = this.defaultWidth;
    this.ctx.arc(this.arcLayers[0][0].x,this.arcLayers[0][0].y,this.arcLayers[0][0].r,0,360);
    this.ctx.stroke();

    for (var i = 1; i < this.arcLayers.length; i++) {
      let cl = i;
      for (var j = 0; j < this.arcLayers[cl].length; j++) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.arcLayers[cl][j].color;
        this.ctx.lineWidth = this.defaultWidth;
        this.ctx.translate(400,400);
        this.ctx.arc(this.arcLayers[cl][j].x,this.arcLayers[cl][j].y,this.arcLayers[cl][j].r,0,360);
        this.ctx.translate(-400,-400);
        this.ctx.stroke();
      }
    }

  };

  this.update = function() {
    this.ctx.translate(400,400);
    this.ctx.rotate( this.radRotate );
    this.ctx.translate(-400,-400);
  };

} // seed


// HELPERS
function clearCanvas() {
  ctx.clearRect(-1, -1, canvas.width+1, canvas.height+1);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getRadianAngle(degreeValue) {
  return degreeValue * Math.PI / 180;
}

function randColor(type) {
  // more muted colors example
      // return ( "#" + Math.round((getRandomIntInclusive(0,99999999) + 0x77000000)).toString(16) );
  // full spectum below
  if (type === 'hex') {
    return ( "#" + Math.round((getRandomIntInclusive(0,0xffffff))).toString(16) );
  } else if (type === 'rgba') {
    return ( 'rgba('+ getRandomIntInclusive(0,255) +','+ getRandomIntInclusive(0,255) +','+ getRandomIntInclusive(0,255) +','+1+')' );
  } else {
    console.log("Not valid option for randColor()");
    return undefined;
  }
}

function invertRGBAstr(str) {
  let arr1 = str.slice(5,-1); // arr1 = "173,216,230,0.2"
  let arr2 = arr1.split(','); // arr2 = ["173","216","230","0.2"]
  let r = -1 * arr2[0] + 255;
  let g = -1 * arr2[1] + 255;
  let b = -1 * arr2[2] + 255;
  let a = arr2[3];
  return 'rgba('+r+','+g+','+b+','+a+')';
}

// GAMELOOP
function gameLoop(timestamp) {
  myReq = requestAnimationFrame(gameLoop);
  mySeed.update();
  mySeed.draw();
} // gameLoop

// FRONT END
$(document).ready( function() {

  canvas = $('#canvas')[0];
  ctx =  canvas.getContext('2d');
  mySeed = new Seed(ctx);
  mySeed.init();
  myReq = requestAnimationFrame(gameLoop);

});
