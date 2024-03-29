// Список SQL-запросов к БД.
export enum SqlQuery {
  createBooksTable = `CREATE TABLE books (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, year INT NOT NULL, pages INT NOT NULL, description VARCHAR(255), authors VARCHAR(255), image VARCHAR(255), views INT DEFAULT 0, clicks INT DEFAULT 0, deleted INT DEFAULT 0, removal_time BIGINT DEFAULT 0);`,
  createAuthorsTable = `CREATE TABLE book_authors (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL UNIQUE);`,
  createConnectionsTable = `CREATE TABLE connections (
  bookId INT,
  authorId INT,
  FOREIGN KEY (bookId) REFERENCES books(id) ON DELETE CASCADE,
  FOREIGN KEY (authorId) REFERENCES book_authors(id),
  PRIMARY KEY(bookId, authorId)
  ) ENGINE=INNODB;`,
  fillTheAuthorsTable = `INSERT IGNORE INTO book_authors (name)
  SELECT
    SUBSTRING_INDEX(SUBSTRING_INDEX(authors, ',', numbers.n), ',', -1) name
  FROM books
  CROSS JOIN (
    SELECT 1 n UNION ALL
    SELECT 2 UNION ALL
    SELECT 3 UNION ALL
    SELECT 4 UNION ALL
    SELECT 5
  ) numbers
  WHERE numbers.n <= LENGTH(authors) - LENGTH(REPLACE(authors, ',', '')) + 1;`,
  fillTheConnectionsTable = `INSERT INTO connections (bookId, authorId) SELECT books.id AS bookId, book_authors.id AS authorId FROM books JOIN book_authors ON books.authors LIKE CONCAT('%', book_authors.name, '%');`,
  checkBooksTable = `SHOW TABLES LIKE 'books';`,
  checkAuthorsTable = `SHOW TABLES LIKE 'book_authors';`,
  checkConnectionsTable = `SHOW TABLES LIKE 'connections';`,
  deleteBooksTable = `DROP TABLE IF EXISTS books;`,
  deleteAuthorsTable = `DROP TABLE IF EXISTS book_authors;`,
  deleteConnectionsTable = `DROP TABLE IF EXISTS connections;`,
  deleteBookById = `DELETE FROM books WHERE id = ?;`,
  markForDeletion = `UPDATE books SET deleted = 1, removal_time = ? WHERE id = ?;`,
  markForRecover = `UPDATE books SET deleted = 0, removal_time = 0 WHERE id = ?;`,
  getAllBooks = `SELECT books.* FROM books;`,
  getBooksByPage = `SELECT * FROM books LIMIT ?, ?;`,
  findBooksByName = `SELECT * FROM books WHERE name LIKE CONCAT('%', ?, '%');`,
  findBooksByNames = `SELECT * FROM books WHERE name LIKE CONCAT('%', ?, '%') 
  OR EXISTS (
    SELECT 1
    FROM book_authors
    WHERE 
        book_authors.name LIKE CONCAT('%', ?, '%') AND
        book_authors.name = books.authors
  );`,
  findBooksByNumber = `SELECT * FROM books WHERE (SELECT name FROM book_authors WHERE id = ?) LIKE books.authors OR year = ?;`,
  isItSortedById = `SELECT COUNT(*) FROM books WHERE id < (SELECT id FROM books ORDER BY id LIMIT 1);`, // проверка сортировки по полю 'id'.
  getBookById = `SELECT * FROM books WHERE id = ?;`,
  updateBookViewsById = `UPDATE books SET views = views + 1 WHERE id = ?;`,
  getLastId = `SELECT id FROM books ORDER BY id DESC LIMIT 1;`,
  incrementWantedById = `UPDATE books SET clicks = clicks + 1 WHERE id = ?;`,
  addNewBook = `INSERT INTO books (name, year, pages, description, authors, image, views, clicks, deleted) VALUES (?, ?, ?, ?, ?, ?, 0, 0, 0);`,
  addNewAuthors = `INSERT INTO book_authors (name)
  SELECT DISTINCT TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(authors, ',', numbers.n), ',', -1)) name
  FROM books
  CROSS JOIN (
      SELECT 1 n UNION ALL
      SELECT 2 UNION ALL
      SELECT 3 UNION ALL
      SELECT 4
  ) numbers
  WHERE numbers.n <= LENGTH(authors) - LENGTH(REPLACE(authors, ',', '')) + 1
    AND books.id = ?
    AND TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(authors, ',', numbers.n), ',', -1)) NOT IN (SELECT name FROM book_authors);`,
  uodateConnections = `INSERT INTO connections (bookId, authorId)
  SELECT books.id AS bookId, book_authors.id AS authorId
  FROM books
  JOIN book_authors ON books.authors LIKE CONCAT('%', book_authors.name, '%')
  WHERE books.id = ?;`,
  getBookIdsMurkedForDeletion = `SELECT books.id FROM books WHERE deleted = 1;`,
  removeUnusedAuthorsByID = `DELETE FROM book_authors WHERE id NOT IN (SELECT DISTINCT authorId FROM connections);`,
  getImageNameById = `SELECT books.image FROM books WHERE id = ?;`,
  getRemovalTimeById = `SELECT books.removal_time FROM books WHERE id = ?;`,
}
