const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

const logo = require('asciiart-logo');
// const config = require('./package.json');
// console.log(logo(config).render());

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
// .promise();

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
    if (answer.main === "View All Employees") {
      viewEmployees();
    } else if (answer.main === "Add Employee") {
      addEmployee();
    } else if (answer.main === "Update Employee Role") {
      updateRole();
    } else if (answer.main === "View All Roles") {
      viewRoles();
    } else if (answer.main === "Add Role") {
      addRole();
    } else if (answer.main === "View All Departments") {
      viewDepartments();
    } else if (answer.main === "Add Department") {
      addDepartment();
    } else {
      db.end();
    };
  });
};

// VIEW ALL EMPLOYEES
const viewEmployees = () => {
  // const emp = `SELECT employee.id AS "ID", employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS "Title", department.name AS "Department", role.salary AS "Salary", CASE employee.manager_id WHEN employee.manager_id THEN CONCAT (employee.first_name," ", employee.last_name) AS "Manager"
  // FROM employee
  // JOIN role ON role.id = employee.role_id
  // JOIN department ON department.id = role.department_id`;
  const emp = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
  FROM employee
  JOIN role ON role.id = employee.role_id
  JOIN department ON department.id = role.department_id`;
  db.query(emp, (err, res) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

// ADD EMPLOYEE
const addEmployee = () => {
  // const roleOptions = res.map(({ id, title, salary }) => ({
  //   value: id, title: `${title}`, salary: `${salary}`
  // }));

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
      type: "list",
      message: "Enter the new Employee's role.",
      name: "newRole",
      choices: [
      ]
      // roleOptions
      // choices: await employeeRoles(),
      // when(answers) {
      //   return answers.task === 
      // }
    },
    {
      type: "list",
      message: "Enter the new Employee's Manager.",
      name: "newManager",
      choices: [

      ]
    }
  ])
  .then(answer => {
    const newEmp = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`;
    const params = [answer.newFirstName, answer.newLastName, answer.newRole, answer.newManager];
    db.query(newEmp, params, (err, res) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      console.log("New employee added.");
      mainMenu();
    })
  });
};

// UPDATE EMPLOYEE ROLE
const updateRole = () => {
  inquirer.prompt([
    {
      type: "list",
      message: "Which employee's role would you like to update?",
      name: "empToChange",
      choices: [

      ]
    },
    {
      type: "list",
      message: "Enter the role you'd like to assign to the selected employee.",
      name: "empRole",
      choices: [

      ]
    }
  ])
  const updateRole = `UPDATE employee
  SET role_id=?
  WHERE id=?`;
  const params = [answer.role, answer.employee_id];
  db.query(updateRole, params, (err, res) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(res);
    mainMenu();
  });
};

// VIEW ALL ROLES
const viewRoles = () => {
  const role = `SELECT *
  FROM role
  JOIN department ON department.id = role.department_id`;
  db.query(role, (err, res) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(res);
    mainMenu();
  });
};

// ADD ROLE
const addRole = () => {
  db.query(
    `SELECT department.id AS "ID", department.name AS "Department", role.title AS "Role", role.salary AS "Salary", department_id AS ""`
  )
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the title of the new role.",
      name: "newTitle"
    },
    {
      type: "input",
      message: "Enter the salary of the new role.",
      name: "newSalary"
    },
    {
      type: "list",
      message: "Enter the department that the new role belongs to.",
      name: "dept",
      choices: [

      ]
    }
  ])
  .then(answer => { // department_id below?  how to change to department_id from name
    const newRole = `INSERT INTO role (title, salary, department_id)
    VALUES (?, ?, ?)`;
    const params = [answer.newTitle, answer.newSalary, answer.dept];
    db.query(newRole, params, (err, res) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      console.log("New role added.");
      mainMenu();
    })
  });
};

// VIEW ALL DEPARTMENTS
const viewDepartments = () => {
  const dep = `SELECT * FROM department`;
  db.query(dep, (err, res) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
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
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      console.log("New department added.");
      mainMenu();
    })
  });
};