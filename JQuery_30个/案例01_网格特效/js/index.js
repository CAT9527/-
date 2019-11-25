$(function () {
    var liNum = 5 * 5 * 5;//li的个数

    var tX = 500, tY = 500, tZ = 800;//水平和垂直间隔,还有Z轴

    var firstX = -2 * tX;  //第一个li的水平偏移
    var firstY = -2 * tY;  //第一个li的垂直偏移
    var firstZ = -2 * tZ; //第一个li的Z轴偏移

    //给#main里面添加liNum个li
    for (var i = 0; i < liNum; i++) {
        /*
        $()可以传一个选择器，表示选中元素
        但也可以传html标签，并变成一个jq对象
        $('<li></li>')--->创建一个li节点，把这个节点变成jq对象
         */
        var $li = $('<li></li>');

        //一个平面有25个li，iX和iY都要先除于25
        var iX = (i % 25) % 5;  //x方向要增加的倍数
        var iY = parseInt((i % 25) / 5); //Y方向要增加的倍数
        var iZ = parseInt(i / 25);//Z方向要增加的倍数

        $li.css({
            'transform': 'translate3d(' + (firstX + iX * tX) + 'px,' + (firstY + iY * tY) + 'px,' + (firstZ + iZ * tZ) + 'px)'
        });
        $("#main").append($li);
    }
});

(function () {
    var nowX, lastX, minusX,nowY, lastY, minusY;//当前X坐标，最后X坐标
    var roY = 0,roX = 0;  //初始的Y值

    $(document).mousedown(function (ev) {
        ev = ev || window.event;
        lastX = ev.clientX;
        lastY = ev.clientY;
        //console.log("鼠标按下");

        $(this).on('mousemove', function (ev) {
            //console.log('鼠标在移动');
            ev = ev || window.event;  //ev 事件对象，存储着事件发生时的相关信息
            nowX = ev.clientX;  //ev.clientX 当前鼠标的X坐标
            nowY = ev.clientY;
            minusX = nowX - lastX;  //两者差值
            minusY = nowY - lastY;  //两者差值
            roY += minusX * 0.2;
            roX -= minusY * 0.2;
            $("#main").css({
                'transform': 'translateZ(-2000px) rotateX('+roX+'deg) rotateY('+roY+'deg)'
            });
            lastX = nowX;  //存放前一点的X坐标
            lastY = nowY;
            //console.log(nowX);
        });
        return false;
    }).mouseup(function () {
        $(this).off('mousemove');
        //console.log('鼠标抬起');
    });
})();