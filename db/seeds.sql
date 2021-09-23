INSERT INTO department (name)
VALUES
    ("Accounting"),
    ("Human Resources"),
    ("Tech"),
    ("Senior Management"),
    ("Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES
("Head of Accounting", "80,000", 1),
("HR Manager", "75,000", 2),
("CRS III", "50,000", 5),
("Jr Web Developer", "65,000", 3),
("CFO", "250,000", 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id,)
VALUES
("Samantha", "Richards", 1, 3 ),
("Tom", "Barns", 3, 2 );