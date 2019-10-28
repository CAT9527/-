//自调用函数----小蛇的
(function () {
    //存放小蛇的每个身体部位
    var elements = [];

    //小蛇的构造函数
    function Snake(width, height, direction) {
        //小蛇的每个部分的宽
        this.width = width || 20;
        this.height = height || 20;
        //小蛇的身体
        this.body = [
            {x: 3, y: 2, color: "red"},    //头
            {x: 2, y: 2, color: "orange"},  //身体
            {x: 1, y: 2, color: "orange"}  //身体
        ];
        //方向
        this.direction = direction || "right";
    }

    //为原型添加方法---小蛇初始化的方法
    Snake.prototype.init = function (map) {
        remove();
        //循环遍历创建div
        for (var i = 0; i < this.body.length; i++) {
            //数组中每个数组元素都是一个对象
            var obj = this.body[i];
            //创建div
            var div = document.createElement("div");
            //把div加入map地图中
            map.appendChild(div);
            //设置div的样式
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            //横纵坐标
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            //背景颜色
            div.style.backgroundColor = obj.color;

            //方向，难点

            //把div加入elements数组中---目的是为了删除
            elements.push(div);
        }
    };

    //为原型添加方法---小蛇动起来
    Snake.prototype.move = function (food, map) {
        //改变小蛇的身体坐标位置
        var i = this.body.length - 1;
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //判断方向---改变小蛇的头的坐标位置
        switch (this.direction) {
            case"right":
                this.body[0].x += 1;
                break;
            case"left":
                this.body[0].x -= 1;
                break;
            case"top":
                this.body[0].y -= 1;
                break;
            case"bottom":
                this.body[0].y += 1;
                break;
        }

        //判断有吃到食物
        //小蛇的头的坐标与食物的坐标一致
        var headX = this.body[0].x * this.width;
        var headY = this.body[0].y * this.height;

        //食物的横纵坐标
        if (headX == food.x && headY == food.y) {
            //获取小蛇的最后尾巴
            var last = this.body[this.body.length - 1];
            //把最后的蛇尾复制一个，再加一个到小蛇中
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            //把食物删除，重新生成食物
            food.init(document.querySelector(".map"));
        }
    };


    //私有方法
    function remove() {
        //获取数组
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            var ele = elements[i];
            //找到这个子元素的父级元素，然后删除这个子元素
            ele.parentNode.removeChild(ele);
            //然后再把数组elements中这个子元素也要删除
            elements.splice(i, 1);
        }
    }

    //把snake暴露给window,外部可以进行访问
    window.Snake = Snake;
}());