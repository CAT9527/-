//获取初始界面
var startdvObj = my$("startdiv");

//获取主页面
var maindivObj = my$("maindiv");
//获取分数界面
var scoredivObj = my$("scorediv");
//获取分数
var labelObj = my$("label");
//获取暂停界面
var suspenddivObj = my$("suspenddiv");
//获取结束界面
var enddivObj = my$("enddiv");
//获取结束之后的分数
var planscoreObj = my$("planscore");


//初始分数为0
var score = 0;

function my$(id) {
    return document.getElementById(id);
}
//产生min到max之间的随机数
function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}

/*
* 步骤：1.需要哪些值：必有位置x,y;图片宽，高;图片路径（其他看情况给）
*      2.移动方法
*      3.初始化方法
*      4.初始化
* */


//1.点击确定按钮方法begin(),跳转到maindiv界面，并初始化一切
function begin() {
    //隐藏初始界面，显示maindiv界面
    startdiv.style.display="none";
    mainDiv.style.display="block";
    selfplan.imagenode.style.display="block";
    scorediv.style.display="block";

    set=setInterval(start,20);
}

//2.飞机函数，有宽，高，hp，坐标x，y,移动速度，死亡时间，速度，爆炸图片
function plan(hp, X, Y, sizeX, sizeY, score, dietime, sudu, boomimage, imagesrc) {
    this.planX = X;
    this.planY = Y;
    this.imagenode = null;       //图片
    this.planhp = hp;             //飞机hp
    this.planscore = score;
    this.plansizeX = sizeX;
    this.plansizeY = sizeY;
    this.planboomimage = boomimage;
    this.planisdie = false;
    this.plandietimes = 0;
    this.plandietime = dietime;
    this.plansudu = sudu;

    //移动方法：元素的移动通过改变样式的top值
    this.planeMove = function () {
        this.imagenode.style.top = this.imagenode.offsetTop + this.plansudu + "px";
    }

    //飞机的初始化方法
    this.init = function () {
        //创建元素img
        this.imagenode = document.createElement("img");

        //位置添加left值和top值
        this.imagenode.style.left = this.planX + "px";
        this.imagenode.style.top = this.planY + "px";

        //添加图片路径
        this.imagenode.src = imagesrc;

        //追加给mainDiv
        mainDiv.appendChild(this.imagenode);
    }

    //初始化
    this.init();
}

//3.子弹函数，有位置x，y,子弹图片路径，图片大小x，y
function bullet(X, Y, sizeX, sizeY, imagesrc) {
    this.bulletX = X;
    this.bulletY = Y;
    this.bulletimage = null;
    this.bulletattach = 1;
    this.bulletsizeX = sizeX;
    this.bulletsizeY = sizeY;

    //移动方法
    this.bulletmove = function () {
        this.bulletimage.style.top = this.bulletimage.offsetTop - 20 + "px";
    }

    //子弹的初始化方法
    this.init = function () {
        this.bulletimage = document.createElement("img");
        this.bulletimage.style.left = this.bulletX + "px";
        this.bulletimage.style.top = this.bulletY + "px";
        this.bulletimage.src = imagesrc;
        mainDiv.appendChild(this.bulletimage);
    }

    //初始化
    this.init();
}


//创建子弹类
function oddbullet(X,Y){
    bullet.call(this,X,Y,6,14,"image/bullet1.png");
}


//创建敌机类
function enemy(hp,a,b,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc){
    plan.call(this,hp,random(a,b),-100,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc);
}


//创建本方飞机类
function ourplan(X,Y){
    var imagesrc="image/my.gif";
    plan.call(this,1,X,Y,66,80,0,660,0,"image/bz.gif",imagesrc);
    this.imagenode.setAttribute('id','ourplan');
}

//创建本方飞机
var selfplan=new ourplan(120,485);
//移动事件
var ourPlan=document.getElementById('ourplan');
var yidong=function(){
    var oevent=window.event||arguments[0];
    var chufa=oevent.srcElement||oevent.target;
    var selfplanX=oevent.clientX-500;
    var selfplanY=oevent.clientY;
    ourPlan.style.left=selfplanX-selfplan.plansizeX/2+"px";
    ourPlan.style.top=selfplanY-selfplan.plansizeY/2+"px";
};


var bodyobj=document.getElementsByTagName("body")[0];
if(document.addEventListener){
    //为本方飞机添加移动和暂停
    mainDiv.addEventListener("mousemove",yidong,true);
    //为本方飞机添加暂停事件
    selfplan.imagenode.addEventListener("click",zanting,true);
    //为body添加判断本方飞机移出边界事件
    bodyobj.addEventListener("mousemove",bianjie,true);
    //为暂停界面的继续按钮添加暂停事件
    suspenddiv.getElementsByTagName("button")[0].addEventListener("click",zanting,true);
//    suspenddiv.getElementsByTagName("button")[1].addEventListener("click",chongxinkaishi,true);
    //为暂停界面的返回主页按钮添加事件
    suspenddiv.getElementsByTagName("button")[2].addEventListener("click",jixu,true);
}
else if(document.attachEvent){
    //为本方飞机添加移动
    mainDiv.attachEvent("onmousemove",yidong);
    //为本方飞机添加暂停事件
    selfplan.imagenode.attachEvent("onclick",zanting);
    //为body添加判断本方飞机移出边界事件
    bodyobj.attachEvent("onmousemove",bianjie);
    //为暂停界面的继续按钮添加暂停事件
    suspenddiv.getElementsByTagName("button")[0].attachEvent("onclick",zanting);
//    suspenddiv.getElementsByTagName("button")[1].attachEvent("click",chongxinkaishi,true);
    //为暂停界面的返回主页按钮添加事件
    suspenddiv.getElementsByTagName("button")[2].attachEvent("click",jixu,true);
}
//初始化隐藏本方飞机
selfplan.imagenode.style.display="none";