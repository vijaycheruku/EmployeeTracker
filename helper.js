//inquirer package used for questions prompting
const inquirer = require('inquirer');
//mysql package for mysql connections
const mysql = require('mysql2');
//console table lib used to display table format in node
const table = require("console.table");


//mysql connection to my local database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employees_database"
});

//function that returns all role titles in array
var allrolesarray = [];
function getallrolesinarray() {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM role", function (err, res) {
            if (err) return reject(err);
            for (var i = 0; i < res.length; i++) {
                allrolesarray.push(res[i].title);
            }
            resolve(allrolesarray);
        });
    });
}

//function that returns all employees first names
var allemplueearray = [];
function getAllemplyees() {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM employee", function (err, res) {
            if (err) return reject(err);
            for (var i = 0; i < res.length; i++) {
                allemplueearray.push(res[i].first_name);
            }
            resolve(allemplueearray);
        });
    });
}

//function that displays all departments
function viewAllDepartments() {
    const { inquireUserInput } = require('./app');
    connection.query("SELECT department.id AS id, department.name AS name FROM department",
        function (err, res) {
            if (err) throw err
            console.log("");
            console.table(res)
            inquireUserInput()
        })
}

//function that displays all roles
function viewAllRoles() {
    const { inquireUserInput } = require('./app');
    connection.query(`SELECT role.id AS id, role.title AS title, department.name AS department, FORMAT (salary, 0) AS salary FROM role INNER JOIN department ON role.department_id = department.id ORDER BY role.id ASC`,
        function (err, res) {
            if (err) throw err
            console.log("");
            console.table(res)
            inquireUserInput()
        })
}

//function that displays all employees
function viewAllEmployees() {
    const { inquireUserInput } = require('./app');
    connection.query("SELECT employee.id as id, employee.first_name AS first_Name, employee.last_name AS last_name, role.title AS title,  department.name AS Department, role.salary AS salary, CONCAT(e.first_name,e.last_name) AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id LEFT JOIN employee e on employee.manager_id= e.id order by employee.id ASC;",
        function (err, res) {
            if (err) throw err
            console.log("");
            console.table(res)
            inquireUserInput()
        })
}

//function to add a new department
function addADepartment() {
    const { inquireUserInput } = require('./app');
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is the name of the department? "
        }
    ]).then(function (answers) {
        connection.query("INSERT INTO department SET ? ",
            {
                name: answers.name,
            },
            function (err) {
                if (err) throw err
                inquireUserInput();
            }
        )
    })
}

//function that returns all department names in an array
var departmentArray = [];
function selectDepartment() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            departmentArray.push(res[i].name);
        }
    })
    return departmentArray;
}

//function to add a role
function addARole() {
    const { inquireUserInput } = require('./app');
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the name of the Role? "
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of the role?"
        },
        {
            name: "department",
            type: "list",
            message: "Which department does the role belong to?",
            choices: selectDepartment()
        }
    ]).then(function (answers) {
        var deptId = selectDepartment().indexOf(answers.department) + 1
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answers.title,
                salary: answers.salary,
                department_id: deptId
            },
            function (err) {
                if (err) throw err
                inquireUserInput();
            }
        )
    })
}

//function that returns all roles in an array
var rolesArray = [];
function getroles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            rolesArray.push(res[i].title);
        }
    })
    return rolesArray;
}


//function that returns all employees in an array
var managersArray = ['None'];
function getmanagers() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managersArray.push(res[i].first_name);
        }
    })
    return managersArray;
}


//function to add an employee
function addAnEmployee() {
    const { inquireUserInput } = require('./app');
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role",
            type: "list",
            message: "What is the employee's role? ",
            choices: getroles()
        },
        {
            name: "manager",
            type: "list",
            message: "Who is the employee's manager? ",
            choices: getmanagers()
        }

    ]).then(function (answers) {
        var roleId = getroles().indexOf(answers.role) + 1
        var managerId;
        if (answers.manager == 'None') {
            managerId = null;
        } else {
            managerId = getmanagers().indexOf(answers.manager) + 1
        }
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: answers.first_name,
                last_name: answers.last_name,
                manager_id: managerId,
                role_id: roleId

            },
            function (err) {
                if (err) throw err
                inquireUserInput()
            })

    })
}

//function to update an employee
function updateAnEmployeeRole() {
    const { inquireUserInput } = require('./app');
    getAllemplyees().then(function (emplist) {
        inquirer.prompt([
            {
                name: "first_name",
                type: "list",
                choices: emplist,
                message: "Which employee's role do you want to update? ",
            },
            {
                name: "role",
                type: "list",
                message: "Which role do you want to ssign to the selected employee? ",
                choices: getroles()
            },
        ]).then(function (answers) {
            var roleId = getroles().indexOf(answers.role) + 1;
            connection.query('UPDATE employee SET role_id = ? WHERE first_name = ?', [roleId, answers.first_name]);
            inquireUserInput();
        });

    })
}


