<?php

//获取字符串长度
//PHP 所有能力都是函数,内置1000+的函数。学语言是学语法而不是学api

$str = 'hello';

echo strlen($str);

echo '<br>';

//获取中文字符串（宽字符）的长度
//strlen只能获取拉丁文的长度
//内置成员直接使用
echo strlen("你好");

echo '<br>';

//php中专门为宽字符集添加一套api
//但这一套API不在内置的1000+里面，而是在扩展，一个模块（php_mbstring.dll）里面
//模块成员必须通过配置文件载入模块过后才能使用
//所有的API都是mb_xxxx

echo mb_strlen('你好');


// 配置 PHP 扩展的步骤
// 1. 在 PHP 的安装目录去创建一个 php.in
// 2. extension_dir
// 3. ;extension=php_mbstring.dll
// 4. 默认Apache加载的php.ini 是去 Windows目录找的
// 5. 可以通过 Apache 的配置文件修改默认加载路径 PHPIniDir
