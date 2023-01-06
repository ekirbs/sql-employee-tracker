SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
FROM employee
JOIN role ON role.id = employee.role_id
JOIN department ON department.id = role.department_id;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (?, ?, ?, ?);

UPDATE employee
SET role_id=?
WHERE id=?;

SELECT *
FROM role
JOIN department ON department.id = role.department_id;

INSERT INTO role (title, salary, department_id)
VALUES (?, ?, ?);

SELECT * FROM department;

INSERT INTO department (name)
VALUES (?);