<?php

var_dump($_GET);
//$_GET 用于接收URL地址中的提交数据（一般是GET数据）

var_dump($_POST);
//$_POST 用于接收 请求体 中提交的数据（一般是POST提交的数据）

var_dump($_REQUEST);
//$_REQUEST = $_GET + $_POST 的并集
