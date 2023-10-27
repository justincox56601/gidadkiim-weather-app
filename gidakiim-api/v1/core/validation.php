<?php
	class Validation{
		const CITIES_VALIDATION = "/^[a-zA-Z\s,]+$/"; 
		const DATE_VALIDATION = "/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/"; 
		const DATA_POINT_VALIDATION = "/^[a-zA-z]+$/";

		public function __construct(){}

		public function validate($arg, $regex){
			return preg_match($regex, $arg);
		}
	}

?>