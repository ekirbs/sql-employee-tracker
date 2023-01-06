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




SELECT movies.movie_name AS movie, reviews.review
FROM reviews
JOIN movies ON movies.id = reviews.movie_id;

SELECT favorite_books.book_name AS name, book_prices.price AS price
FROM favorite_books
JOIN book_prices ON favorite_books.book_price = book_prices.id;



function getConstraint() {
  return 'first_name'
}
let firstConstraint = 'first_ame';
let 2ndConstraint = 'last_name'

inquirer.prompt([{
  type:'list',
  choices: ['select what 2 things from where by what']
}]).then(answers => {
  if (answers.answer === 'select what 2 things from where by what') {
    getStuff();
  }
})
db.query('select ??, ?? from employee where ?? = ?', [getConstraint(), 2ndConstraint, 2ndConstraint, 'pablo'"])
select first_name, last_name from employee where last_name = "pablo"
-- ?? is column name, ? is data point

function getStuff() {
  inquirer.prompt([{
    type: 'input',
    message: 'What is the first column you want to query?'
    name: 'first_column'
  },
  {
  type: 'input',
    message: 'What is the second column you want to query?'
    name: 'second_column'
  },
  {
  type: 'input',
    message: 'What is the where column you want to query?'
    name: 'where_column'
  },
  {
  type: 'input',
    message: 'What is the value of the where you want to query?'
    name: 'what_in_where'
  }
    ]).then(answers => {
      let preparedArray = [ansdwers.first_column, answers.second_column, answers.where_column, answers.what_in_where];
      db.query('select ??, ?? form employeee where ?? = ?', preparedArray, function(err, data)
      {
        console.table(data);
        init();
      })
    })
}

SELECT movies.movie_name AS movie, reviews.review
FROM reviews
LEFT JOIN movies
ON reviews.movie_id = movies.id
ORDER BY movies.movie_name;
