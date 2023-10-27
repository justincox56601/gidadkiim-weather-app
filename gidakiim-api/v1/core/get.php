<?php

	class Get{
		//database stuff
		private $_conn;
		private $_dataTable = 'data'; 
		private $_citeisTable = 'cities';
		private $_metaTable = 'meta';

		//get properties - add more; based on actual databse
		public $startDate;
		public $endDate;
		public $dataPoint;
		public $cities;

		public function __construct($db){
			$this->conn = $db;
		}

		//get
		public function read(){
			$query = '
			SELECT ID, Observed_Time, City_Name, ' . $this->dataPoint . ' 
			FROM ' . $this->_dataTable . '  
			WHERE City_Name IN (' .  $this->_citiesToString() . ') 
			AND Observed_Time BETWEEN "' . $this->startDate . '" AND "' . $this->endDate . '" 
			ORDER BY Observed_Time ASC';

			//prepare statement
			$stmt = $this->conn->prepare($query);
			$stmt->execute();

			return $stmt;
		}

		//get metadata
		public function getMetaData(){
			$query = 
			'SELECT field, description, units 
			from ' . $this->_metaTable . ' 
			where field IN ("Observed_Time", "' . $this->dataPoint . '")';
			
			//prepare statement
			$stmt = $this->conn->prepare($query);
			$stmt->execute();

			return $stmt;
		}

		private function _citiesToString(){
			$cities = explode(',', $this->cities);
			$cities = array_map(function($city){
				return '"' . $city . '"';
			}, $cities);
			return join(", ", $cities);
		}
	}
?>