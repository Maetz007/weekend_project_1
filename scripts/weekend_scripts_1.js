var employeeTable = [];  // creates an empty array for our main function
var monthlySalary = 0;   // create a variable to hold the monthly avg
var employeeList = [];   // create a place holder array
var totalSalary = 0;     // Holds total salary for use later
var employeeOutputTotal = [];

var employeeInfo = function (){

  // retrieves user input to fill in our employee object
  var firstName = document.getElementById('nameFirst').value;
  var lastName = document.getElementById('nameLast').value;
  var employeeNum = (document.getElementById('idEmployee').value);
  var jobTitle = document.getElementById('titleJob').value;
  var yearlySalary = document.getElementById('salaryYearly').value;

  // creates the employee object
  var employeeObject = {
    'nameF': firstName,
    'nameL': lastName,
    'idNum': employeeNum,
    'jobTi': jobTitle,
    'yrSal': yearlySalary
  };

  employeeTable.push(employeeObject); // fills the employee object
  employeeOuputInfo();
  calcMonthlySalary();
  clearForm("employeeInput"); // empties the user input fields
};

// clears and displays the last input from the user
var employeeOuputInfo = function(){
  for (var i = 0; i < employeeTable.length; i++) {
    document.getElementById('outputLineOne').innerHTML = ""; // clears the location of any inputs within the named div
    document.getElementById('outputLineFour').innerHTML = "";

    var employeeOutputLast = 'Last employee inputed: ' + employeeTable[i].nameF + ' ' +
      employeeTable[i].nameL + '--  Employee ID Number #' + employeeTable[i].idNum + '. Job Title- ' +
      '"' + employeeTable[i].jobTi + '."' + ' Yearly salary = $' + employeeTable[i].yrSal;

    employeeOutputTotal = employeeOutputTotal + 'Name: ' + employeeTable[i].nameF + ' ' + employeeTable[i].nameL + ' Id: #' +
      employeeTable[i].idNum + ' Job: ' + employeeTable[i].jobTi + ' Salary: $' + employeeTable[i].yrSal + "<br>";


    document.getElementById('outputLineOne').innerHTML += "<p>" + employeeOutputLast + "</p>"; // returns array info to named div
    document.getElementById('outputLineFour').innerHTML = "<p>" + employeeOutputTotal + "</p>";
  }
};

// clears and returns the adjusted yearly salary amount inputed to show monthly expense
var calcMonthlySalary = function(){
  document.getElementById('outputLineTwo').innerHTML = "";
  var salaryNum = parseInt(document.getElementById('salaryYearly').value); // takes user input and converts to a number
  totalSalary = totalSalary + salaryNum; // updates the total salary global variable
  monthlySalary = totalSalary / 12;

  document.getElementById('outputLineTwo').innerHTML += "<p>" + " Total salary of all employees per month = " +
    monthlySalary.toLocaleString("en-US", {style: 'currency', currency: 'USD'}) + "</p>";
};

// looks for an employee by first and last name to delete, including the adjusted salary amount of that employee
var deleteEmployee = function(){
  var removeEmployee = document.getElementById("employeeDelete").value;
  employeeList = employeeTable;
  for (var i = 0; i < employeeList.length; i++) {

    if (employeeList[i].idNum == removeEmployee){ // looks to match ID# to remove employee
      var monthlySalaryDelete = employeeList[i].yrSal / 12;
      monthlySalary = monthlySalary - monthlySalaryDelete; // subtracts from the global monthly salary
      totalSalary = totalSalary - monthlySalary; // updates the global total salary with adjusted monthly

      document.getElementById('outputLineTwo').innerHTML = "";
      document.getElementById('outputLineTwo').innerHTML += "<p>" + " Total salary of all employees per month = " +
        monthlySalary.toLocaleString("en-US", {style: 'currency', currency: 'USD'}) + "</p>";
      document.getElementById('outputLineThree').innerHTML = "";
      document.getElementById('outputLineThree').innerHTML += "Amount deducted from monthly salary: " +
        monthlySalaryDelete.toLocaleString("en-US", {style: 'currency', currency: 'USD'});

      employeeList.splice(i, 1); // removes one object at i location in the array and returns new array
      employeeTable = employeeList; // updates the global employee array
      clearForm("employeeRemove"); // empties the user input fields
    }
  }
};

// clears the user inputs of the indicated form
var clearForm = function(form){
  document.getElementById(form).reset();
};
