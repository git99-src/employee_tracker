  -- seed department --
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Legal");

  -- seed role --
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Sales", 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Controller", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Lead", 170000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 70000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Developer", 110000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 65000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 120000, 4);

  -- seed employee --
INSERT INTO employee (first_name, last_name, role_id)
VALUE ("Steve", "Jobs", 1);
INSERT INTO employee (first_name, last_name, role_id)
VALUE ("Steve", "Wozniak", 2);
INSERT INTO employee (first_name, last_name, role_id)
VALUE ("Warren", "Buffet", 3);
INSERT INTO employee (first_name, last_name, role_id)
VALUE ("Ruth", "Bader", 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Alfred", "Butler", 5, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Ellen", "Smith", 6, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("James", "Diego", 7, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Jeremy", "Jones", 8, 4);

select * FROM department;
select * FROM role;
select * FROM employee;