var alldepartmentsarray = [];
function getalldepartmentsinarray() {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM department", function (err, res) {
            if (err) return reject(err);
            for (var i = 0; i < res.length; i++) {
                alldepartmentsarray.push(res[i].name);
            }
            resolve(alldepartmentsarray);
        });
    });
}

//function that dislays dept budget
function viewtotalutilisedbudget() {
    const { inquireUserInput } = require('./app');
    connection.query(`SELECT department.name AS DepartmentName,  FORMAT(SUM(salary),0) AS TotalUtilisedBudget FROM role INNER JOIN employee USING (id)
  INNER JOIN department ON role.department_id = department.id 
  GROUP BY role.department_id;`, (err, res) => {
        if (err) throw err;
        console.log('');
        console.table(res);
        inquireUserInput();
    })
}

//function to quit and end mysql connection
function quitConnection() {
    connection.end();
}

//function to delete department
function deleteDepartment() {
    const { inquireUserInput } = require('./app');
    getalldepartmentsinarray().then(function (alldeplist) {
        inquirer.prompt([
            {
                name: "department",
                type: "list",
                message: "Which Department you want to delete? ",
                choices: alldeplist
            },
        ]).then(function (answers) {
            var deptId = alldeplist.indexOf(answers.department) + 1;
            connection.query('DELETE from department where id = ?', [deptId]);
            inquireUserInput();
        });
    })
}

//function to delete role
function deleteRole() {
    const { inquireUserInput } = require('./app');
    getallrolesinarray().then(function (allroleslist) {
        inquirer.prompt([
            {
                name: "title",
                type: "list",
                message: "Which Role you want to delete? ",
                choices: allroleslist
            },
        ]).then(function (answers) {
            var id = allroleslist.indexOf(answers.title) + 1;
            connection.query('DELETE from role where id = ?', [id]);
            inquireUserInput();
        });
    })
}

//function to delete employee
function deleteEmployee() {
    const { inquireUserInput } = require('./app');
    getAllemplyees().then(function (emplist) {
        inquirer.prompt([
            {
                name: "name",
                type: "list",
                message: "Which Employee you want to delete? ",
                choices: emplist
            }
        ]).then(function (answers) {
            connection.query('DELETE from employee where first_name = ?', [answers.name]);
            inquireUserInput();
        });
    })
}

////function to view emp by department
function viewEmpByDept() {
    const { inquireUserInput } = require('./app');
    connection.query("SELECT employee.first_name AS first_name, employee.last_name AS last_name, department.name AS department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY department.id;",
        function (err, res) {
            if (err) throw err
            console.log("");
            console.table(res)
            inquireUserInput()
        })
}

//function to view employees by manager
function viewEmpByManager() {
    const { inquireUserInput } = require('./app');
    getAllemplyees().then(function (emplist) {
        inquirer.prompt([
            {
                name: "name",
                type: "list",
                message: "Select a Manager to see his team",
                choices: emplist
            }
        ]).then(function (answers) {
            var id = emplist.indexOf(answers.name) + 1;
            connection.query("SELECT employee.first_name AS first_name, employee.last_name AS last_name FROM employee where manager_id = ? ", [id],
                function (err, res) {
                    if (err) throw err
                    console.log("");
                    console.table(res)
                    inquireUserInput()
                })
        });
    })
}

//function that updates employee manager
function updateEmployeeManager() {
    const { inquireUserInput } = require('./app');
    getAllemplyees().then(function (emplist) {
        inquirer.prompt([
            {
                name: "name",
                type: "list",
                message: "Select an Employee to update his Manager",
                choices: emplist
            }
        ]).then(function (answers) {
            var empid = emplist.indexOf(answers.name) + 1;

            inquirer.prompt([
                {
                    name: "managername",
                    type: "list",
                    message: "Select his Manager",
                    choices: emplist
                }
            ]).then((ans) => {
                var managerid = emplist.indexOf(ans.managername) + 1;
                connection.query("Update employee SET manager_id = ? WHERE id = ?", [managerid, empid],
                    function (err, res) {
                        if (err) throw err
                        console.log("");
                        console.table(res)
                        inquireUserInput()
                    })
            });
        });
    })
}

//exporting all the functions to app.js
module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addADepartment,
    addARole,
    addAnEmployee,
    updateAnEmployeeRole,
    viewtotalutilisedbudget,
    deleteDepartment,
    quitConnection,
    deleteRole,
    deleteEmployee,
    viewEmpByDept,
    viewEmpByManager,
    updateEmployeeManager
};