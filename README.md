# Employee Tracker

## Project Description

This command-line application create interfaces that allow users to easily view and interact with employee information stored in database. This application manages company's employee database.

This applications allows us to view all departments, view all roles, view all employees, add a department, add a role, add an employee, update an employee role, update employee managers, view employees by manager, view employees by department, delete departments, delete roles, and delete employees.

Quit option is provided to come out of application.

seeds.sql provided for sample database required.

## Techstack

Node JS is used for the project development. 
Inquirer library is used to prompt questions to user.
mysql library is used to connect to database.
console.table is used to display output as tables.

## Screenshots

Below screen shot shows how to run and use this project
![Project usage](./Assets/Screenshot%202023-06-14%20at%207.13.57%20AM.png)

Below screen shots shows options available in the project provided as inquirer list
![Option available](./Assets/Screenshot%202023-06-14%20at%207.04.58%20AM.png)

Below Screenshot shows how we connect to datatbase
![Database connection](./Assets/Screenshot%202023-06-14%20at%207.05.31%20AM.png)

Below screenshot shows the database queries written in seeds.sql file
![Database Queries](./Assets/Screenshot%202023-06-14%20at%207.04.29%20AM.png)


## Video recording of the project

Video uploaded in below link will display how to use this application

[https://drive.google.com/file/d/1Ks_nVBWTfZ6dqftUTUGejgetKlYPUhGG/view?usp=sharing](https://drive.google.com/file/d/1Ks_nVBWTfZ6dqftUTUGejgetKlYPUhGG/view?usp=sharing)

## Project Installation

To install the project follow below steps.

1. Download the project or clone this repository using git clone
2. Open terminal and run the command 'npm install'
3. Start Mysql in your mac
4. Copy queries from seeds.sql file and run them on your mysql db.
5. Go to helper.js file, provide your database username, password and port
6. Run the command 'node app.js' to run the application

## Usage

1. Run the command 'node app.js' to run the application in terminal.
2. Start Mysql in your machine with database in place.
3. Select the operation you want to run from the list of choices.
4. For options which requires user inputs enter inputs as prompted on screen.
5. View the required data in table format.

## Testing
 No test cased specified

 ### Reach me here: 
 
 Have Queries? Reach me at
 Email : vijay.cheruku@live.com