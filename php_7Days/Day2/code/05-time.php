<?php

//1.通过代码设置时区，更推荐
date_default_timezone_set('PRC');

//2.通过配置文件设置时区
//在php.ini里面设置date.timezone = PRC


//time获取打的是以秒为单位的时间戳
//echo time();
//echo "<br>";

//格式话一个时间戳
//第一个参数是一个时间格式
//第二个参数是一个时间戳
//'Y-m-d-H:i:s' 默认时间戳获取的是格林威治时间，需要设置时区
//echo date('Y-m-d H:i:s',time());


$str = '2020-10-20 20:20:20';

//对已有时间做格式化
//strtotimr可以将一个有格式的时间字符串 转换为一个时间戳
$timetamp = strtotime($str);
echo date('Y年m月d日<b\r>H:i:s',$timetamp);
?>