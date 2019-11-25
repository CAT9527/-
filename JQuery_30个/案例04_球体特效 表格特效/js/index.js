$(function () {
    var liNum = 5 * 5 * 5;//li的个数
    init();

    function init() {
        //给#main里面添加liNum个li
        for (var i = 0; i < liNum; i++) {
            /*
            $()可以传一个选择器，表示选中元素
            但也可以传html标签，并变成一个jq对象
            $('<li></li>')--->创建一个li节点，把这个节点变成jq对象
             */
            var $li = $('<li><p class="title">Js</p><p class="author">阿飞</p><p class="time">2016.03.03</p></li>');
            ;
            var x = (Math.random() - 0.5) * 5000;
            var y = (Math.random() - 0.5) * 5000;
            var z = (Math.random() - 0.5) * 5000;

            $li.css({
                'transform': 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)'
            });
            $("#main").append($li);
        }

        setTimeout(function () {
            Grid();
            $("#styleBtn").css({
                transform: 'scale(1)',
                opacity: '1'
            });
        }, 300);

        $("#styleBtn li").click(function () {
            var index = $(this).index();//得到当前序列号
            switch (index) {
                case 0:
                    Table();
                    break;
                case 1:
                    Sphere();
                    break;
                case 2:
                    Helix();
                    break;
                case 3:
                    Grid();
                    break;
            }
        });


    }

    //拖拽和滚轮
    (function () {
        var nowX, lastX, minusX = 0, nowY, lastY, minusY = 0;//当前X坐标，最后X坐标,差值需要设置为0
        //差值需要设置为0，因为当鼠标按下却没有移动就离开，mouseup的代码minusX和minusY就会因为没有赋值而是undefined，所有操作值都变成NaN，从而卡住
        var roY = 0, roX = 0, tZ = -2000;  //初始的Y值
        var timer1, timer2;
        $(document).mousedown(function (ev) {
            ev = ev || window.event;
            lastX = ev.clientX;
            lastY = ev.clientY;
            //console.log("鼠标按下");

            clearInterval(timer1);
            clearInterval(timer2);
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
                    'transform': 'translateZ(' + tZ + 'px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
                });
                lastX = nowX;  //存放前一点的X坐标
                lastY = nowY;
                //console.log(nowX);
            });
            return false;
        }).mouseup(function () {
            $(this).off('mousemove');

            //制作缓冲动画
            timer1 = setInterval(function () {
                minusX *= 0.95;
                minusY *= 0.95;
                roY += minusX * 0.2;
                roX -= minusY * 0.2;
                if (Math.abs(minusX) < 0.5 && Math.abs(minusY) < 0.5) {
                    clearInterval(timer1);
                }
                $("#main").css({
                    'transform': 'translateZ(' + tZ + 'px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
                });
            }, 13);
            //console.log('鼠标抬起');
        }).mousewheel(function () {  //滚轮事件
            var d = arguments[1]; //不定参的集合
            //console.log(d);//d是判断滚轮方向，值为1，-1
            tZ += d * 80;
            //tZ范围
            tZ = Math.min(0, tZ);//取参数最小的
            tZ = Math.max(-8000, tZ);  //取参数最大
            $("#main").css({
                'transform': 'translateZ(' + tZ + 'px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
            });

            //制作缓冲动画
            timer2 = setInterval(function () {
                d *= 0.85;
                if (Math.abs(d) < 0.01) {
                    clearInterval(timer2);
                }
                tZ += d * 80;
                tZ = Math.min(0, tZ); // Math.min()  取参数里面最小的
                tZ = Math.max(-8000, tZ); // Math.max()  …… 最大
                // -8000 < tZ < 0
                $('#main').css({
                    'transform': 'translateZ(' + tZ + 'px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
                });
            }, 13);
        });
    })();

    //网格
    function Grid() {
        var tX = 500, tY = 500, tZ = 800;//水平和垂直间隔,还有Z轴

        var firstX = -2 * tX;  //第一个li的水平偏移
        var firstY = -2 * tY;  //第一个li的垂直偏移
        var firstZ = -2 * tZ; //第一个li的Z轴偏移

        //遍历所有的li将其
        $("#main li").each(function (i) {
            //一个平面有25个li，iX和iY都要先除于25
            var iX = (i % 25) % 5;  //x方向要增加的倍数
            var iY = parseInt((i % 25) / 5); //Y方向要增加的倍数
            var iZ = parseInt(i / 25);//Z方向要增加的倍数

            $(this).css({
                'transform': 'translate3d(' + (firstX + iX * tX) + 'px,' + (firstY + iY * tY) + 'px,' + (firstZ + iZ * tZ) + 'px)',
                'transition': '4s ease-in-out'
            });
        });
    }

    //螺旋
    function Helix() {
        var roY = 10, tY = 10;//Y轴累计增加的值
        var mIndex = Math.floor($("#main li").length / 2);
        var firstY = -tY * mIndex;
        $("#main li").each(function (i) {
            $(this).css({
                'transform': 'rotateY(' + roY * i + 'deg) translateY(' + (firstY + tY * i) + 'px) translateZ(1000px)'
                // 'transition': '4s ease-in-out'
            });
        });
    }

    //球体
    function Sphere() {
        var arr = [1, 4, 8, 10, 12, 17, 22, 16, 14, 9, 6, 5, 1];
        var roX = 180 / arr.length;
        var fisrtRoX = 90;
        $('#main li').each(function (j) {
            var sum = 0;
            var index, num;
            for (var i = 0; i < arr.length; i++) {
                sum += arr[i];
                if (sum >= j + 1) {
                    index = i;
                    num = arr[i] - (sum - j);
                    break;
                }
            }
            var roY = 360 / arr[index];
            var x = index % 2 ? fisrtRoX + index * roX : fisrtRoX - index * roX;
            var y = num * roY;
            var z = 0;
            if (x > 90 && x < 270) {
                z = 180;
            }
            $(this).css({
                transform: 'rotateY(' + y + 'deg) rotateX(' + x + 'deg) rotateZ(' + z + 'deg) translateZ(800px)'
            });
        });
    }

    function Table() {

        var tX = 160, tY = 200;
        var firstX = -9 * tX + 60;
        var firstY = -4 * tY;
        var arr = [
            {x: firstX, y: firstY},
            {x: firstX + 17 * tX, y: firstY},
            {x: firstX, y: firstY + tY},
            {x: firstX + tX, y: firstY + tY},
            {x: firstX + 12 * tX, y: firstY + tY},
            {x: firstX + 13 * tX, y: firstY + tY},
            {x: firstX + 14 * tX, y: firstY + tY},
            {x: firstX + 15 * tX, y: firstY + tY},
            {x: firstX + 16 * tX, y: firstY + tY},
            {x: firstX + 17 * tX, y: firstY + tY},
            {x: firstX, y: firstY + tY * 2},
            {x: firstX + tX, y: firstY + tY * 2},
            {x: firstX + 12 * tX, y: firstY + tY * 2},
            {x: firstX + 13 * tX, y: firstY + tY * 2},
            {x: firstX + 14 * tX, y: firstY + tY * 2},
            {x: firstX + 15 * tX, y: firstY + tY * 2},
            {x: firstX + 16 * tX, y: firstY + tY * 2},
            {x: firstX + 17 * tX, y: firstY + tY * 2}
        ];
        $('#main li').each(function (i) {
            var x, y;
            if (i < 18) {
                x = arr[i].x;
                y = arr[i].y;
            } else {
                var iX = (i + 18) % 18;
                var iY = parseInt((i + 18) / 18) + 1;
                x = firstX + iX * tX;
                y = firstY + iY * tY;
            }
            $(this).css({
                transform: 'translate(' + x + 'px,' + y + 'px)'
            });
        });
    }

    (function () {
        var $mainLi = $('#main li');
        var $show = $('#show');

        $mainLi.click(function (ev) {
            ev = ev || window.event;

            //fadeIn渐入
            $show.fadeIn(1000).css({
                'transform': 'rotateY(0deg)scale(1)'
            });
            //该方法将停止事件的传播,阻止它被分派到其他 Document 节点。
            ev.stopPropagation();
        });

        //点击其他位置，消失
        $(document).click(function () {
            $show.fadeOut(1000, function () {
                $(this).css({
                    'transform': 'rotateY(0deg) scale(1.5)'
                });
            }).css({
                'transform': 'rotateY(180deg) scale(0.1)'
            });
        });
        $show.click(function (ev) {
            $('#wrap').animate({
                'marginLeft': '-100%'
            }, 1000, function () {
                $show.css({
                    'transform': 'rotateY(0deg) scale(1.5)',
                    display: 'none'
                });
            });
            $('#frame').show().animate({
                left: 0
            }, 1000).find('iframe').attr('src', 'demo/3D drag/index.html');
            ev.stopPropagation();
        });
        $('#back').click(function (ev) {
            $('#wrap').animate({
                'marginLeft': 0
            }, 1000);
            $('#frame').show().animate({
                left: '100%'
            }, 1000);
            ev.stopPropagation();
        });
    })();

});

