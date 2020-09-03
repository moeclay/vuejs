-- buat database
CREATE DATABASE `mydatabase`;

USE `mydatabase`;

CREATE TABLE `product` (
	`idproduct` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(45) NOT NULL,
	`price` float NOT NULL,
	`created` datetime NOT NULL
	PRIMARY KEY
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

