const inquirer = require('inquirer');
const mysql = require('mysql2');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);



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
    db.query(`SELECT * FROM employee`, (err, res) => {
        if (err) {
            console.log(err);
        }
    });
}

function addEmployee() {

}

function updateEmployee() {

}



// db.query('SELECT * FROM employee_db', function (err, results) {
//     if (err) return console.log(err);
//     res.json();
// });
