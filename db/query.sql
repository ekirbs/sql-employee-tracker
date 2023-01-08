-- VIEW ALL EMPLOYEES
SELECT employee.id AS "ID",
employee.first_name AS "First Name",
employee.last_name AS "Last Name",
role.title AS "Title",
department.name AS "Department",
role.salary AS "Salary",
CONCAT (manager.first_name," ", manager.last_name) AS "Manager"
FROM employee
LEFT JOIN role
ON employee.role_id = role.id
LEFT JOIN department
ON role.department_id = department.id
LEFT JOIN employee manager
ON manager.id = employee.manager_id;

-- VIEW MANAGERS
SELECT employee.id AS "ID",
CONCAT (employee.first_name," ", employee.last_name) AS "Managers",
role.title AS "Title",
department.name AS "Department",
role.salary AS "Salary"
FROM employee
LEFT JOIN role
ON employee.role_id = role.id
LEFT JOIN department
ON role.department_id = department.id
WHERE employee.manager_id IS NULL;

-- ADD EMPLOYEE
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (?, ?, ?, ?);

-- UPDATE EMPLOYEE ROLE
UPDATE employee
SET role_id = ?
WHERE id = ?;

-- UPDATE EMPLOYEE MANAGER
UPDATE employee
SET manager_id = ?
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

-- DELETE EMPLOYEE
DELETE FROM employee
WHERE id = ?;

-- DELETE ROLE
DELETE FROM role
WHERE id = ?;

-- DELETE DEPARTMENT
DELETE FROM department
WHERE id = ?;


-- WIP
SELECT role.title
FROM role;