/**
 * Created by Administrator on 2017-10-13.
 */
/*
*
*
*
* html文件
*
* 写样式代码
* #dv2 div{
* width: 200px;
* height: 100px;
* background-color: gray;
* float: left;
* margin-right: 10px;
* }
*
*
*
*
* 引入jQuery的文件
*  <script src="js/jquery-1.12.1.js"></script>
*
*
*
* 写功能的代码
*     $(function () {
* //点击按钮.改变每个div的背景颜色
*
* //插件的基本的代码
* $.fn.changeColor=function (color) {
* //$(this)---->调用该方法的实例对象
* $(this).css("backgroundColor",color);
* };
*
* $("#dv input").click(function () {
* $("#dv2 div").css("backgroundColor",$(this).val());
* });
*
*
* });
*
*
* body中写结构的代码
* <div id="dv">
* <input type="button" value="red" />
* <input type="button" value="green" />
* <input type="button" value="blue" />
* <div id="dv2">
* <div></div>
* <div></div>
* <div></div>
* </div>
* </div>
*
*
*
*
*
* 功能实现了
*
* 在js文件夹中,写入两个js文件(jQuery的js文件,插件的js文件)
* 实现基本功能的代码放在插件的js文件中
* 在css文件夹中,写入一个样式的CSS文件
*
* 把基本实现的代码加入到$.fn中才可以
*
*
* 插件使用:
*
* 引入css文件
* 引入jQuery.js文件
* 引入插件的js文件
* 复制html代码到body中
* 复制实现功能的代码到 页面加载的事件中即可
*
*
*
*
*
*
*
* */