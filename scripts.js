/* jshint esversion: 6 */


// moss    = 'rgb(100, 200, 100)'
// ltGreen = 'rgb(200, 200, 100)'
// blue    = 'rgb(30, 30, 255)';

var myReq;
var canvas;
var ctx;
var mySeed;


// function Arc(x,y,r,color) {
//
// }


function Seed(context) {
  this.ctx = context;
  this.arcLayers = [];
  this.defaultColor = 'rgba(20, 20, 200,1)';  // blue
  this.defaultWidth = 2;
  this.radCoef = (Math.PI / 3);
  this.stretch = 0;
  this.radRotate = Math.PI/540;

  this.init = function() {
    // center circle layer
    this.arcLayers.push([{  x:     400,
                            y:     400,
                            r:     50,
                            color: 'rgba(1,1,1,1)'
                        }]);
    // layer 1
    let rc1 = randColor('rgba');
    this.arcLayers.push([]);
    for (let i = 0; i < 6; i++) {
      this.arcLayers[1].push({ x:     50,
                               y:     0,
                               r:     50,
                               color: rc1
                            });
    }
    // layer 2
    let rc2 = randColor('rgba');
    this.arcLayers.push([]);
    for (let i = 0; i < 6; i++) {
      this.arcLayers[2].push({ x:     100,
                               y:     0,
                               r:     50,
                               color: rc2
                            });
    }
    for (let i = 0; i < 6; i++) {
      this.arcLayers[2].push({ x:     87,
                               y:     0,
                               r:     50,
                               color: rc2
                            });
    }
    // layer 3
    // this.arcLayers.push([]);
    // for (let i = 0; i < 6; i++) {
    //   this.arcLayers[3].push({ x:     150,
    //                            y:     0,
    //                            r:     50,
    //                            color: 'rgb(100, 200, 100)'
    //                         });
    // }

  }; // init

  this.draw = function() {
    // this.ctx.lineJoin = 'round';
    // this.ctx.save();

    // this.ctx.translate(400,400);
    // this.ctx.rotate( this.radRotate );
    // this.ctx.translate(-400,-400);

    clearCanvas();

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
      this.ctx.rotate( this.radCoef * i );
      this.ctx.arc(this.arcLayers[1][i].x+this.stretch,this.arcLayers[1][i].y,this.arcLayers[1][i].r,0,360);
      this.ctx.rotate( this.radCoef * -i );
      this.ctx.translate(-400,-400);
      this.ctx.stroke();
    }

    // layer 2
    for (let j = 0; j < this.arcLayers[2].length/2; j++) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.arcLayers[2][j].color;
      this.ctx.lineWidth = this.defaultWidth;
      this.ctx.translate(400,400);
      this.ctx.rotate( this.radCoef * j );
      this.ctx.arc(this.arcLayers[2][j].x+this.stretch,this.arcLayers[2][j].y,this.arcLayers[2][j].r,0,360);
      this.ctx.rotate( this.radCoef * -j );
      this.ctx.translate(-400,-400);
      this.ctx.stroke();
    }
    // layer 2 light arcs
    for (let j = 6; j < this.arcLayers[2].length; j++) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.arcLayers[2][j].color;
      this.ctx.lineWidth = this.defaultWidth;
      this.ctx.translate(400,400);
      this.ctx.rotate( (this.radCoef * j) + (this.radCoef/2) );
      this.ctx.arc(this.arcLayers[2][j].x+this.stretch,this.arcLayers[2][j].y,this.arcLayers[2][j].r,0,360);
      this.ctx.rotate( (this.radCoef * -j) - (this.radCoef/2) );
      this.ctx.translate(-400,-400);
      this.ctx.stroke();
    }

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
