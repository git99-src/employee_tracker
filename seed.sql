 USE employee_db;
  -- seed department --
INSERT INTO department (dept_name) VALUES ("Sales");
INSERT INTO department (dept_name) VALUES ("Engineering");
INSERT INTO department (dept_name) VALUES ("Finance");
INSERT INTO department (dept_name) VALUES ("Legal");

  -- seed roles --
INSERT INTO roles (title, salary, department_id)
VALUE ("Lead Sales", 120000, 1);
INSERT INTO roles (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2);
INSERT INTO roles (title, salary, department_id)
VALUE ("Controller", 125000, 3);
INSERT INTO roles (title, salary, department_id)
VALUE ("Lead Legal", 170000, 4);
INSERT INTO roles (title, salary, department_id)
VALUE ("Salesperson", 70000, 1);
INSERT INTO roles (title, salary, department_id)
VALUE ("Developer", 110000, 2);
INSERT INTO roles (title, salary, department_id)
VALUE ("Accountant", 65000, 3);
INSERT INTO roles (title, salary, department_id)
VALUE ("Lawyer", 120000, 4);

  -- seed employee --
INSERT INTO employee (first_name, last_name, roles_id)
VALUE ("Steve", "Jobs", 1);
INSERT INTO employee (first_name, last_name, roles_id)
VALUE ("Steve", "Wozniak", 2);
INSERT INTO employee (first_name, last_name, roles_id)
VALUE ("Warren", "Buffet", 3);
INSERT INTO employee (first_name, last_name, roles_id)
VALUE ("Ruth", "Bader", 4);
INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUE ("Alfred", "Butler", 5, 1);
INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUE ("Ellen", "Smith", 6, 2);
INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUE ("James", "Diego", 7, 3);
INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUE ("Jeremy", "Jones", 8, 4);

select * FROM department;
select * FROM roles;
select * FROM employee;