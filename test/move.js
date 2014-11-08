function move(obj, attr, iTargrt) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var iCur = attr == "opacity" ? parseInt(parseFloat(getStyle(obj, attr))) : parseInt(getStyle(obj, attr));
        var iSpeed = (iTargrt - iCur) / 8;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        if (iCur == iTargrt) {
            clearInterval(obj.timer);
        } else {
            if (attr == "opacity") {
                obj.style.filter = 'alpha(opacity=' + iCur + iSpeed + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + "px";
            }
        }
    }, 30)
}
function getStyle(obj, attr) {
    if (obj.currentStyle) return obj.currentStyle[attr];
    else return getComputedStyle(obj, false)[attr];
}