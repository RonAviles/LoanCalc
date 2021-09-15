function getValues() {
    //get all input values from the document
    document.getElementById("tableBody").innerHTML = ``;
    let principal = document.getElementById("loanAmount").value;
    let months = document.getElementById("numOfPayments").value;
    let interest = document.getElementById("intRate").value;
    // calculate total monthly payment
    let pmtForm = (interest / 1200) / (1 - (1 + interest / 1200) ** -months);
    let monthlyPmt = principal * pmtForm;
    //round monthly payment to 2 decimal point
    let monthlyPmtRounded = monthlyPmt.toFixed(2);
    //calculate total cost
    let totalCost = monthlyPmt * months;
    //round total cost to 2 decimal points
    let totalCostRounded = totalCost.toFixed(2);
    //calculate total interest
    let totalInt = totalCost - principal;
    //round total interest to 2 deminal points 
    let totalIntRounded = totalInt.toFixed(2);
    //format values to currency and then print to the display;
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    let monthlyFormatted = formatter.format(monthlyPmtRounded);
    let princFormatted = formatter.format(principal);
    let intFormatted = formatter.format(totalIntRounded);
    let totalCostFormatted = formatter.format(totalCostRounded);
    document.getElementById("totalMonthly").innerHTML = monthlyFormatted;
    document.getElementById("totalPrincipal").innerHTML = princFormatted;
    document.getElementById("totalInt").innerHTML = intFormatted;
    document.getElementById("totalCost").innerHTML = totalCostFormatted;
    calculatePmts(principal, monthlyPmtRounded, interest, months);
}

// Logic and display function 
function calculatePmts(principal, monthly, rate, numOfMonths) {
    //take in total loan amount
    //take in monthly payment
    let monthCounter = 1 //initialize a counter for the month
    let balance = principal; //build remaining balance variable
    let totalInt = 0; //build total interest tracker
    while (monthCounter < numOfMonths) { //create an if variable that checks if the remaining balance is $0
        //if the balance is not zero then it goes through logic 
        let intPmt = balance * (rate / 1200); //Previous Remaining Balance * rate/1200
        let princPmt = monthly - intPmt //calc principal payment (total monthly payment - interest payment)
        totalInt += intPmt; //add t =o interest counter
        let remainingBalance = balance - princPmt; //calculate a temp remaining balance 
        // monthly payment is already rounded so round other values before passing to the table 
        let princPmtRounded = princPmt.toFixed(2);
        let intPmtRounded = intPmt.toFixed(2);
        let totalIntRounded = totalInt.toFixed(2);
        let remainingBalanceRounded = remainingBalance.toFixed(2);
        //inject the elements into a 6 col table 
        document.getElementById("tableBody").innerHTML += `<tr>
        <td>${monthCounter}</td>
        <td>${monthly}</td>
        <td>${princPmtRounded}</td>
        <td>${intPmtRounded}</td>
        <td>${totalIntRounded}</td>
        <td>${remainingBalanceRounded}</td>
        </tr>`;
        //increment month counter and subtract payment from the balance
        balance = remainingBalance;
        monthCounter += 1;
    }
    if (monthCounter == numOfMonths) {
        let finalPmt = balance;
        //if the balance is not zero then it goes through logic 
        let intPmt = balance * (rate / 1200); //Previous Remaining Balance * rate/1200
        let princPmt = finalPmt - intPmt //calc principal payment (total monthly payment - interest payment)
        totalInt += intPmt; //add t =o interest counter
        let remainingBalance = balance - finalPmt; //calculate a temp remaining balance 
        // monthly payment is already rounded so round other values before passing to the table 
        let finalPmtRounded = finalPmt.toFixed(2);
        let princPmtRounded = princPmt.toFixed(2);
        let intPmtRounded = intPmt.toFixed(2);
        let totalIntRounded = totalInt.toFixed(2);
        let remainingBalanceRounded = remainingBalance.toFixed(2);

        //inject the elements into a 6 col table 
        document.getElementById("tableBody").innerHTML += `<tr>
        <td>${monthCounter}</td>
        <td>${finalPmtRounded}</td>
        <td>${princPmtRounded}</td>
        <td>${intPmtRounded}</td>
        <td>${totalIntRounded}</td>
        <td>${remainingBalanceRounded}</td>
        </tr>`;
    }
}