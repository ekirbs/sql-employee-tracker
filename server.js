// DEPENDENCIES
const mysql = require("mysql2");
const inquirer = require("inquirer");
const logo = require('asciiart-logo');
require("console.table");

// DATABASE CONNECTION
const db = mysql.createConnection(
  {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

db.connect(err => {
  if (err) throw err;
  console.log("Connected to Employee Tracker.");

  console.log(
    logo({
      name: 'SQL EMPLOYEE TRACKER!!',
        font: 'Doom',
        lineChars: 10,
        padding: 2,
        margin: 3,
        borderColor: 'yellow',
        logoColor: 'bold-cyan',
        textColor: 'bold-green',
      })
      .emptyLine()
      .right('by eKirbs')
    .emptyLine()
    .render()
  );

  mainMenu();
});

// MAIN MENU
const mainMenu = () => {
  inquirer.prompt({
    type: "list",
    message: "Choose an activity.",
    name: "main",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit"
    ]
  })
  .then((answer) => {
    switch (answer.main) {
      case "View All Employees":
        viewEmployees();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "Update Employee Role":
        updateRole();
        break;

      case "View All Roles":
        viewRoles();
        break;

      case "Add Role":
        addRole();
        break;

      case "View All Departments":
        viewDepartments();
        break;

      case "Add Department":
        addDepartment();
        break;

      case "Quit":
        db.end();
        break;
    }
  })
};

// VIEW ALL EMPLOYEES
const viewEmployees = () => {
  const emp = `SELECT employee.id AS "ID",
  employee.first_name AS "First Name",
  employee.last_name AS "Last Name",
  role.title AS "Title",
  department.name AS "Department",
  role.salary AS "Salary",
  employee.manager_id AS "Manager"
  FROM employee
  JOIN role ON role.id = employee.role_id
  JOIN department ON department.id = role.department_id;`;

  db.query(emp, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

// ADD EMPLOYEE
const addEmployee = () => {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the new Employee's first name.",
      name: "newFirstName"
    },
    {
      type: "input",
      message: "Enter the new Employee's last name.",
      name: "newLastName"
    },
    {
      type: "number",
      message: "Enter the new Employee's role ID #.",
      name: "newRole"
    },
    {
      type: "number",
      message: "Enter the new Employee's Manager ID #.",
      name: "newManager"
    }
  ])
  .then(answer => {
    const newEmp = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`;
    const params = [answer.newFirstName, answer.newLastName, answer.newRole, answer.newManager];

    db.query(newEmp, params, (err, res) => {
      if (err) throw err;
      console.log("New employee added.");
      console.table(res);
      mainMenu();
    })
  });
};

// UPDATE EMPLOYEE ROLE
const updateRole = () => {
  inquirer.prompt([
    {
      type: "number",
      message: "Enter the ID # of the employee who's role would you like to update.",
      name: "empToChange"
    },
    {
      type: "number",
      message: "Enter the role ID # you'd like to assign to the selected employee.",
      name: "empRole"
    }
  ])
  .then(answer => {
    const updateRole = `UPDATE employee
    SET role_id = ?
    WHERE id = ?`;
    const params = [answer.empRole, answer.empToChange];

    db.query(updateRole, params, (err, res) => {
      if (err) throw err;
      console.log("Employee role update.");
      console.table(res);
      mainMenu();
    })
  });
};

// VIEW ALL ROLES
const viewRoles = () => {
  const role = `SELECT role.id AS "ID",
  role.title AS "Title",
  department.name AS "Department",
  role.salary AS "Salary"
  FROM role
  JOIN department ON department.id = role.department_id`;

  db.query(role, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

// ADD ROLE
const addRole = () => {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the title of the new role.",
      name: "newTitle"
    },
    {
      type: "number",
      message: "Enter the salary of the new role.",
      name: "newSalary"
    },
    {
      type: "number",
      message: "Enter the department ID # that the new role belongs to.",
      name: "dept"
    }
  ])
  .then(answer => {
    const newRole = `INSERT INTO role (title, salary, department_id)
    VALUES (?, ?, ?)`;
    const params = [answer.newTitle, answer.newSalary, answer.dept];

    db.query(newRole, params, (err, res) => {
      if (err) throw err;
      console.log("New role added.");
      console.table(res);
      mainMenu();
    })
  });
};

// VIEW ALL DEPARTMENTS
const viewDepartments = () => {
  const dep = `SELECT department.id AS "ID",
  department.name AS "Department"
   FROM department`;

  db.query(dep, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

// ADD DEPARTMENT
const addDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the name of the new department.",
      name: "newDeptName"
    }
  ])
  .then(answer => {
    const newDept = `INSERT INTO department (name)
    VALUES (?)`
    const params = [answer.newDeptName];

    db.query(newDept, params, (err, res) => {
      if (err) throw err;
      console.log("New department added.");
      console.table(res);
      mainMenu();
    })
  });
};