(function($){
    $.fn.zoom=function (){
        var _this=this;
        var zPop=$('<div class="zoom-pop" style="position: absolute;left: 0;top: 0;width: 100px;height: 100px;"></div>');
        var big=$('<div id="zoom-div"><img></div>');
        this.append(zPop);
        this.after(big);
        var dx=this.offset().left;
        var dy=this.offset().top;
        var dw=this.width();
        var dh=this.height();
        var iw=this.find('img').width();
        var pw=$('.zoom-pop').width();
        var py=$('.zoom-pop').height();
        var ratio=$('#zoom-div').width()/pw;
        var maxW=dw-pw;
        var maxH=dh-py;
        this.mousemove(function(e){
            var mx= e.pageX;
            var my= e.pageY;
            var pl= mx-dx-pw/2;
            var pt=my-dy-py/2;
            if(pl<=0) pl=0;
            if(pt<=0) pt=0;
            if(pl>=maxW) pl=maxW;
            if(pt>=maxH) pt=maxH;
            var src=_this.find('img').attr("data-zoom");
            $('#zoom-div img').attr({"src":src,"width":iw*ratio});
            $('.zoom-pop').show().css({"left":pl,"top":pt});
            $('#zoom-div').show().find('img').css({"left":-pl*ratio,"top":-pt*ratio});
        }).mouseout(function(){
            $('.zoom-pop').hide();
            $('#zoom-div').hide();
        });
        /*$('.item-box ul').append($('.item-box ul').html());
        $('.zoom-item').delegate("img","mousemove", function () {
            var data=$(this).attr("src");
            var data1=$(this).attr("data-zoom");
            _this.find('img').attr({"src":data,"data-zoom":data1});
        });
        var box_left=$('.item-box ul').position().left;
        var liW=$('.item-box li').outerWidth(true);
        var ulW=$('.item-box li').length*liW;
        $('.item-box').width(5*liW);
        var boxW=$('.item-box').width();
        $('.item-box ul').width(ulW);
        if(boxW<ulW){
            $('#zoom-list .left').click(function(){
                if(box_left<-boxW){
                    $('.item-box ul').css("left","0px");
                    box_left=0;
                    $('.item-box ul').stop().animate({left:box_left-liW},300);
                    box_left=box_left-liW;
                }
                else{
                    $('.item-box ul').stop().animate({left:box_left-liW},300);
                    box_left=box_left-liW;
                }
            });
            $('#zoom-list .right').click(function(){
                if(box_left>=0){
                    $('.item-box ul').css("left",-boxW-liW);
                    box_left=-boxW-liW;
                    $('.item-box ul').stop().animate({left:box_left+liW},300);
                    box_left=box_left+liW;
                }else{
                    $('.item-box ul').stop().animate({left:box_left+liW},300);
                    box_left=box_left+liW;
                }
            });
        }*/
    }
}(jQuery));
