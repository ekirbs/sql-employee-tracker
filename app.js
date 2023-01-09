// DEPENDENCIES
const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const connection = require("./db/index.js");
require("console.table");

// LOGO & MAIN MENU CALL
function init() {
  const logoDisplay = 
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
  .render();
  
  console.log(logoDisplay);
  
  mainMenu();
};

// MAIN MENU
function mainMenu() {
  prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "main",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPS"
        },
        {
          name: "View Managers",
          value: "VIEW_MNGRS"
        },
        {
          name: "Add Employee",
          value: "ADD_EMP"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_ROLE"
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_MNGR"
        },
        {
          name: "Delete Employee",
          value: "DELETE_EMP"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        {
          name: "Delete Role",
          value: "DELETE_ROLE"
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPTS"
        },
        {
          name: "Add Department",
          value: "ADD_DEPT"
        },
        {
          name: "Delete Department",
          value: "DELETE_DEPT"
        },
        {
          name: "Quit",
          value: "QUIT"
        }      
      ]
    }
  ]).then((answer) => {
    switch (answer.main) {
      case "VIEW_EMPS":
        viewAllEmployees();
        break;
      case "VIEW_MNGRS":
        viewAllManagers();
        break;
      case "ADD_EMP":
        addNewEmployee();
        break;
      case "UPDATE_ROLE":
        updateEmpRole();
        break;
      case "UPDATE_MNGR":
        updateEmpMngr();
        break;
      case "DELETE_EMP":
        deleteEmp();
        break;
      case "VIEW_ROLES":
        viewAllRoles();
        break;
      case "ADD_ROLE":
        addNewRole();
        break;
      case "DELETE_ROLE":
        deleteEmpRole();
        break;
      case "VIEW_DEPTS":
        viewAllDepartments();
        break;
      case "ADD_DEPT":
        addNewDepartment();
        break;
      case "DELETE_DEPT":
          deleteEmpDept();
          break;
      default:
        quit();
    }
  })
};

// VIEW ALL EMPLOYEES
function viewAllEmployees() {
  connection.viewEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => mainMenu());
};

// VIEW ALL MANAGERS
function viewAllManagers() {
  connection.viewManagers()
    .then(([rows]) => {
      let managers = rows;
      console.log("\n");
      console.table(managers);
    })
    .then(() => mainMenu());
};

// ADD EMPLOYEE
function addNewEmployee() {
  prompt([
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
  .then(res => {
    let employee = res;
    connection.addEmployee(employee)
      .then(() => console.log(`Added ${employee.newFirstName} to the database.`))
      .then(() => mainMenu())
  })
};

// UPDATE EMPLOYEE ROLE
function updateEmpRole() {
  prompt([
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
  .then(res => {
    let role = res;
    connection.updateRole(role)
      .then(() => console.log(`Updated role of employee ${role.empToChange} the database.`))
      .then(() => mainMenu())
  })
};

// UPDATE EMPLOYEE MANAGER
function updateEmpMngr() {
  prompt([
    {
      type: "number",
      message: "Enter the ID # of the employee who's manager would you like to update.",
      name: "empToChange"
    },
    {
      type: "number",
      message: "Enter the manager ID # you'd like to assign to the selected employee.",
      name: "empMngr"
    }
  ])
  .then(res => {
    let mngr = res;
    connection.updateMngr(mngr)
      .then(() => console.log(`Updated manager of employee ${mngr.empToChange} the database.`))
      .then(() => mainMenu())
  })
};

// DELETE EMPLOYEE
function deleteEmp() {
  prompt([
    {
      type: "number",
      message: "Enter the ID # of the employee you'd like to delete.",
      name: "empToDelete"
    }
  ])
  .then(res => {
    let employee = res;
    connection.deleteEmployee(employee)
      .then(() => console.log(`Deleted employee ${employee.empToDelete} from the database.`))
      .then(() => mainMenu())
  })
};

// VIEW ALL ROLES
function viewAllRoles() {
  connection.viewRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => mainMenu());
};

// ADD ROLE
function addNewRole() {
  prompt([
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
      message: "Choose the department ID that the new role belongs to.",
      name: "newDept"
    }
  ])
  .then(res => {
    let role = res;
    connection.addRole(role)
    .then(() => console.log(`Added ${role.newTitle} to the database.`))
    .then(() => mainMenu())
  })
};

// DELETE ROLE
function deleteEmpRole() {
  prompt([
    {
      type: "number",
      message: "Enter the ID # of the role you'd like to delete.",
      name: "roleToDelete"
    }
  ])
  .then(res => {
    let role = res;
    connection.deleteRole(role)
      .then(() => console.log(`Deleted role ${role.roleToDelete} from the database.`))
      .then(() => mainMenu())
  })
};

// VIEW ALL DEPARTMENTS
function viewAllDepartments() {
  connection.viewDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => mainMenu());
};

// ADD DEPARTMENT
function addNewDepartment() {
  prompt([
    {
      type: "input",
      message: "Enter the name of the new department.",
      name: "newDeptName"
    }
  ])
  .then(res => {
    let department = res;
    connection.addDepartment(department)
      .then(() => console.log(`Added ${department.newDeptName} to the database.`))
      .then(() => mainMenu())
  })
};

// DELETE DEPARTMENT
function deleteEmpDept() {
  prompt([
    {
      type: "number",
      message: "Enter the ID # of the department you'd like to delete.",
      name: "deptToDelete"
    }
  ])
  .then(res => {
    let dept = res;
    connection.deleteDept(dept)
      .then(() => console.log(`Deleted department ${dept.deptToDelete} from the database.`))
      .then(() => mainMenu())
  })
};

// QUIT
function quit() {
  console.log("Goodbye!!");
  process.exit();
}

// INITIALIZE FUNCTION
init();


// EXP ADD ROLE
// function addNewRole() {
//   connection.viewDeptName()
//   .then(([rows]) => {
//     let departments = rows;
//     console.log(departments);
//     prompt([
//       {
//         type: "input",
//         message: "Enter the title of the new role.",
//         name: "newTitle"
//       },
//       {
//         type: "number",
//         message: "Enter the salary of the new role.",
//         name: "newSalary"
//       },
//       {
//         type: "list",
//         message: "Choose the department that the new role belongs to.",
//         name: "dept",
//         choices: () => departments.map((department) => {
//           return {
//             value: department.id,
//             name: department.name
//           }
//         })
//       }
//     ])
//   })
//   .then(res => {
//     let role = res;
//     connection.addRole(role)
//     .then(() => console.log(`Added ${role.newTitle} to the database.`))
//     .then(() => mainMenu())
//   })
// };