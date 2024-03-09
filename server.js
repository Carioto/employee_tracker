const inquirer = require('inquirer');
const fs = require('fs/promises');
const express = require('express');
const selJob = require('./lib/select_job_q').question;


function askQ(){
inquirer.prompt(selJob).then((ans) => {
   switch(ans.task){
      case "View all departments": 
        console.log('1');
        break;
      case 'View all roles': 
        console.log('2');
        break;
      case 'View all employees': 
        console.log('3');
        break;
      case 'Add a department': 
        console.log('4');
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



askQ();