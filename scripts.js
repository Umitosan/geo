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


var myReq,
    canvas,
    ctx,
    mySeed;
var rotateSwitch = false;
var fillSwitch = true;
var totalLayers;
// var  colorSwitch = false;

function Seed(context) {
  this.ctx = context;
  this.arcLayers = [];
  this.defaultFillAlpha = 0.2;
  this.defaultLineAlpha = 0.5;
  this.defaultColor = '';
  this.defaultWidth = 2;
  this.radCoef = (Math.PI / 3);
  this.stretch = 0;
  this.radRotate = Math.PI/720;  // speed of rotation in radians
  this.cr = 40; // base circle radius

  this.build = function() {
    this.arcLayers = [];
    this.init();
  };

  this.init = function() {
    let radius = this.cr;
    let dla = this.defaultLineAlpha;
    let dfa = this.defaultFillAlpha;
    let cl; // current layer number
    let rc; // random color
    this.defaultColor = 'rgba(20, 20, 200,'+dla+')';  // blue

    rc = randColorPimary('r',0.5);
    // center circle layer
    this.arcLayers.push([{  x:     400,
                            y:     400,
                            r:     radius,
                            color: rc
                        }]);
    // layer 1
    rc = randColorPimary('r',dla);
    cl = 1;
    this.arcLayers.push([]);
    for (let i = 0; i < 6; i++) {
      let theta = i * (Math.PI / (3*cl));
      let computedX = radius * Math.cos(theta);
      let computedY = radius * Math.sin(theta);
      this.arcLayers[cl].push({ x:     computedX,
                                y:     computedY,
                                r:     radius,
                                color: rc
                            });
    }

    for (cl = 2; cl < (totalLayers); cl++) {
              // layer 2
              rc = randColorPimary('b',dla);
              this.arcLayers.push([]);
              for (let i = 0; i < 6; i++) {
                let theta = i * (Math.PI / (3));
                let computedX = radius * Math.cos(theta)*cl;
                let computedY = radius * Math.sin(theta)*cl;
                this.arcLayers[cl].push({ x:     computedX,
                                         y:     computedY,
                                         r:     radius,
                                         color: rc
                                      });
              }
              rc = randColorPimary('g',dla);
              // creates the corret number of circles between the 6 points for given layer
              for (let i = 0; i < 6; i++) {
                let xdif, ydif;
                if (i !== 5) {
                  xdif = this.arcLayers[cl][i].x - this.arcLayers[cl][i+1].x;
                  ydif = this.arcLayers[cl][i].y - this.arcLayers[cl][i+1].y;
                } else {
                  xdif = this.arcLayers[cl][5].x - this.arcLayers[cl][0].x;
                  ydif = this.arcLayers[cl][5].y - this.arcLayers[cl][0].y;
                }
                for (let j = 1; j < cl; j++) {
                  let xx = this.arcLayers[cl][i].x - (j*xdif/cl);
                  let yy = this.arcLayers[cl][i].y - (j*ydif/cl);
                  this.arcLayers[cl].push({ x:     xx,
                                            y:     yy,
                                            r:     radius,
                                            color: rc
                                          });
                }
              } // for
    }

    // // // layer 2a (OLD VERSION, ALT COMPUTATION METHOD)
    // // rc = randColorPimary('b',dla);
    // // // d = distance between centers
    // // let d = mySeed.arcLayers[2][0].x - mySeed.arcLayers[1][0].x;
    // // let r1 = mySeed.arcLayers[1][0].r;
    // // let r2 = mySeed.arcLayers[2][0].r;
    // // // x = ( d^2 - r2^2 + r1^2) / ( 2d )
    // // let x = ( (Math.pow(d,2) - Math.pow(r2,2) + Math.pow(r1,2)) / ( 2*d ) ) + r1;
    // // // tan(angle) = opp / adj
    // // // y = x * tan(angle)
    // // let y = x * Math.tan(Math.PI / 6);
    // // let nRadius = Math.sqrt( Math.pow(x,2) + Math.pow(y,2) );
    // // for (let i = 0; i < 6; i++) {
    // //   let theta = i * (Math.PI / 3) + (Math.PI / 6);
    // //   let computedX = nRadius * Math.cos(theta);
    // //   let computedY = nRadius * Math.sin(theta);
    // //   this.arcLayers[2].push({ x:     computedX,
    // //                            y:     computedY,
    // //                            r:     radius,
    // //                            color: rc
    // //                         });
    // // }
    //
    //


  }; // init

  this.newColors = function() {
    let dla = this.defaultLineAlpha;
    for (let i = 0; i < this.arcLayers.length; i++) {
      for (let j = 0; j < this.arcLayers[i].length; j++) {
        this.arcLayers[i][j].color = randColor('rgba',dla);
      }
    }
  };

  this.newRGBcolors = function() {

  };

  this.draw = function() {
    let cl = 0; // cl = current layer
    if (totalLayers < 11) {
      clearCanvas();
    } else if (totalLayers >= 11) {
      clearCanvasLarge();
    } else {
      // nothin
    }

    // paint layers from outside in so that inner layers are very visible
    for (var i = this.arcLayers.length-1; i > 0; i--) {
      let cl = i;
      for (var j = 0; j < this.arcLayers[cl].length; j++) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.arcLayers[cl][j].color;
        this.ctx.fillStyle = this.arcLayers[cl][j].color;
        this.ctx.lineWidth = this.defaultWidth;
        this.ctx.translate(400,400);
        this.ctx.arc(this.arcLayers[cl][j].x,this.arcLayers[cl][j].y,this.arcLayers[cl][j].r,0,360);
        this.ctx.translate(-400,-400);
        if (fillSwitch) this.ctx.fill();
        this.ctx.stroke();
      }
    }
    // draw the center circle
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.arcLayers[0][0].color;
    this.ctx.fillStyle = this.arcLayers[0][0].color;
    this.ctx.lineWidth = this.defaultWidth;
    this.ctx.arc(this.arcLayers[0][0].x,this.arcLayers[0][0].y,this.arcLayers[0][0].r,0,360);
    if (fillSwitch) this.ctx.fill();
    this.ctx.stroke();
  }; // end draw

  this.update = function() {
    if (rotateSwitch === true) {
        this.ctx.translate(400,400);
        this.ctx.rotate( this.radRotate );
        this.ctx.translate(-400,-400);
    }
  }; // end update

} // seed


