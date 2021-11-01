const inquirer = require('inquirer');
const mysql = require('mysql2');


const db = mysql.createConnection(
    {
        user: 'root',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

db.query('SELECT * FROM employee_db', function (err, results) {
    if (err) return console.log(err);
    res.json();
 });

const initiateApplication = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'begin',
            message: "Please select an action to begin",
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add An Employee',
                'Update an employee role',
                'Exit'
            ]
        }

    ]).then((response) => {
        switch (response.begin) {
            case 'View All Departments':
                viewDep();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployee();
                break;
            case 'Exit':
                console.log('You have exited the application');
                break;
        }
    }).catch((err) => {
        console.log(err);
    })

};
initiateApplication();

function viewDep() {
    db.query(`SELECT * FROM department`, (err, res) => {
        if (err) {
            console.log(err);
        }
    });
}


function viewRoles() {
    db.query(`SELECT * FROM role`, (err, res) => {
        if (err) {
            console.log(err);
        }
    });
}

function viewEmployees() {
    db.query(`SELECT 
    employee.id, employee.first_name, employee.last_name,
    role.title AS title, department.name AS department, role.salary,
    CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee AS manager
    ON employee.manager_id = manager.id
    JOIN role
    ON employee.role_id = role.id
    JOIN department
    ON role.department_id = department.id
    ;`
    
    , (err, res) => {
        if (err) {
            console.log(err);
        }
    });
}

function addEmployee() {
db.query(`

SELECT * FROM role;
SELECT * FROM employee`, (err,res)=> {
    if (err) return console.log(err);
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'Enter First Name'
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'Enter LAst Name'
        },
        {
            name: 'frole',
            type: 'input',
            message: 'What is your role'
        },
        {
            name: 'manager',
            type: 'input',
            message: 'Who is their manager'
        },
    ]).then((data => {
        db.query
    }))
})
}

function updateEmployee() {

}




