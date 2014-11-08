//HTML全部加载结束后执行JS
$(window).on("load", function () {
    //给图片定位
    waterFull();
    //模拟json
    var dataInt = {'data': [{'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '3.jpg'}, {'src': '4.jpg'}]};
    //滚动鼠标滚轮事件
    window.onscroll = function () {
        //判断是否已经到页面底部
        if (checkscrollside()) {
            //遍历json
            $.each(dataInt.data, function (index, value) {
                //新建一个div.pin加入到main最后面
                var oPin = $('<div>').addClass('pin').appendTo($('#main'));
                //新建一个div.box插入到新建的div.pin中
                var oBox = $('<div>').addClass('box').appendTo(oPin);
                //新建一个图片插入到新建的div.box中
                $('<img>').attr("src", "../images/" + $(value).attr('src')).appendTo(oBox);
            });
        }
        waterFull();
    }
})
function waterFull() {
    // 获取浏览器窗口宽度
    var winW = $(document).width();
    //获取单个图片容器的宽度
    var oPinW = $('.pin').innerWidth();
    //当前页面上图片列数
    //为确保列数是整数 用parseInt方法取整
    var column = parseInt(winW / oPinW);
    //把图片都遍历出来存进一个数组
    var aBoxH = [];   //用来存图片高度的数组
    for (var i = 0; i < $('.pin').length; i++) {
        //每张图片的高度
        var pinH = $('.pin').eq(i).outerHeight();
        //    先把第一列的图片高度存进数组中
        if (i < column) {
            aBoxH.push(pinH);
        } else {
            //获取最矮图片的高度
            var minH = Math.min.apply(null, aBoxH);
            //最矮图片第几列
            var index = getIndex(aBoxH, minH)
            //设置第二列图片在第一列图片的下面加上
            $('.pin').eq(i).css({position: "absolute", left: oPinW * index, top: minH});
            //把当前的图片的高度加在最矮的图片上
            aBoxH[index] += pinH;
            //   完成这步后图片继续遍历，把下一张图片位置继续放在最矮的图片下面
        }
    }
}
// 获取目标在父对象的索引
function getIndex(parent, target) {
    for (var i in parent) {
        if (parent[i] == target) {
            return i;
        }
    }
}
//判断是否滚到页面底部
function checkscrollside() {
    //浏览器窗口宽度
    var winH = $(document).height();
    //最后一个图片块的上偏移
    var lastT = $('.pin').last().position().top;
    //最后一个图片的高度的一半
    var lastH = $('.pin').last().innerHeight() / 2;
    //滚轮滚上去的距离
    var scrollTop = $(document).scrollTop();
    return lastT + lastH < winH + scrollTop ? true : false;
}