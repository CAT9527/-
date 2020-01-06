<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>用户登录</title>
</head>
<body>
	<!-- 
	    1.必须要有form标签
	    2.form必须指定action和method
	       不设置action，默认是当前页面
	       不设置method，默认是get
	    3.表单元素（表单域），必须有name（如果希望被提交的情况）
	    4.必须有一个提交按钮
	 -->

	<form action="11-foo.php" method="post">
		<table border="1px solid">
		<tr>
			<td>用户名</td>
			<td><input type="text" name = "username"></td>
		</tr>
		<tr>
			<td>密码</td>
			<td><input type="text" name = "password"></td>
		</tr>
		<tr>
			<td></td>
			<!-- input:submit image -->
			<!-- button:submit image -->
			<td><button>登陆</button></td>
		</tr>
	</table>
	</form>	
</body>
</html>