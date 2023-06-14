-- Delete database  if already exists on the name employees_database
DROP DATABASE IF EXISTS employees_database;

--  create database employees_database
CREATE DATABASE employees_database;

-- telling mysql to work on employees_database database 
USE employees_database;


-- department table
CREATE TABLE department (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR (30)
);

-- role table
CREATE TABLE role (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR (30),
  salary DECIMAL(9,2),
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- employee table
CREATE TABLE employee (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR (30),
  last_name VARCHAR (30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- department table default values created as per the video in readme
INSERT INTO department ( name)
VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");

-- role table default values created as per the video in readme
INSERT INTO role (title,salary,department_id)
VALUES ("Sales Lead", 100000, 4), ("Sales Person", 80000, 4), ("Lead Engineer", 150000, 1),
("Software Engineer", 120000, 1), ("Account Manager", 160000, 2), ("Accountant", 125000, 2),
("Legal Team Lead",250000, 3),("Lawyer",190000,3);

-- employee table default values created as per the video in readme
INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("John", "Doe", 1, null), ("Mike", "Chan", 2, 1), ("Ashely", "Rodriquez", 3, null),
("Kevin","Tupik", 4, 3), ("Kunal", "Singh", 5, null), ("Malia", "Brown", 6, 5),
("Sarah","Tom",7,null),("Tom","Allen",8,7);