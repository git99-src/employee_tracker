const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");
let deptArray = [];

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
      message: "What Would You Like To Do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Roles",
        "View All Employees By Manager",
        "View Departments",
        "View Roles",
        "Add A New Department",
        "Add A New Role",
        "Add A New Employee",
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
        case "View All Employees By Roles":
          viewAllEmployeesRoles();
          break;
        case "View All Employees By Manager":
          viewAllEmployeesManager();
          break;
        case "View Departments":
          viewDepartments();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "Add A New Department":
          addNewDept();
          break;
        case "Add A New Role":
          addNewRole();
          break;
        case "Add A New Employee":
          addNewEmployee();
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
  // perform query for all employees order by department and print the result in the console
  return connection.query("SELECT department.dept_name AS department, employee.first_name, employee.last_name FROM employee JOIN roles ON employee.roles_id = roles.id JOIN department ON roles.department_id = department.id ORDER BY department_id", (err, res) => {
    if (err) {
      throw err;
    };
    console.table(res);
    return main();
  });
};

function viewAllEmployeesRoles() {
  // perform query for all employees order by roles and print the result in the console
  return connection.query("SELECT roles.title, employee.first_name, employee.last_name FROM employee INNER JOIN roles ON roles.id = employee.roles_id ORDER BY roles_id", (err, res) => {
    if (err) {
      throw err;
    };
    console.table(res);
    return main();
  });
};

function viewAllEmployeesManager() {
  // perform query for all employees order by manager and print the result in the console
  return connection.query("SELECT CONCAT(e.first_name, ' ' ,e.last_name) AS manager, employee.first_name, employee.last_name, roles.title FROM employee INNER JOIN roles ON roles.id = employee.roles_id INNER JOIN department ON department.id = roles.department_id LEFT JOIN employee e ON e.id = employee.manager_id ORDER BY manager", (err, res) => {
    if (err) {
      throw err;
    };
    console.table(res);
    return main();
  });
};

function viewDepartments() {
  // perform query departments and print the result in the console
  return connection.query("SELECT department.dept_name AS department FROM department", (err, res) => {
    if (err) {
      throw err;
    };
    console.table(res);
    return main();
  });
};

function viewRoles() {
  // perform query roles and print the result in the console
  return connection.query("SELECT roles.title, roles. salary FROM roles", (err, res) => {
    if (err) {
      throw err;
    };
    console.table(res);
    return main();
  });
};

function addNewDept() {
  // Add new department to department table - prompt user for department
  return inquirer
    .prompt([
      {
        name: "deptInput",
        type: "input",
        message: "Which Department Would You Like To Add?",
      },
    ])
    .then((answer) => {
      // when finished prompting, add new department to table
      return connection.query("INSERT INTO department (dept_name) VALUES (?)", [answer.deptInput], (err, res) => {
        if (err) {
          throw err;
        }
        console.log("The department " + answer.deptInput + " was added successfully");
        return main();
      });
    });
};

function addNewRole() {
  // Add new role to role table - need to query department for user selection
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) {
      throw err;
    };
    // set the prompt department names with the department name returned from query
    const deptNames = res.map((row) => row.dept_name);

    return inquirer
      .prompt([
        {
          name: "roleTitle",
          type: "input",
          message: "What Title Would You Like To Give To This New Employee Role?",
        },
        {
          name: "roleSalary",
          type: "input",
          message: "What Salary Would You Like To Give To This New Employee Role?",
        },
        {
          name: "choice",
          type: "rawlist",
          choices: deptNames,
          message: "What Department Would You Like To Give To This New Employee Role?",
        },
      ])
      .then((answer) => {
        //get the department chosen 
        const chosenDept = res.find(
          (row) => row.dept_name === answer.choice
        );
        return connection.query("INSERT INTO roles SET ?", { title: answer.roleTitle, salary: answer.roleSalary, department_id: chosenDept.id }, (err, res) => {
          if (err) {
            throw err;
          }
          console.log("The role " + answer.roleTitle + " was added successfully");
          return main();
        }
        );
      });

  });
};
function addNewEmployee() {
   // Add new employee to employee table - need to query roles for user selection
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) {
      throw err;
    };

    const roleNames = res.map((row) => row.title);

    return inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What Is The First Name Of The New Employee?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What Is The Last Name Of The New Employee?",
        },
        {
          name: "choice",
          type: "rawlist",
          choices: roleNames,
          message: "What Will Be The Role For The New Employee?",
        },
      ])
      .then((answer) => {
        //get the role chosen
        const chosenRole = res.find(
          (row) => (row.title) === answer.choice
        );
        return connection.query("INSERT INTO employee SET ?", { first_name: answer.firstName, last_name: answer.lastName, roles_id: chosenRole.id }, (err, res) => {
          if (err) {
            throw err;
          }
          console.log("The role " + answer.firstName + " " + answer.lastName + " was added successfully");
          return main();
        }
        );
      });

  });
};
