/**
 * Created by Administrator on 2017-10-13.
 */
//代码封装到一个方法中
$.fn.changeTab=function (index) {
    $(this).find("ul:eq("+index+")").show().siblings("ul").hide();
};