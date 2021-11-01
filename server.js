const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localost',
        user: 'root',
        password: '',
        database: 'employee_db',
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
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            // case 'Update an employee role':
            //     updateEmployee();
            //     break;
            case 'Exit':
                console.log('Use CTRL+C to end the program');
                break;
        } return;
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
        const queryStr = `
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUEs (?,?,?,?)
        `;
        const params = [data.first_name, data.last_name, data.role_id, data.manager_id];

        db.query(queryStr, params, (err) => {
            if (err) throw err;
            }
        )
    }))
})
}

function addRole(){
    inquirer.prompt([
        {
            name: 'role_title',
            type: 'input',
            message: 'Current role?'
          },
          {
            name: 'role_salary',
            type: 'input',
            message: 'Current yearly salary?'
          },
          {
            name: 'department_id',
            type: 'input',
            message: 'What is the department ID?'
          }
    ]).then((data => {
        const queryStr = `
        INSERT INTO role (role_title, role_salary, department_id)
        VALUEs (?,?,?)
        `;
        const params = [data.role_title, data.role_salary, data.department_id];

        db.query(queryStr, params, (err) => {
            if (err) throw err;
            }
        )
    }))
}






