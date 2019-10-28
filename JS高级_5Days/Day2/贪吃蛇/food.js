(function () {
    var elements = [];//用来保存每个小方块食物的

    //食物的构造函数
    //食物就是一个对象，有宽，高，颜色，横纵坐标
    function Food(x, y, width, height, color) {
        //横纵坐标t
        this.x = x || 0;
        this.y = y || 0;
        //宽和高
        this.width = width || 20;
        this.height = height || 20;
        //背景颜色
        this.color = color || "green";
    }

    //2.为原型添加初始化方法（作用，在页面中显示这个食物）
    Food.prototype.init = function (map) {
        //先删除所有的食物元素
        //外部无法访问的函数:remove()
        remove();

        //创建食物div
        var div = document.createElement("div");
        //把食物div加到地图map中
        map.appendChild(div);
        //设置div样式
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        //横纵坐标需要计算，这是这个原型对象方法中比较难的一点
        //(1).先脱离文档流
        div.style.position = "absolute";
        //(2).随机横纵坐标
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
        //(3).赋值
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";


        //把div加入数组elements中,方便后面食物的删除
        elements.push(div);
    };

    //私有的函数---删除食物
    function remove() {
        //element数组中存在这个食物
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            //找到这个子元素的父级元素，然后删除这个子元素
            ele.parentNode.removeChild(ele);
            //然后再把数组elements中这个子元素也要删除
            elements.splice(i, 1);
        }
    }

    //将Food暴露给window，让外部可以调用Food构造函数
    window.Food = Food;
}());