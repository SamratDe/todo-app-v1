-- What I did in terms of SQL

-- creating database
CREATE DATABASE todo;

-- creating a table inside the database
CREATE TABLE todotable(
	id SERIAL PRIMARY KEY,
	description VARCHAR(255)
)

-- inserting data into the database
INSERT INTO todo (description) VALUES ('hello world');

-- fetching data from the database
SELECT * FROM todo;

-- fetching data from particular database entry
SELECT * FROM todo WHERE id = 3;

-- updating database entry
UPDATE todo SET description = 'bye world' WHERE id = 3;

-- deleting the database entry
DELETE FROM todo WHERE id = 3;