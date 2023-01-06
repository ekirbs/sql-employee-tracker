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