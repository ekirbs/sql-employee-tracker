SELECT employee.id AS ID,
employee.first_name AS "First Name",
employee.last_name AS "Last Name",
role.title AS "Title",
department.name AS "Department",
role.salary AS "Salary",
CASE employee.manager_id
THEN CONCAT (employee.first_name," ", employee.last_name) AS "Manager"
-- employee.manager_id AS "Manager"
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