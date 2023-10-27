<?php


include_once APP_ROOT . '/config/Database.php';

class WeatherData{
	//DB stuff
	private $conn;
	private $citiesTable = 'cities';
	private $dataTable = 'data';
	private $metaTable = 'meta';

	//properties

	//constructor
	public function __construct(){
		//$this->conn = Database::getInstance()->getConnection();
	}

	//get cities
	public function getCities($num=null){
		$query = 'SELECT *	FROM ' . $this->citiesTable;
					
		if($num){
			$query .= ' WHERE ID=' . $num;
		}

		//prepared statement
		$stmt = $this->conn->prepare($query);

		//execute query
		$stmt->execute();

		return $stmt;
	}

	public function getDate($field, $position){
		
		$query = 'SELECT ' . $field . ' FROM ' . $this->dataTable . ' ORDER BY ' . $field . ' ' . $position. ' LIMIT 1';
		//prepared statement
		$stmt = $this->conn->prepare($query);

		//execute query
		$stmt->execute();
	
		return $stmt;
	}

	public function getParams(){
		$query = "SELECT *
				FROM INFORMATION_SCHEMA.COLUMNS
				WHERE TABLE_NAME = N'data'";

		//prepared statement
		$stmt = $this->conn->prepare($query);

		//execute query
		$stmt->execute();

		return $stmt;
	}

	public function getData($params){
		//params = [city, param, start, end]
		extract($params);
		$start =substr_replace($start,"00:00:00",-8);
		$end = substr_replace($end,"23:59:00",-8);

		$query = 'SELECT city.name, data.' . $date . ', data.' . $param . ', meta.description, meta.units 
		from ' . $this->dataTable. ' as data 
		INNER JOIN ' . $this->citiesTable . ' as city on city.ID=data.City 
		INNER JOIN ' . $this->metaTable . " as meta on meta.field='" . $param ."' 
		WHERE " . $date . " BETWEEN '" . $start . "' AND '". $end . "' AND data.City=" . $city;


		//prepared statement
		$stmt = $this->conn->prepare($query);

		//execute query
		$stmt->execute();
		
		return $stmt;
	}

	public function getAllData(){
		//returns all of the data in the database

		//get all of the database collumns and city names
		$cols = [];
		$colQuery = $this->getParams();
		while($colRow = $colQuery->fetch(PDO::FETCH_ASSOC)){
			$cols[] = $colRow["COLUMN_NAME"];
		}

		$cols = array_map(function($c){
			if($c == 'City'){
				return $this->citiesTable . '.Name as City';
			}else{
				return $this->dataTable . '.' . $c;
			}
		}, $cols);

		$cols = implode(", ", $cols);

		$query = "SELECT " . $cols . " FROM " . $this->dataTable . " as data  
		INNER JOIN " . $this->citiesTable . " as " . $this->citiesTable . " ON " . $this->dataTable . ".City = " . $this->citiesTable . ".ID 
		ORDER BY " . $this->dataTable . ".ID ASC"; 

		//prepared statement
		$stmt = $this->conn->prepare($query);
		//var_dump($stmt);
		//execute query
		$stmt->execute();
		
		return $stmt;
	}
}