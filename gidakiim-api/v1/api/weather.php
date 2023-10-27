<?php
	//headers
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	//initializing the API
	include_once('../core/initialize.php');


	//instantiate the get class
	$get = new Get($db);
	$validation = new Validation();
	//get parameters - startDate, endDate, datapoint, cities
	$get->startDate = isset($_GET['startDate']) && 
		$validation->validate($_GET['startDate'], Validation::DATE_VALIDATION) ? 
		$_GET['startDate'] : die();
	$get->endDate = isset($_GET['endDate']) && 
		$validation->validate($_GET['endDate'], Validation::DATE_VALIDATION) ? 
		$_GET['endDate'] : die();
	$get->dataPoint = isset($_GET['dataPoint']) && 
		$validation->validate($_GET['dataPoint'], Validation::DATA_POINT_VALIDATION) ? 
		$_GET['dataPoint'] : die();
	$get->cities = isset($_GET['cities']) && 
		$validation->validate($_GET['cities'], Validation::CITIES_VALIDATION) ? 
		$_GET['cities'] : die();

	$result = $get->read();
	
	$num = $result->rowCount();

	if($num > 0){
		$getArr = array();

		$getArr['meta'] = array(
			'dateAccessed' => date("Y-m-d h:m:s"),
			'totalRecords' => $num,
			'fieldsReturned' => array(),
		);

		$getArr['data'] = array();

		while($row = $result->fetch(PDO::FETCH_ASSOC)){
			$getItem = array(
				'id' => $row['ID'],
				'date' => $row['Observed_Time'],
				'city' => $row['City_Name'],
				$get->dataPoint => $row[$get->dataPoint]
			);
			array_push($getArr['data'], $getItem);
		}

		//add meta fields
		$metaResults = $get->getMetaData();
		if($metaResults->rowCount() > 0){
			while($metaRow = $metaResults->fetch(PDO::FETCH_ASSOC)){
				extract($metaRow);
				$getArr['meta']['fieldsReturned'][$field] = array(
					'Description' => $description,
					'Units' => $units
				);
			}
		}

		//convert to json and output
		echo json_encode($getArr);
	}else{
		echo json_encode(array('message' => "No posts found."));
	}
?>