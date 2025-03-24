/* SQL Commands to setup Database and Tables */

-- Create Database as root user & grant access to local user
CREATE DATABASE IF NOT EXISTS react_mariadb;
GRANT ALL PRIVILEGES ON react_mariadb.* TO "raspi4b"@"localhost";

-- Do remaining as local user
USE react_mariadb;

-- Create Books table
CREATE TABLE IF NOT EXISTS `books` (
  `BookID` INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `Title` VARCHAR(45) NOT NULL UNIQUE,
  `Description` VARCHAR(255) NOT NULL,
  `CoverFilename` VARCHAR(45),
  `Price` DECIMAL(10, 2) DEFAULT 0.00 
);

