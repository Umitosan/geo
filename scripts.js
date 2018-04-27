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
  this.radRotate = Math.PI/540;
  this.cr = 50; // base circle radius
  // this.linex = 0;
  // this.liney = 0;

  this.init = function() {
    let radius = this.cr;
    let layerNumber = 0;
    // center circle layer
    this.arcLayers.push([{  x:     400,
                            y:     400,
                            r:     50,
                            color: 'rgba(1,1,1,1)'
                        }]);
    // layer 1
    let rc1 = randColor('rgba');
    layer = 1;
    this.arcLayers.push([]);
    for (let i = 0; i < 6; i++) {
      let theta = i * (Math.PI / (3*layer));
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
    layer = 2;
    this.arcLayers.push([]);
    for (let i = 0; i < 6; i++) {
      let theta = i * (Math.PI / (3));
      let computedX = radius * Math.cos(theta)*layer;
      let computedY = radius * Math.sin(theta)*layer;
      this.arcLayers[2].push({ x:     computedX,
                               y:     computedY,
                               r:     radius,
                               color: rc2
                            });
    }
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

  }; // init

  this.draw = function() {
    // this.ctx.lineJoin = 'round';
    // this.ctx.save();

    // this.ctx.translate(400,400);
    // this.ctx.rotate( this.radRotate );
    // this.ctx.translate(-400,-400);

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

    // layer 1
    for (let i = 0; i < this.arcLayers[1].length; i++) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.arcLayers[1][i].color;
      this.ctx.lineWidth = this.defaultWidth;
      this.ctx.translate(400,400);
      this.ctx.arc(this.arcLayers[1][i].x,this.arcLayers[1][i].y,this.arcLayers[1][i].r,0,360);
      this.ctx.translate(-400,-400);
      this.ctx.stroke();
    }

    // layer 2
    for (let j = 0; j < this.arcLayers[2].length; j++) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.arcLayers[2][j].color;
      this.ctx.lineWidth = this.defaultWidth;
      this.ctx.translate(400,400);
      this.ctx.arc(this.arcLayers[2][j].x,this.arcLayers[2][j].y,this.arcLayers[2][j].r,0,360);
      this.ctx.translate(-400,-400);
      this.ctx.stroke();
    }
    // // layer 2 light arcs
    // for (let j = 6; j < this.arcLayers[2].length; j++) {
    //   this.ctx.beginPath();
    //   this.ctx.strokeStyle = this.arcLayers[2][j].color;
    //   this.ctx.lineWidth = this.defaultWidth;
    //   this.ctx.translate(400,400);
    //   this.ctx.rotate( (this.radCoef * j) + (this.radCoef/2) );
    //   this.ctx.arc(this.arcLayers[2][j].x+this.stretch,this.arcLayers[2][j].y,this.arcLayers[2][j].r,0,360);
    //   this.ctx.rotate( (this.radCoef * -j) - (this.radCoef/2) );
    //   this.ctx.translate(-400,-400);
    //   this.ctx.stroke();
    // }

    // layer 3
    // for (let k = 0; k < this.arcLayers[3].length; k++) {
    //   this.ctx.beginPath();
    //   this.ctx.strokeStyle = this.arcLayers[3][k].color;
    //   this.ctx.lineWidth = this.defaultWidth;
    //   this.ctx.translate(400,400);
    //   this.ctx.rotate( this.radCoef * k );
    //   this.ctx.arc(this.arcLayers[3][k].x+this.stretch,this.arcLayers[3][k].y,this.arcLayers[3][k].r,0,360);
    //   this.ctx.rotate( this.radCoef * -k );
    //   this.ctx.translate(-400,-400);
    //   this.ctx.stroke();
    // }

  };

  this.update = function() {
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
  // mySeed.update();
  mySeed.draw();
} // gameLoop

// FRONT END
$(document).ready( function() {

  canvas = $('#canvas')[0];
  ctx =  canvas.getContext('2d');
  mySeed = new Seed(ctx);
  mySeed.init();
  mySeed.draw();
  myReq = requestAnimationFrame(gameLoop);

});
