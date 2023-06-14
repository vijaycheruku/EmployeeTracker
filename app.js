//inquirer package used for questions prompting
const inquirer = require('inquirer');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addADepartment, addARole, addAnEmployee, updateAnEmployeeRole, viewtotalutilisedbudget, deleteDepartment, quitConnection, deleteRole, deleteEmployee, viewEmpByDept, viewEmpByManager, updateEmployeeManager } = require('./helper');


//initial enquirer function
function inquireUserInput() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "view all departments",
            "view all roles",
            "view all employees",
            "add a department",
            "add a role",
            "add an employee",
            "update an employee role",
            "view total utilized budget of the department",
            "Delete department",
            "Delete role",
            "Delete Employee",
            "View Employees by Department",
            "View Employees by Manager",
            "Update Employee Manager",
            "Quit"
        ],
    }).then(answer => {
        //call function as per the user provide input
        switch (answer.action) {
            case "view all departments":
                viewAllDepartments();
                break;

            case "view all roles":
                viewAllRoles();
                break;

            case "view all employees":
                viewAllEmployees();
                break;

            case "add a department":
                addADepartment();
                break;

            case "add a role":
                addARole();
                break;
            case "add an employee":
                addAnEmployee();
                break;
            case "update an employee role":
                updateAnEmployeeRole();
                break;
            case "view total utilized budget of the department":
                viewtotalutilisedbudget();
                break;
            case "Delete department":
                deleteDepartment();
                break;
            case "Delete role":
                deleteRole();
                break;
            case "Delete Employee":
                deleteEmployee();
                break;
            case "View Employees by Department":
                viewEmpByDept();
                break;
            case "View Employees by Manager":
                viewEmpByManager();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
            case "Quit":
                quitConnection();
                break;
        }
    })
}

//calling initial function on load
inquireUserInput();

module.exports = {
    inquireUserInput
};