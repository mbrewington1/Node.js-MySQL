INSERT INTO employees (name, full_time, start_date, extension)
VALUES ("Ahmed", true, "2015-03-17", 76);

SELECT * FROM employees;

INSERT INTO employees (name, full_time)
VALUES ("Susan", false);

-- ADD SOME DUPLICATE DATA --

INSERT INTO employees (name, full_time)
VALUES ("Susan", false);

-- DELETE THAT DATA --

DELETE FROM employees
WHERE name = 'Susan';