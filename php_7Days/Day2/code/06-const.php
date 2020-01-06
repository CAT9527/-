<?php

//常量const

//php中可以通过define函数定义一个常量
//特性：定义后不能被修改，也是临时存放数据的容器
//什么时候用常量：一般程序的配置信息（不会在运行过程中修改）都会在常量中定义

//what why how where when

//变量或者函数都是采用snake_case（小写加下划线）命名规则
//常量是SNAKE_CASE 全大写命名规则
//第一个参数常量名称
//第二个参数是常量的值
//第三个参数是常量名称是否忽略大小写,默认为false，不忽略

define('SYSTEM_NAME','阿里白修');
define('SYSTEM_VARSION','阿里修',true);

echo SYSTEM_NAME;
echo SYSTEM_VARSIOn;