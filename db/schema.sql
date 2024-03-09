DROP DATABASE IF EXISTS emp_track_db;
CREATE DATABASE emp_track_db;
USE emp_track_db;

CREATE TABLE dept_tbl (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    dept_name VARCHAR(30)
);

CREATE TABLE role_tbl (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    dept_id INT,
    FOREIGN KEY (dept_id)
    REFERENCES dept_tbl(id)
);

CREATE TABLE emp_tbl (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role_tbl(id),
    FOREIGN KEY (manager_id)
    REFERENCES emp_tbl(id)
);

SHOW TABLES;
DESCRIBE emp_tbl;
DESCRIBE role_tbl;
DESCRIBE dept_tbl;

-- SELECT * FROM emp_tbl;
-- SELECT * FROM role_tbl;
-- SELECT * FROM dept_tbl;
