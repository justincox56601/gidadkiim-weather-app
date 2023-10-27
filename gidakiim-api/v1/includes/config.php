<?php
	$dbUser = 'gidakiim_1';
	$dbPassword = 'gidakiim$casslake$2023';
	$dbName = 'gidakiim';

	$db = new PDO('mysql:host=localhost;dbname='.$dbName.';charset=utf8', $dbUser, $dbPassword);

	//set some DB attributes
	$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
	$db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	define('APP_NAME', 'Gidakiim Weather API')
?>