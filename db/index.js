// DEPENDENCIES
const connection = require('./connection.js');

// CLASS CONSTRUCTOR
class companyDatabase {
  constructor(connection) {
    this.connection = connection;
  }

  viewEmployees() {
    return this.connection.promise().query(
      `SELECT employee.id AS "ID",
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
      ON manager.id = employee.manager_id;`
    );
  };

  viewManagers() {
    return this.connection.promise().query(
      `SELECT employee.id AS "ID",
      CONCAT (employee.first_name," ", employee.last_name) AS "Managers",
      role.title AS "Title",
      department.name AS "Department",
      role.salary AS "Salary"
      FROM employee
      LEFT JOIN role
      ON employee.role_id = role.id
      LEFT JOIN department
      ON role.department_id = department.id
      WHERE employee.manager_id IS NULL;`
    );
  };

  viewRoles() {
    return this.connection.promise().query(
      `SELECT role.id AS "ID",
      role.title AS "Title",
      department.name AS "Department",
      role.salary AS "Salary"
      FROM role
      JOIN department ON department.id = role.department_id;`
    );
  };

  viewDepartments() {
    return this.connection.promise().query(
      `SELECT department.id AS "ID",
      department.name AS "Department"
      FROM department;`
    );
  };

  addEmployee(employee) {
    return this.connection.promise().query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (?, ?, ?, ?)`, [employee.newFirstName, employee.newLastName, employee.newRole, employee.newManager]);
  };

  addRole(role) {
    return this.connection.promise().query(
      `INSERT INTO role (title, salary, department_id)
      VALUES (?, ?, ?);`, [role.newTitle, role.newSalary, role.dept]);
  };

  addDepartment(department) {
    return this.connection.promise().query(
      `INSERT INTO department (name)
      VALUES (?);`, department.newDeptName);
  };

  updateRole(role) {
    return this.connection.promise().query(
      `UPDATE employee
      SET role_id = ?
      WHERE id = ?`, [role.empRole, role.empToChange]);
  };

  

  viewRoleTitle() {
    return this.connection.promise().query(
      `SELECT role.title
      FROM role;`
    );
  };

  deleteEmployee(employee) {
    return this.connection.promise().query(
      `DELETE FROM employee
      WHERE id = ?`, employee.empToDelete
    );
  };

};

module.exports = new companyDatabase(connection);