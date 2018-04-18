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
  this.defaultColor = 'rgb(20, 20, 200)';  // blue
  this.radCoef = (Math.PI / 3);

  this.init = function() {
    // center circle layer
    this.arcLayers.push([{  x:     400,
                            y:     400,
                            r:     50,
                            color: 'rgb(200, 200, 100)'
                        }]);
    // layer 1
    this.arcLayers.push([]);
    for (let i = 0; i < 6; i++) {
      this.arcLayers[1].push({ x:     50,
                               y:     0,
                               r:     50,
                               color: 'rgb(100, 200, 100)'
                            });
    }
    // layer 2
    this.arcLayers.push([]);
    for (let i = 0; i < 6; i++) {
      this.arcLayers[2].push({ x:     100,
                               y:     0,
                               r:     50,
                               color: 'rgb(100, 200, 100)'
                            });
    }
    for (let i = 0; i < 6; i++) {
      this.arcLayers[2].push({ x:     87,
                               y:     0,
                               r:     50,
                               color: 'rgb(30, 30, 255)'
                            });
    }

  }; // init

  this.draw = function() {
    // this.ctx.lineJoin = 'round';
    // this.ctx.save();

    clearCanvas();

    // draw the center circle
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.arcLayers[0][0].color;
    this.ctx.lineWidth = 1;
    this.ctx.arc(this.arcLayers[0][0].x,this.arcLayers[0][0].y,this.arcLayers[0][0].r,0,360);
    this.ctx.stroke();

    for (let i = 0; i < this.arcLayers[1].length; i++) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.arcLayers[1][i].color;
      this.ctx.lineWidth = 1;
      this.ctx.translate(400,400);
      this.ctx.rotate( this.radCoef * i );
      this.ctx.arc(this.arcLayers[1][i].x,this.arcLayers[1][i].y,this.arcLayers[1][i].r,0,360);
      this.ctx.rotate( this.radCoef * -i );
      this.ctx.translate(-400,-400);
      this.ctx.stroke();
    }

    // layer 2
    for (let j = 0; j < this.arcLayers[2].length/2; j++) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.arcLayers[2][j].color;
      this.ctx.lineWidth = 1;
      this.ctx.translate(400,400);
      this.ctx.rotate( this.radCoef * j );
      this.ctx.arc(this.arcLayers[2][j].x,this.arcLayers[2][j].y,this.arcLayers[2][j].r,0,360);
      this.ctx.rotate( this.radCoef * -j );
      this.ctx.translate(-400,-400);
      this.ctx.stroke();
    }

    for (let j = 6; j < this.arcLayers[2].length; j++) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.arcLayers[2][j].color;
      this.ctx.lineWidth = 1;
      this.ctx.translate(400,400);
      this.ctx.rotate( (this.radCoef * j) + (this.radCoef/2) );
      this.ctx.arc(this.arcLayers[2][j].x,this.arcLayers[2][j].y,this.arcLayers[2][j].r,0,360);
      this.ctx.rotate( (this.radCoef * -j) - (this.radCoef/2) );
      this.ctx.translate(-400,-400);
      this.ctx.stroke();
    }

  };

  this.update = function() {
  };

} // seed















// HELPERS
function clearCanvas() {
  ctx.clearRect(-1, -1, canvas.width+1, canvas.height+1);
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
