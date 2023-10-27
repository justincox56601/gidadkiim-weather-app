<?php

include_once dirname(__FILE__, 2) . '/config/Database.php';

class Create{
	private $conn;
	private $dataTable = 'data';
	private $citiesTable = 'cities';

	//constructor
	public function __construct(){
		$this->conn = Database::getInstance()->getConnection();
	}

	public function post($data){
		$keys = implode(", ", array_keys($data[0]));
		$vals = ' :' . implode(", :", array_keys($data[0]));
		$query = 'INSERT INTO ' . $this->dataTable .' (' . $keys . ') VALUES(' . $vals . ')';
		$stmt = $this->conn->prepare($query);

		try {
			$this->conn->beginTransaction();
			foreach($data as $d){
				$stmt->execute($d);
			}
			$this->conn->commit();
		} catch (\Exception $e) {
			$this->conn->rollback();
			throw $e;
		}

		echo "finished";
	}

	public function getCities(){
		//returns a list of cities form the database
		$sql = "SELECT * FROM " . $this->citiesTable;
		$stmt = $this->conn->prepare($sql);
		$stmt->execute();
		$rows = $stmt->rowCount();
		$cities = [];
		if($rows>0){
			while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
				if($row['active']){
					$cities[] = $row;
				}
				
			}
		}

		return $cities;
	}

}