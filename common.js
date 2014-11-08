function getByClass(parent, className) {
    var parent = document.getElementById(parent);
    var aEle = parent.getElementsByTagName('*');
    var result = [];
    var re = new RegExp("(^|\\s)" + className + "(\\s|$)");
    for (var i = 0; i < aEle.length; i++) {
        if (re.test(aEle[i].className)) {
            result.push(aEle[i]);
        }
    }
    return result;
}
function addClass(obj, className) {
    var oldName = obj.className;
    var re = new RegExp("(^|\\s)" + className + "(\\s|$)");
    if (re.test(oldName)) return false;
    else obj.className = oldName + " " + className;
}
function removeClass(obj, className) {
    var oldName = obj.className;
    var re = new RegExp("(^|\\s)" + className + "(\\s|$)");
    if (!oldName) return false;
    if (oldName == className) obj.className = "";
    if (re.test(oldName)) obj.className = oldName.replace(re, "");
    else return false;
}
function hasClass(obj, className) {
    var oldName = obj.className;
    var re = new RegExp("\\b" + className + "\\b");



    return re.test(oldName) ? true : false;

}
function getStyle(obj, attr) {
    if (obj.currentStyle) return obj.currentStyle[attr];
    else return getComputedStyle(obj, false)[attr];
}
function move(obj, json, func) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var bStop = true;
        for (var attr in json) {
            var iCur = attr == "opacity" ? parseInt(parseFloat(getStyle(obj, attr)) * 100) : parseInt(getStyle(obj, attr));
            var iSpeed = (json[attr] - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (json[attr] != iCur) {
                bStop = false;
            }
            if (attr == "opacity") {
                obj.style.filter = "alpha(opacity=" + iCur + iSpeed + ")";
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + "px";
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            if (func) {
                func();
            }
        }
    });
}