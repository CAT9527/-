<?php

//1.索引数组  2.关联数组
//2.创建数组的方式：1.array（）  2.字面量[]（php 5.4）

$dict = array(
	'hello' => '你好',
    'hello1' => '你好',
    'hello2' => '你好',
 );

var_dump(array_keys($dict));
//=>['hello','hello1','hello2']

var_dump(array_values($dict));
//=>["你好"，"你好","你好"];

var_dump(array_key_exists("hello", $dict));

//只有当 php.ini 中 display_errors = on 的时候
//才能展示notice错误
//开发阶段一定设置为on，生产阶段(上线)设置为off

//这种写法类似于Js的写法虽然可以达到效果，但是会发生警告
 if($dict["hello"]){
 	echo $dict["hello"];
 }else{
 	echo "没有";
 }

//而这种写法，isset 也可以判断数组中是否有指定的键,isset会吞掉Undefined index的警告
 if(isset($dict["hello"])){
 	echo $dict["hello"];
 }else{
 	echo "没有";
 }

//empty($dict['foo']) 相当于（===） !isset($dict["foo"])||$dict["foo"]==false
 if(empty($dict['foo'])){
 	echo "没有";
 }else{
 	echo $dict['foo'];
 }

?>