const inquirer = require('inquirer');
const fs = require('fs/promises');
const express = require('express');
const mysql = require('mysql2');
const { addRoleQuest,addEmpQuest,updEmpRoleQuest, question, whichDeptQuest } = require('./lib/questions');
const { pause,addDeptQuest,viewBudgetQuest } = require('./lib/questions');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
     host:'localhost',
     user:'root',
     password:'Tomatoes#663',
     database:'emp_track_db'   
    }
);


function askQ(){
inquirer.prompt(question).then((ans) => {
   switch(ans.task){
      case "View all departments": 
        viewDepts();
        break;
      case 'View all roles': 
        viewRoles();
        break;
      case 'View all employees': 
        viewEmps();
        break;
      case 'Add a department': 
        addDept();
        break;
      case 'Add a role': 
        addRole();
        break;
      case 'Add an Employee': 
        addEmp();
        break;
      case 'Update an employee role':
        updEmpRole();
        break;
      case 'View employees by department':
        viewEmpByDept();
        break;
      case 'View the budget for a department':
        viewBudget();
        break;
      case 'Exit': 
        console.log('Server disconnected .. Enter `node server.js` to restart');
        process.exit();
      default:
        console.log('didnt work');
        break;
    }
})
};

function viewDepts() {
    db.query('SELECT * FROM dept_tbl', (err, results) => {
        if (err) {
            console.log(`No table created.  Please review installation instructions.`);
        }else{
        console.table(results);
        inquirer.prompt(pause).then(() => {askQ()});
}})
};
function viewRoles() {
    db.query('SELECT * FROM role_tbl', (err, results) => {
        if (err) {
            console.log(`No table created.  Please review installation instructions.`);
            inquirer.prompt(pause).then(() => {askQ()});
        }else{
        console.table(results);
        inquirer.prompt(pause).then(() => {askQ()});
}})
};

function viewEmps() {
    db.query(`SELECT 
    emp_tbl.id AS 'Employee #',
    CONCAT(emp_tbl.first_name," ",emp_tbl.last_name)AS Employee,
    role_tbl.title AS Occupation,
    manager_id AS Manager
    FROM emp_tbl
    INNER JOIN role_tbl ON emp_tbl.role_id = role_tbl.id`, (err, results) => {
        if (err) {
            console.log(`No table created.  Please review installation instructions.`);
            inquirer.prompt(pause).then(() => {askQ()});

        }else{
            console.table(results);
            inquirer.prompt(pause).then(() => {askQ()});
}})
};

function addDept() {
    inquirer.prompt(addDeptQuest).then((ans) => {
    const insDept = ans.newDept;
    db.query(`INSERT INTO dept_tbl(dept_name) VALUES (?);`,insDept, (err, results) => {
        if (err) {
            console.log(`Error adding dpartment. Check your data and try again.`);
            inquirer.prompt(pause).then(() => {askQ()});
        }else{
            console.log(`\n\x1b[32m${insDept} \x1b[0mhas been added\n`);
            inquirer.prompt(pause).then(() => {askQ()});
    }})
    })
};

function addRole() {
    inquirer.prompt(addRoleQuest).then((ans) => {
    const insRole = ans.newRole;
    const insRoleDept = ans.newRoleDept;
    const insRoleSalary = ans.newRoleSalary;
    db.query(`INSERT INTO role_tbl(title, salary, dept_id) VALUES (?,?,?);`,[insRole,insRoleSalary,insRoleDept], (err, results) => {
        if (err) {
            console.log(`Error adding role.  Please check your data and try again`);
            inquirer.prompt(pause).then(() => {askQ()});
        }else{
            console.log(`\n\x1b[32m${insRole} \x1b[0mhas been added\n`);
            inquirer.prompt(pause).then(() => {askQ()});
    }})
    })
};

function addEmp() {
    inquirer.prompt(addEmpQuest).then((ans) => {
    const insEmpFirst = ans.newEmpFirst;
    const insEmpLast = ans.newEmpLast;
    const insEmpRole = ans.newEmpRole;
    let insEmpMgr = null;
    const temp = ans.newEmpMgr;
    if (temp){
        insEmpMgr = temp;
    }
    db.query(`INSERT INTO emp_tbl (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`,[insEmpFirst,insEmpLast,insEmpRole,insEmpMgr], (err, results) => {
        if (err) {
            console.log(`Error adding employee, check your data and try again.`);
            inquirer.prompt(pause).then(() => {askQ()});
        }else{
        console.log(`\n\x1b[32m${insEmpFirst} ${insEmpLast}\x1b[0m has been added\n`);
        inquirer.prompt(pause).then(() => {askQ()});
}})})
};

function updEmpRole() {
    inquirer.prompt(updEmpRoleQuest).then((ans) => {
       const upEmp = ans.empToUpd;
       const upEmpRole = ans.updRole;
       db.query(`UPDATE emp_tbl SET role_id = ? WHERE emp_tbl.id = ?;`,[upEmpRole,upEmp],(err, results) => {
        if (err) {
            console.log(`Error updating role.  Please review your entries and try again`);
            inquirer.prompt(pause).then(() => {askQ()});
        }else{
            console.log(`\nThe employee's role has been updated.\n`);
            inquirer.prompt(pause).then(() => {askQ()});
}})})
};
function viewEmpByDept() {
    inquirer.prompt(whichDeptQuest).then((ans) => { 
        const whichDept = ans.whichDept;

        db.query(`SELECT emp_tbl.first_name,emp_tbl.last_name,dept_tbl.dept_name
                  FROM emp_tbl 
                  JOIN role_tbl ON  emp_tbl.role_id = role_tbl.id 
                  JOIN dept_tbl ON  role_tbl.dept_id = dept_tbl.id
                  WHERE dept_tbl.id = ?;`,whichDept, (err, results) => {
                     if (err) {
                       console.log(`The custom table failed to generate.  Please review installation instructions.`);
                        inquirer.prompt(pause).then(() => {askQ()});
                     }else{
                        if (results.length === 0){
                            console.log('This department has no employees');
                            inquirer.prompt(pause).then(() => {askQ()});
                        } else {
                       console.table(results);
                       inquirer.prompt(pause).then(() => {askQ()});

    } }})
})};

function viewBudget() {
    inquirer.prompt(viewBudgetQuest).then((ans) => {
        const budDept = ans.deptBud;
        db.query(`
        SELECT SUM(salary) AS Budget FROM role_tbl
        Join emp_tbl on emp_tbl.role_id = role_tbl.id
        WHERE role_tbl.dept_id = ?;`,budDept, (err, results) => {
            if (err) {
                console.log(`Error calculating budget. Check your data and try again.`);
                inquirer.prompt(pause).then(() => {askQ()});
            }else{
                if (!results[0].Budget){
                    console.log('This deparment has no budget')
                    inquirer.prompt(pause).then(() => {askQ()});
                }else {
                    console.log(`This budget is \$${results[0].Budget}`);
                    inquirer.prompt(pause).then(() => {askQ()});
                }
        }})
        })
    };

askQ();