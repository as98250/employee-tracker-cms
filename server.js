const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = inquirer();


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

initiateApplication();

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
        initiateApplication();
    })

};

function viewDept() {
    db.query(`SELECT * FROM department`, (err, results) => {
        if (err) {
            console.log(err);
        } res.json();
    });
}


function viewRoles() {
    db.query(`SELECT * FROM role`, (err, results) => {
        if (err) {
            console.log(err);
        } res.json();
    });
}

function viewEmployees() {
    db.query(`SELECT * FROM employee`, (err, results) => {
        if (err) {
            console.log(err);
        } res.json();
    });
}

function addEmployee() {
    
}

function updateEmployee() {

}



db.query('SELECT * FROM employee_db', function (err, results) {
    if (err) return console.log(err);
    res.json();
});

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});