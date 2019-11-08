/**
 * Created by Administrator on 2017-10-13.
 */
//插件的基本的代码
$.fn.changeColor=function (color) {
    //$(this)---->调用该方法的实例对象
    $(this).css("backgroundColor",color);
};