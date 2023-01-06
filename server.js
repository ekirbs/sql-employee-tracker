const mysql = require("mysql2");
const inquirer = require("inquirer");

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
  startMenu();
});

// MAIN MENU
mainMenu = () => {
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
  const emp = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
  FROM employee
  JOIN role ON role.id = employee.role_id
  JOIN department ON department.id = role.department_id`;
  db.query(emp, (err, res) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log("")
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
      type: "input",
      message: "Enter the new Employee's job id.",
      name: "newId"
    },
    {
      type: "input",
      message: "Enter the new Employee's Manager id.",
      name: "newManagerId"
    }
  ])
  .then(answer => {
    const newEmp = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
    db.query(newEmp, [answer.newFirstName, answer.newLastName, answer.newId, answer.newManagerId], (err, res) => {
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
  const updateRole = `UPDATE`;
  db.query(updateRole, (err, res) => {
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
  const role = `SELECT * FROM role`;
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
      type: "input",
      message: "Enter the department that the new role belongs to.",
      name: "deptId"
    }
  ])
  .then(answer => {
    const newRole = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
    db.query(newRole, [answer.newTitle, answer.newSalary, answer.deptId], (err, res) => {
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
    const newDept = `INSERT INTO department (name) VALUES (?)`
    db.query(newDept, [answer.newDeptName], (err, res) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      console.log("New department added.");
      mainMenu();
    })
  });
};

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// LISTENER
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`);
  });







// Create an Employee
app.post('/api/new-employee', ({ body }, res) => {
  const sql = `INSERT INTO movies (movie_name)
    VALUES (?)`;
  const params = [body.movie_name];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// Read all movies
app.get('/api/movies', (req, res) => {
  const sql = `SELECT id, movie_name AS title FROM movies`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Delete a movie
app.delete('/api/movie/:id', (req, res) => {
  const sql = `DELETE FROM movies WHERE id = ?`;
  const params = [req.params.id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
      message: 'Movie not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Read list of all reviews and associated movie name using LEFT JOIN
app.get('/api/movie-reviews', (req, res) => {
  const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// BONUS: Update review name
app.put('/api/review/:id', (req, res) => {
  const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
  const params = [req.body.review, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Movie not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// // LISTENER
// app.listen(PORT, () => {
//   console.log(`App listening at http://localhost:${PORT} 🚀`);
//   });

// const getQuery = 'SELECT name FROM movies';
// const getReviewQuery = "SELECT * FROM reviews JOIN movies ON movies.id = reviews.movie_id;";
// const postQuery = 'INSERT INTO movies (name) VALUES ("Fast and the Furious")';

// app.get("/api/movies", (req, res) => {
//   console.log("GET request for movies.");

//   db.query(getQuery, function (err, results) {
//     if (err) {
//       console.error(err);
//       return;
//     };
//     console.table(results);
//     res.json();
//   });
// });

// app.get("/api/reviews", (req, res) => {
//   console.log("GET request for reviews.");

//   db.query(getReviewQuery, function (err, results) {
//     if (err) {
//       console.error(err);
//       return;
//     };
//       console.table(results);
//   });
// });

// app.post("/api/add-movie", (req, res) => {
//   console.log("POST request for movies.");

//   db.query(postQuery, function (err, results) {
//     if (err) {
//       console.error(err);
//       return;
//     };
//       console.table(results);
//   });
// });

// app.post("/api/update-review", (req, res) => {
//   console.log("POST request for review update.");

//   db.query('SELECT * FROM movies.name', function (err, results) {
//       console.table(results);
//   });
// });

// // Query database

// // let deletedRow = 2;

// // db.query(`DELETE FROM favorite_books WHERE id = ?`, deletedRow, (err, result) => {
// //   if (err) {
// //     console.log(err);
// //   }
// //   console.log(result);
// // });

// // // Query database
// // db.query('SELECT * FROM favorite_books', function (err, results) {
// //   console.log(results);
// // });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// // LISTENER
// app.listen(PORT, () => {
// console.log(`App listening at http://localhost:${PORT} 🚀`);
// });