
const question = [   {
    type: 'list',
    name: 'task',
    message: "Please select a task:",
    choices: [
      {
        name:'View all departments',
      },
      {
        name:'View all roles',
      },
      {
       name:'View all employees',
      },
      {
        name:'Add a department',
       },
       {
        name:'Add a role',
       },
       {
        name:'Add an Employee',
       },
       {
        name:'Update an employee role',
       }
  ]
}

]

module.exports = {
    question:question
};