// HELPERS
function clearCanvas() {
  ctx.clearRect(-1, -1, canvas.width+1, canvas.height+1);
}

function clearCanvasLarge() {
  ctx.save();
  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getRadianAngle(degreeValue) {
  return degreeValue * Math.PI / 180;
}

function randColor(type,alpha) {
  // more muted colors example
      // return ( "#" + Math.round((getRandomIntInclusive(0,99999999) + 0x77000000)).toString(16) );
  // full spectum below
  if (type === 'hex') {
    return ( "#" + Math.round((getRandomIntInclusive(0,0xffffff))).toString(16) );
  } else if (type === 'rgba') {
    return ( 'rgba('+ getRandomIntInclusive(0,255) +','+ getRandomIntInclusive(0,255) +','+ getRandomIntInclusive(0,255) +','+alpha+')' );
  } else {
    console.log("Not valid option for randColor()");
    return undefined;
  }
}

function randColorPimary(emphasis, alpha = 1) {
  let lowbound = 30;
  let emphasisLowbound = lowbound + 50; // to force the emphasis color to be brighter
  if (emphasis === "r") {
    return ( 'rgba('+ getRandomIntInclusive(emphasisLowbound,255) +','+ getRandomIntInclusive(0,lowbound) +','+ getRandomIntInclusive(0,lowbound) +','+alpha+')' );
  } else if (emphasis === "g") {
    return ( 'rgba('+ getRandomIntInclusive(0,lowbound) +','+ getRandomIntInclusive(emphasisLowbound,255) +','+ getRandomIntInclusive(0,lowbound) +','+alpha+')' );
  } else if (emphasis === "b") {
    return ( 'rgba('+ getRandomIntInclusive(0,lowbound) +','+ getRandomIntInclusive(0,lowbound) +','+ getRandomIntInclusive(emphasisLowbound,255) +','+alpha+')' );
  } else {
    console.log("randColorPrimary: that's not an option");
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

function toggleRotate() {
  if (rotateSwitch === true) {
    rotateSwitch = false;
  } else {
    rotateSwitch = true;
  }
}

function toggleFill() {
  if (fillSwitch === true) {
    fillSwitch = false;
    $('#b-fill span').text('Fill');
  } else {
    fillSwitch = true;
    $('#b-fill span').text('Wire');
  }
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
  totalLayers = parseInt( $('#inp-total-layers').val() );
  mySeed = new Seed(ctx);
  mySeed.init();
  myReq = requestAnimationFrame(gameLoop);

  $('#b-rot').click(function() {
    console.log('rotate clicked');
    toggleRotate();
  });
  $('#b-col-rand').click(function() {
    console.log('rand color clicked');
    mySeed.newColors();
  });
  $('#b-col-rgb').click(function() {
    console.log('rgb color clicked');
    mySeed.newRGBcolors();
  });
  $('#b-fill').click(function() {
    console.log('fill clicked');
    toggleFill();
  });
  $("#inp-total-layers").change( function() {
    console.log("The total changed");
    totalLayers = parseInt( $('#inp-total-layers').val() );
    if ( totalLayers < 2) {
      $('#inp-total-layers').val(2);
    } else if ( totalLayers > 20) {
      $('#inp-total-layers').val(20);
    } else {
      // nothin
    }
    clearCanvasLarge();
    mySeed.build();
  });

});
