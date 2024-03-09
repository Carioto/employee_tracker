const inquirer = require('inquirer');
const fs = require('fs/promises');
const express = require('express');
const mysql = require('mysql2');
const selJob = require('./lib/select_job_q').question;
const addDeptQ = require('./lib/select_job_q').addDeptQuest;
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
        console.log('5');
        break;
      case 'Add an Employee': 
        console.log('6');
        break;
      case 'Update an employee role': 
        console.log('7');
        break;
      default:
        console.log('didnt work');
        break;
    }
}
)};

function viewDepts() {
    db.query('SELECT * FROM dept_tbl', (err, results) => {
        if (err) {
            console.log(`whoops ${err}`);
        }
        console.log(results);
    })
};
function viewRoles() {
    db.query('SELECT * FROM role_tbl', (err, results) => {
        if (err) {
            console.log(`whoops ${err}`);
        }
        console.log(results);
    })
};

function viewEmps() {
    db.query('SELECT * FROM emp_tbl', (err, results) => {
        if (err) {
            console.log(`whoops ${err}`);
        }
        console.log(results);
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

})
    })
};


askQ();