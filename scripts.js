/* jshint esversion: 6 */


// ltGreen = 'rgb(200, 200, 100)'
// moss    = 'rgb(100, 200, 100)'
// blue    =  rgb(30, 30, 255);

var myReq;
var canvas;
var ctx;
var mySeed;


function Arc(x,y,r,color) {

}


function Seed(context) {
  this.ctx = context;
  this.arcLayers = [];
  this.defaultColor = 'rgb(20, 20, 200)';  // blue
  this.radCoef = (Math.PI / 3);

  this.init = function() {
    // center circle layer
    this.arcLayers.push( [{ x:     400,
                            y:     400,
                            r:     50,
                            color: 'rgb(100, 200, 100)'
                          }]
                        );
    // layer 1
    for (var i = 0; i < 6; i++) { // inner circle
      this.arcLayers.push( {x: 50, y: 0,r: 50} );
    }

  };

  this.draw = function() {
    // draw the center circle
    // this.ctx.lineWidth = 10;
    // this.ctx.lineJoin = 'round';
    // this.ctx.strokeStyle = 'rgb(200, 200, 100)';

    // this.ctx.save();

    this.ctx.beginPath();
    this.ctx.strokeStyle = this.arcLayers[0][0].color;
    this.ctx.lineWidth = 10;
    this.ctx.arc(this.arcLayers[0][0].x,this.arcLayers[0][0].y,this.arcLayers[0][0].r,0,360);
    this.ctx.stroke();

    // for (let i = 1; i < this.arcs.length; i++) {
    //   this.ctx.beginPath();
    //   this.ctx.strokeStyle = this.color;
    //   this.ctx.lineWidth = 3;
    //   this.ctx.translate(400,400);
    //   this.ctx.rotate(  this.radCoef * i  );
    //   this.ctx.arc(this.arcs[i].x,this.arcs[i].y,this.arcs[i].r,0,360);
    //   this.ctx.rotate(  this.radCoef * -i  );
    //   this.ctx.translate(-400,-400);
    //   this.ctx.stroke();
    // }

    // this.ctx.restore();

    // this.ctx.beginPath();
    // this.ctx.moveTo(40, 40);
    // this.ctx.lineTo(240, 40);
    // this.ctx.lineTo(240, 80);
    // this.ctx.stroke();

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
  clearCanvas();
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
