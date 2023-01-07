-- VIEW ALL EMPLOYEES
SELECT employee.id AS "ID",
employee.first_name AS "First Name",
employee.last_name AS "Last Name",
role.title AS "Title",
department.name AS "Department",
role.salary AS "Salary",
-- CASE employee.manager_id
-- THEN CONCAT (employee.first_name," ", employee.last_name) AS "Manager"
employee.manager_id AS "Manager"
FROM employee
JOIN role ON role.id = employee.role_id
JOIN department ON department.id = role.department_id;

-- ADD EMPLOYEE
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (?, ?, ?, ?);

-- UPDATE EMPLOYEE ROLE
UPDATE employee
SET role_id = ?
WHERE id = ?;

-- VIEW ALL ROLES
SELECT role.id AS "ID",
role.title AS "Title",
department.name AS "Department",
role.salary AS "Salary"
FROM role
JOIN department ON department.id = role.department_id;

-- ADD ROLE
INSERT INTO role (title, salary, department_id)
VALUES (?, ?, ?);

-- VIEW ALL DEPARTMENTS
SELECT department.id AS "ID",
department.name AS "Department"
 FROM department;

-- ADD DEPARTMENT
INSERT INTO department (name)
VALUES (?);



DELETE FROM employee
WHERE id = ?;

DELETE FROM department
WHERE id = ?;

DELETE FROM role
WHERE id = ?;



SELECT e.id AS ID,
e.first_name AS "First Name",
e.last_name AS "Last Name",
e.role_id AS "Title",
d.name AS "Department",
r.salary AS "Salary",
CONCAT (m.first_name," ", m.last_name) AS "Manager"
FROM employee e
LEFT JOIN employee m
ON e.manager_id = m.id
LEFT JOIN role return
ON e.role_id = r.title
LEFT JOIN department d
ON r.department_id = d.id