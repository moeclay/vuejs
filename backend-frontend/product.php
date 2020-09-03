<?php
header("Access-Control-Allow-Origin: *");

class Product {
	private $dbserver = "localhost";
	private $dbuser = "root";
	private $dbpass = "clay36";
	private $dbdatabase = "mydatabase";
	private $msg = "";

	public function getMsg(){
		return $this->msg;
	}

	public function getProducts(){
		$product = array();
		try{
			$mysqli = new mysqli($this->dbserver, $this->dbuser, $this->dbpass, $this->dbdatabase);

			if($mysqli->connect_errno){
				$this->msg = $mysqli->error;
				return $product;
			}
			$query = "SELECT idproduct,name,price FROM product ORDER BY idproduct DESC";
			if(!($stmt = $mysqli->prepare($query))){
				$mysqli->close();
				$this->msg = $mysqli->error;
				return $product;
			}
			if(!$stmt->execute()){
				$mysqli->close();
				$this->msg = $mysqli->error;
				return $product;
			}else{
				$stmt->bind_result($id,$name,$price);
				while($stmt->fetch()){
					$price_string = number_format((float) $price, 2, '.','');
					array_push($product, array(
						"id"=>$id,
						"name"=>$name,
						"price"=>$price_string
					));
				}
			}
			$stmt->close();
			$mysqli->close();
		} catch(Exception $e){
			$this->msg = $e->getMessage();
		}

		return $product;
	}

	public function insertProduct($name,$price){
		$product = -1;
		try {
			$mysqli = new mysqli($this->dbserver, $this->dbuser, $this->dbpass, $this->dbdatabase);

			if($mysqli->connect_errno){
				$this->msg = $mysqli->error;
				return $product;
			}

			$query = "INSERT INTO product(name,price,created) VALUES(?,?,now())";
			if(!($stmt = $mysqli->prepare($query))){
				$mysqli->close();
				$this->msg = $mysqli->error;
				return $product;
			}
			$newprice = floatval($price);
			$stmt->bind_param('sd', $name,$newprice);
			if(!$stmt->execute()){
				$mysqli->close();
				$this->msg = $stmt->error;
				return $product;
			}
			$product = 1;
			$this->msg = "";
			$stmt->close();
			$mysqli->close();
		} catch(Exception $e){
			$this->msg = $e->getMessage();
		}

		return $product;
	}

	public function updateProduct($id,$name,$price){
		$product = -1;
		try {
			$mysqli = new mysqli($this->dbserver, $this->dbuser, $this->dbpass, $this->dbdatabase);

			if($mysqli->connect_errno){
				$this->msg = $mysqli->error;
				return $product;
			}

			$query = "UPDATE product SET name=? , price=? WHERE idproduct=?";
			if(!($stmt = $mysqli->prepare($query))){
				$mysqli->close();
				$this->msg = $mysqli->error;
				return $product;
			}
			$newprice = floatval($price);
			$stmt->bind_param('sdd', $name,$newprice,$id);
			if(!$stmt->execute()){
				$mysqli->close();
				$this->msg = $stmt->error;
				return $product;
			}
			$product = 1;
			$this->msg = "";
			$stmt->close();
			$mysqli->close();
		} catch(Exception $e){
			$this->msg = $e->getMessage();
		}

		return $product;
	}

	public function deleteProduct($id){
		$product = -1;
		try {
			$mysqli = new mysqli($this->dbserver, $this->dbuser, $this->dbpass, $this->dbdatabase);

			if($mysqli->connect_errno){
				$this->msg = $mysqli->error;
				return $product;
			}

			$query = "DELETE FROM product WHERE idproduct=?";
			if(!($stmt = $mysqli->prepare($query))){
				$mysqli->close();
				$this->msg = $mysqli->error;
				return $product;
			}
			$stmt->bind_param('d', $id);
			if(!$stmt->execute()){
				$mysqli->close();
				$this->msg = $stmt->error;
				return $product;
			}
			$product = 1;
			$this->msg = "";
			$stmt->close();
			$mysqli->close();
		} catch(Exception $e){
			$this->msg = $e->getMessage();
		}

		return $product;

	}
}

$obj = new Product();
// crud success

// echo json_encode($obj->getProducts());
// echo json_encode($obj->deleteProduct("2"));