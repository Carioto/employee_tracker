INSERT INTO dept_tbl (id, dept_name)
VALUES (10, "Lasers"),
       (11, "Repairs"),
       (12, "Exhaust Port Safety"),
       (13, "Cleaning"),
       (14, "Planetary Targeting"),
       (15, "Loyalty"),
       (16, "Sanitation");

SELECT * FROM dept_tbl;

INSERT INTO role_tbl (id, title, salary, dept_id)
VALUES (100, "Lens Polisher", 25000, 10),
       (101, "Primary Ignition Starter", 15000, 10),
       (110, "AT-AT Specialist", 45000, 11),
       (111, "Tie Specialist - Bomber", 55000, 11),
       (112, "Safety Rails Installer", 4000, 11),
       (120, "Port Closer", 2000, 12),
       (130, "Emperial Plumber", 153000, 13),
       (140, "Green In Range Lead Tech", 46000, 14),
       (150, "Social Networking Monitor", 75000, 15),
       (160, "Trash Compactor Maintainence", 44000, 16);

SELECT * FROM role_tbl;

INSERT INTO emp_tbl (id, first_name, last_name, role_id, manager_id)
VALUES  (10101,"Dom", "West", 100, NULL),
        (10102,"Joel", "Edger", 120, 10101),
        (10103,"Simon", "Peggle", 130, NULL),
        (10104,"William","Hade", 111, 10103),
        (10105,"Danny", "Craig", 150, 10103),
        (10106,"Pablo","Hardy", 160, 10101),
        (10107,"John", "Ratzen", 160, NULL),
        (10108,"Treat", "Wills", 150, 10107),
        (10109,"Julian", "Gloves", 112, 10107),
        (10110,"Anthony", "Cox", 111, 10101),
        (10111,"Keira", "Knight", 101, 10103),
        (10112,"Peter", "Serafin", 110, 10107);

SELECT * FROM emp_tbl;
SELECT 
emp_tbl.id AS 'Employee #',
CONCAT(emp_tbl.first_name," ",emp_tbl.last_name)AS Employee,
role_tbl.title AS Occupation,
manager_id AS Manager
FROM emp_tbl
INNER JOIN role_tbl ON emp_tbl.role_id = role_tbl.id

 