const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "password",
  database: "employee_db",
});
connection.connect((err) => {
  if (err) {
    throw err;
  }
  return main();
});

function main() {
  // Present main prompts
  return inquirer
    .prompt({
      type: "list",
      name: "mainChoice",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Exit"
      ]
    })
    .then((answer) => {
      switch (answer.mainChoice) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Employees By Department":
          viewAllEmployeesDept();
          break;
        case "View All Employees By Manager":
          viewAllEmployeesManager();
          break;
        case "Exit":
          connection.end();
          break;
     }
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });

}


//blank function
// function main() {
//   // Present main prompts
//   return inqurier
//     .prompt({

//     })
//     .then((answser) => {
// //good stuff
// return connection query
//     })
//     .catch((error) => {
//       console.log(error);
//       process.exit(1);
//     });

// }
function viewAllEmployees() {
  // perform query for all employees and print the result in the console
  return connection.query("SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.dept_name as department, roles.salary, CONCAT(e.first_name, ' ' ,e.last_name) AS manager FROM employee INNER JOIN roles ON roles.id = employee.roles_id INNER JOIN department ON department.id = roles.department_id LEFT JOIN employee e ON e.id = employee.manager_id", (err, res) => {
    if (err) {
      throw err;
    };
    console.table(res);
    return main();
  });
};

function viewAllEmployeesDept() {
  // perform query for all employees and print the result in the console
  return connection.query("SELECT employee.id, employee.first_name, employee.last_name, department.dept_name AS department FROM employee JOIN roles ON employee.roles_id = roles.id JOIN department ON roles.department_id = department.id ORDER BY department_id", (err, res) => {
    if (err) {
      throw err;
    };
    console.table(res);
    return main();
  });
};

function viewAllEmployeesManager() {
  // perform query for all employees and print the result in the console
  return connection.query("SELECT CONCAT(e.first_name, ' ' ,e.last_name) AS manager, employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.dept_name as department FROM employee INNER JOIN roles ON roles.id = employee.roles_id INNER JOIN department ON department.id = roles.department_id LEFT JOIN employee e ON e.id = employee.manager_id ORDER BY manager", (err, res) => {
    if (err) {
      throw err;
    };
    console.table(res);
    return main();
  });
};

function exitMain() {
  // perform a select query and print the result in the console
  return connection.query("", (err, res) => {
    if (err) {
      throw err;
    };
    connection.end();
  });
};

