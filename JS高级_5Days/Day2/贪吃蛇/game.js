//自调用函数----游戏对象
(function () {
    //游戏的构造函数
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    //初始化游戏---可以设置小蛇和食物显示出来
    Game.prototype.init = function () {
        //初始化游戏
        //食物初始化
        this.food.init(this.map);
        //小蛇初始化
        this.snake.init(this.map);
        //调用小蛇移动
        this.runSnake(this.food, this.map);
        //调用按键的方法
        this.bindKey();
    };

    //添加原型方法---设置小蛇可以自动的跑起来
    Game.prototype.runSnake = function (food, map) {
        var timeId = setInterval(function () {
            //这里不能使用this，会指向顶级对象window
            //bind(),改变了this的指向，现在this指向当前实例对象
            this.snake.move(food, map);
            this.snake.init(map);

            //横坐标的最大值
            var maxX = map.offsetWidth / this.snake.width;
            //纵坐标的最大值
            var maxY = map.offsetHeight / this.snake.height;

            //小蛇的头的坐标
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;

            //横坐标判断
            if (headX < 0 || headX >= maxX) {
                clearInterval(timeId);
                alert("GAME OVER");
            }
            //纵坐标判断
            if (headY < 0 || headY >= maxY) {
                clearInterval(timeId);
                alert("GAME OVER");
            }
        }.bind(that), 150);
    };

    //添加原型方法---设置用户按键，改变小蛇移动的方向
    Game.prototype.bindKey = function () {
        //获取用户的按键，改变小蛇的方向
        document.addEventListener("keydown", function (e) {
            //这里面的this应该是触发keycode事件的对象document
            //获取按键的值
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = "left";
                    break;
                case 38:
                    this.snake.direction = "top";
                    break;
                case 39:
                    this.snake.direction = "right";
                    break;
                case 40:
                    this.snake.direction = "bottom";
                    break;
            }
        }.bind(that), false);
    };


    window.Game = Game;
})();