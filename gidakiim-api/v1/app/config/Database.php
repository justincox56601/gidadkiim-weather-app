<?php

include_once dirname(__FILE__) . '/config.php';

class Database{
	//DB params
	private $host = DB_HOST;
	private $db_name = DB_NAME;
	private $username = DB_USER;
	private $password = DB_PASS;
	private $conn;
	private static $instance = null;


	public static function getInstance(){
		if(self::$instance == null){
			self::$instance = new Database();
		}
		return self::$instance;
	}

	//DB Connect
	private function __construct(){
		try{
			$this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->password);
			$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}catch(PDOException $e){
			echo 'Connection Error: ' . $e->getMessage();
		}

	}

	public  function getConnection(){
		return $this->conn;
	}
}