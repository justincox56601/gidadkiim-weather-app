<?php
include_once dirname(__FILE__, 2) . '/config/config.php';
include_once dirname(__FILE__, 2) . '/models/Create.php';

//get list of citites
$create = new Create();
$cities = $create->getCities();

//call API
$data = [];
foreach($cities as $city){
	$curl = curl_init();
	$options = [
		CURLOPT_URL => "https://api.weatherbit.io/v2.0/current?lat=" . $city['Latitude'] . "&lon=" . $city['Longitude'] . "&key=" . API_KEY,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_RETURNTRANSFER => true,
	];
	curl_setopt_array($curl, $options);
	$result = json_decode(curl_exec($curl));
	curl_close($curl);
	
	$data[] = [
		'City'								=>$city['ID'],
		'Observed_Time' 					=>$result->data[0]->ob_time,
		'Date_Time' 						=>$result->data[0]->datetime,
		'Last_Observed_Time' 				=>$result->data[0]->ts,
		'City_Name' 						=>$result->data[0]->city_name,
		'Temperature'						=>$result->data[0]->temp,
		'Pressure'							=>$result->data[0]->pres,
		'Wind_Speed'						=>$result->data[0]->wind_spd,
		'Wind_Direction' 					=>$result->data[0]->wind_dir,
		'Abbreviated_Wind_Direction'		=>$result->data[0]->wind_cdir,
		'Relative_Humidity'					=>$result->data[0]->rh,
		'Cloud_Coverage'					=>$result->data[0]->clouds,
		'Precipitation'						=>$result->data[0]->precip,
		'Snow'								=>$result->data[0]->snow,
		'Direct_Normal_Solar_Irradiance'	=>$result->data[0]->dni,
		'Solar_Radiation'					=>$result->data[0]->solar_rad,
	];
}

//post data
$create->post($data);
