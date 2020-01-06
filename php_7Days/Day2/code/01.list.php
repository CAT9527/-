<?php

//将文本中的内容呈现在一个表格中
// 1. 读取文件内容                   //=> 包含文本内容的字符串
$contents = file_get_contents("names.txt");

// 2. 按照一个特定的规则解析文件内容 //=> 数组
$data = array();  //创建一个空数组

// 2.1 按照换行拆分
$lines = explode("\n", $contents);

// 2.2 按照遍历每一行分别解析每一行的数据
foreach ($lines as $item) {
	if(!$item) continue;  //去除空数据

	// $item =》每一行
	$cols = explode(' | ', $item);
	// $cols => []

	//$data  => [ [],[] ]
	$data[] = $cols;  //把每一次的$cols加入空数组中
}
$data[] = $_REQUEST;

// 3. 通过混编的方式将数据呈现在表格中
//var_dump($data);
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>全部人员信息表</title>
</head>
<body>
	<h1>全部人员信息表</h1>
	<table>
		<thead>
			<tr>
				<th>编号</th>
				<th>姓名</th>
				<th>年龄</th>
				<th>邮箱</th>
				<th>网址</th>
			</tr>
		</thead>
		<tbody>
			<?php foreach ($data as $line): ?>
				<tr>
					<?php foreach ($line as $col): ?>
						<?php $col = trim($col);?>

						<!-- 判断这里的数据是不是一个网址（看看是不是以http开头） -->
						<?php if(strpos($col,'http://')===0): ?>
							<td><a href="<?php echo strtolower($col); ?>"><?php echo substr($col,7)?></a></td>
						<?php else: ?>
							<td><?php echo $col; ?></td>
						<?php endif ?>
					<?php endforeach ?>
				</tr>
			<?php endforeach ?>
		</tbody>
	</table>

	<form action="" method="get">
		<table>
			<tr>
				<td>编号</td>
				<td><input type="text" name="id"></td>
			</tr>
			<tr>
				<td>姓名</td>
				<td><input type="text" name="name"></td>
			</tr>
			<tr>
				<td>年龄</td>
				<td><input type="text" name="age"></td>
			</tr>
			<tr>
				<td>邮箱</td>
				<td><input type="text" name="email"></td>
			</tr>
			<tr>
				<td>网址</td>
				<td><input type="text" name="address"></td>
			</tr>
			<tr>
				<td></td>
				<td><button>登陆</button></td>
			</tr>
		</table>
	</form>
</body>
</html>