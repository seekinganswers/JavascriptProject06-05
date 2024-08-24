"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Project 06-05

      Project to submit a registration form
      Author: June 17, 2024, IST239-W01, Hands-on Project 06-05
	  
	  In Hands-on Exercise 06-05 we are debugging the code to ensure it runs
	  correctly. There are several errors that are preventing the code 
	  from proper execution. 
	  
      Filename: project06-05.js
*/


window.addEventListener("load", function() {
   // Calculate the shopping cart when the page loads
   calcCart();
   
   // Verify that the user has selected a session to attend
   //FIXED: added the word on to the attributes below click
   document.getElementById("regSubmit").onclick = sessionTest;
   
   // Recalculate the shopping chart when any field loses the focus
   // FIXED: added the word on to the attributes below ex onblur. onchange
   document.getElementById("fnBox").onblur = calcCart;
   document.getElementById("lnBox").onblur = calcCart;
   document.getElementById("groupBox").onblur = calcCart;
   document.getElementById("mailBox").onblur = calcCart;
   document.getElementById("phoneBox").onblur = calcCart;
   document.getElementById("sessionBox").onchange = calcCart;
   document.getElementById("banquetBox").onblur = calcCart;
   document.getElementById("mediaCB").onclick = calcCart;
});


// Function to verify that a session was selected by the user
function sessionTest() {
   var confSession = document.getElementById("sessionBox");
   if (confSession.selectedIndex === -1) {

      //FIXED: setValidity to setCustomValidity
      confSession.setCustomValidity("Select a Session Package");

      //FIXED: setValidity to setCustomValidity
   } else {
      confSession.setCustomValidity("");
   }
}

// Function to calculate the shopping cart total
function calcCart() {
   
   // Calculate the banquet cost for all guests 
   let guestCost = document.forms.register.elements.banquetGuests.value*55;
   document.getElementById("regBanquet").textContent = document.forms.register.elements.banquetGuests.value;
   
   // Determine the cost of the selected session
   let sessionCost = 0;       // Initial cost of the session
   let sessionChoice = "";    // Initial chosen session

   // Index of the chosen session
   //FIXED: changed index to selectedIndex
   let selectedSession = document.getElementById("sessionBox").selectedIndex;
   
   // Retrieve the name and cost of the selected session  
   if (selectedSession !== -1) {
      sessionChoice = document.forms.register.elements.sessionBox[selectedSession].text;
      sessionCost = document.forms.register.elements.sessionBox[selectedSession].value;
   }
   
   // Determine the cost of the media pack
   let mediaCost = 0;      // Initial media cost
   let mediaChoice = "";   // Initial media choice
   
   // If the user selects the media pack, update the choice and cost
   //FIXED: changed check to checked
   if (document.forms.register.elements.mediaCB.checked) {
      mediaChoice = "yes";
      mediaCost = 115;
   }
   
   // Calculate total cost of the conference
   // Multiply field values by 1 to convert them from text strings to numeric values
   let totalCost = guestCost*1 + sessionCost*1 + mediaCost*1;
   
   // Display the field values and calculated values in the Shopping Cart table
   document.getElementById("regName").textContent = document.forms.register.elements.firstName.value + " " + document.forms.register.elements.lastName.value;
   document.getElementById("regGroup").textContent = document.forms.register.elements.group.value;
   document.getElementById("regEmail").textContent = document.forms.register.elements.email.value;
   document.getElementById("regPhone").textContent = document.forms.register.elements.phoneNumber.value;
   document.getElementById("regSession").textContent = sessionChoice;
   document.getElementById("regBanquet").textContent = document.forms.register.elements.banquetGuests.value; 
   document.getElementById("regPack").textContent = mediaChoice;
   //FIXED: added curley braces starting at style to "USD"
   document.getElementById("regTotal").textContent = totalCost.toLocaleString("en-US", {style: "currency", currency: "USD"});
}
