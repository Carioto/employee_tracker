const inquirer = require('inquirer');
const fs = require('fs/promises');
const express = require('express');
const mysql = require('mysql2');
const { addRoleQuest } = require('./lib/questions');
const { addEmpQuest } = require('./lib/questions');
const { updEmpRoleQuest } = require('./lib/questions');
const { pause } = require('./lib/questions');
const selJob = require('./lib/questions').question;
const addDeptQ = require('./lib/questions').addDeptQuest;
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
inquirer.prompt(selJob).then((ans) => {
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
      case 'Exit': 
        console.log('Server disconnected .. `node server.js` to restart');
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
            console.log(`whoops ${err}`);
        }
        console.log(results);
        inquirer.prompt(pause).then(() => { askQ()});
    })
};
function viewRoles() {
    db.query('SELECT * FROM role_tbl', (err, results) => {
        if (err) {
            console.log(`whoops ${err}`);
            inquirer.prompt(pause).then(() => { askQ()});
        }
        console.log(results);
        inquirer.prompt(pause).then(() => { askQ()});
    })
};

function viewEmps() {
    db.query('SELECT * FROM emp_tbl', (err, results) => {
        if (err) {
            console.log(`whoops ${err}`);
        }
        console.log(results);
        inquirer.prompt(pause).then(() => { askQ()});
    })
};

function addDept() {
    inquirer.prompt(addDeptQ).then((ans) => {
    const insDept = ans.newDept;
    db.query(`INSERT INTO dept_tbl(dept_name) VALUES (?);`,insDept, (err, results) => {
        if (err) {
            console.log(`whoops ${err}`);
        }
        console.log(results);
        inquirer.prompt(pause).then(() => { askQ()});
})
    })
};

function addRole() {
    inquirer.prompt(addRoleQuest).then((ans) => {
    const insRole = ans.newRole;
    const insRoleDept = ans.newRoleDept;
    const insRoleSalary = ans.newRoleSalary;
    db.query(`INSERT INTO role_tbl(title, salary, dept_id) VALUES (?,?,?);`,[insRole,insRoleSalary,insRoleDept], (err, results) => {
        if (err) {
            console.log(`whoops ${err}`);
        }
        console.log(results);
        inquirer.prompt(pause).then(() => { askQ()});
})
    })
};

function addEmp() {
    inquirer.prompt(addEmpQuest).then((ans) => {
    const insEmpFirst = ans.newEmpFirst;
    const insEmpLast = ans.newEmpLast;
    const insEmpRole = ans.newEmpRole;
    const insEmpMgr = ans.newEmpMgr;
    db.query(`INSERT INTO emp_tbl(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`,[insEmpFirst,insEmpLast,insEmpRole,insEmpMgr], (err, results) => {
        if (err) {
            console.log(`whoops ${err}`);
        }
        console.log(results);
        inquirer.prompt(pause).then(() => { askQ()});
})})
};

function updEmpRole() {
    inquirer.prompt(updEmpRoleQuest).then((ans) => {
       const upEmp = ans.empToUpd;
       const upEmpRole = ans.updRole;
       db.query(`UPDATE emp_tbl SET role_id = ? WHERE emp_tbl.id = ?;`,[upEmpRole,upEmp],(err, results) => {
        if (err) {
            console.log(`whoops ${err}`);
        }
        console.log(results);
        inquirer.prompt(pause).then(() => { askQ()});
})})
};

askQ();