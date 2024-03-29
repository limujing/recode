function move(obj, json, func) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var bStop = true;
        for (var attr in json) {
            var iCur = attr == "opacity" ? parseInt(parseFloat(getStyle(obj, attr)) * 100) : parseInt(getStyle(obj, attr));
            var iSpeed = ((json[attr] - iCur) / 8) > 0 ? Math.ceil((json[attr] - iCur) / 8) : Math.floor((json[attr] - iCur) / 8);
            if (iCur != json[attr])  bStop = false;
            if (attr == "opacity") {
                obj.style.filter = 'alpha(opacity=' + iCur + iSpeed + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + "px";
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            if (func) func();
        }
    }, 30);
}
function getStyle(obj, attr) {
    if (obj.currentStyle) return obj.currentStyle[attr];
    else return getComputedStyle(obj, false)[attr];
}