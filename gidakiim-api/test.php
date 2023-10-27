<?php

include_once('./v1/core/validation.php');
$validation = new Validation();

$cities1 = 'Bemidji,Casslake,Big Fork';
$cities2 = 'Bemidji,Casslake,BigFork; select*';
$cities3  = 'Bemidji,Casslake,&lt;script>some script</script>,BigFork';
//$cities = filter_var($cities, FILTER_SANITIZE_STRING);
//$cities = filter_var($cities, FILTER_SANITIZE_SPECIAL_CHARS);
$date1 = '2023-01-01';
$date2 = '2023/01/01';
$date3 = '2023-01-01 and other stuff';
$date4 = 'otherstufffirst 2023-01-01';

$data1 = 'Temperature';
$data2 = 'Temperature,Temperature';
$data3 = 'Temperature Temperature';
$data4 = 'Temperature; slect *';
$data5 = 'Temperature<script></script>';
$data6 = 'Temperature&lt;script&gt;';

$regex = "/[;,<,>,*\/]/i";
$dataRegEx = "/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/";
$citiesRegEx = "/^[a-zA-Z\s,]+$/";
$dataPointRexEx ="/^[a-zA-z]+$/";

echo($validation->validate($data1, $dataPointRexEx));
echo($validation->validate($data2, $dataPointRexEx));
echo($validation->validate($data3, $dataPointRexEx));
echo($validation->validate($data4, $dataPointRexEx));
echo($validation->validate($data5, $dataPointRexEx));
echo($validation->validate($data6, $dataPointRexEx));
