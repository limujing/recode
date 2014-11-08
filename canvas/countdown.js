var windowWidth = document.documentElement.clientWidth-20;
var windowHeight = document.documentElement.clientHeight-20;
var radius = 8;
var marginLeft = windowWidth/4.5;
var marginTop = windowHeight/4;
//var curShowTimeSeconds = 0;
//var endTime = new Date(2014, 10, 7, 17, 20, 20);
var balls = [];
var oldTime = new Date();
var oldHours = parseInt(oldTime.getHours());
var oldMinutes = oldTime.getMinutes();
var oldSeconds = oldTime.getSeconds();
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"];
window.onload = function () {
    var canvas = document.getElementById('canvas');
    var cxt = canvas.getContext('2d');
    canvas.width = windowWidth;
    canvas.height = windowHeight;
    //curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(function () {
        render(cxt);
        update();
    }, 50);


}
function update() {
    /*  var nextShowTimeSeconds = getCurrentShowTimeSeconds();
     var nextHours = parseInt(nextShowTimeSeconds / 3600);
     var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
     var nextSeconds = nextShowTimeSeconds % 60;
     var curHours = parseInt(curShowTimeSeconds / 3600);
     var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
     var curSeconds = curShowTimeSeconds % 60;
     if (curSeconds != nextSeconds) {
     curShowTimeSeconds=nextShowTimeSeconds;
     }*/
    var nextTime = new Date();
    var nextHours = nextTime.getHours();
    var nextMinutes = nextTime.getMinutes();
    var nextSeconds = nextTime.getSeconds();
    if (nextTime != oldSeconds) {
        if (parseInt(oldHours % 10) != parseInt(nextHours % 10)) {
            addBalls(marginLeft + 15 * (radius + 1), marginTop, parseInt(nextMinutes % 10));
        }
        if (parseInt(oldHours / 10) != parseInt(nextHours / 10)) {
            addBalls(marginLeft, marginTop, parseInt(nextMinutes / 10));
        }
        oldHours = nextHours;
        if (parseInt(oldMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(marginLeft + 54 * (radius + 1), marginTop, parseInt(nextMinutes % 10));
        }
        if (parseInt(oldMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(marginLeft + 39 * (radius + 1), marginTop, parseInt(nextMinutes / 10));
        }
        oldMinutes = nextMinutes;
        if (parseInt(oldSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(marginLeft + 93 * (radius + 1), marginTop, parseInt(nextSeconds % 10));
        }
        if (parseInt(oldSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(marginLeft + 78 * (radius + 1), marginTop, parseInt(nextSeconds / 10));
        }
        oldSeconds = nextSeconds;
    }
    updateBalls();
}
/*function getCurrentShowTimeSeconds() {
 var curTime = new Date();
 var ret = endTime.getTime() - curTime.getTime();
 ret = Math.round(ret / 1000);
 return ret > 0 ? ret : 0;
 }*/
function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if (balls[i].y >= windowHeight - radius) {
            balls[i].y = windowHeight - radius;
            balls[i].vy = -0.75 * balls[i].vy;
        }
    }
    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + radius > 0 && balls[i].x - radius < windowWidth) balls[cnt++] = balls[i]
    }
    while (balls.length > cnt) {
        balls.pop();
    }
}
function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + 2 * j * (radius + 1) + (radius + 1),
                    y: y + 2 * i * (radius + 1) + (radius + 1),
                    g: 1.5 * Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: "#"+(~~(Math.random()*(1<<24))).toString(16)
                }
                balls.push(aBall);
            }
        }
    }

}
function render(cxt) {
    cxt.clearRect(0, 0, windowWidth, windowHeight);
    //var hours = parseInt(curShowTimeSeconds / 3600);
    var time = new Date();

    var hours = parseInt(time.getHours());
    //var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var minutes = parseInt(time.getMinutes());
    //var seconds = curShowTimeSeconds % 60;
    var seconds = time.getSeconds();
    renderDigit(marginLeft, marginTop, parseInt(hours / 10), cxt);
    renderDigit(marginLeft + 15 * (radius + 1), marginTop, parseInt(hours % 10), cxt);
    renderDigit(marginLeft + 30 * (radius + 1), marginTop, 10, cxt);
    renderDigit(marginLeft + 39 * (radius + 1), marginTop, parseInt(minutes / 10), cxt);
    renderDigit(marginLeft + 54 * (radius + 1), marginTop, parseInt(minutes % 10), cxt);
    renderDigit(marginLeft + 69 * (radius + 1), marginTop, 10, cxt);
    renderDigit(marginLeft + 78 * (radius + 1), marginTop, parseInt(seconds / 10), cxt);
    renderDigit(marginLeft + 93 * (radius + 1), marginTop, parseInt(seconds % 10), cxt);

    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, radius, 0, Math.PI * 2);
        cxt.closePath();
        cxt.fill();
    }

}
function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "#006bb9";
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (radius + 1) + (radius + 1), y + i * 2 * (radius + 1) + (radius + 1), radius, 0, Math.PI * 2);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}
