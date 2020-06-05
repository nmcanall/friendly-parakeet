/*
Note: the method used here has some inherint inefficiencies.  The worst case is if the user selects only one
possible character type (e.g. lowercase).  Then we will continue through the build password while loop
many times needlessly, while we attempt to add a type that is not allowed.  
*/

// Assignment code here
var generatePassword = function() {

  // Get password length, if bad answer, return to top
  var length = window.prompt("How long should the password be between 8 and 128 characters?");
  while(length < 8 || length > 128) {
    if(length < 8) {
      length = window.prompt("Sorry, please pick a longer password.");
    }
    else if(length > 128) {
      length = window.prompt("Sorry, please pick a shorter password.");
    }
  }

  // pick character types
  var lowercaseChoice = window.confirm("If you would like lowercase letters, click \"Okay\"; otherwise, click \"Cancel\"");
  var uppercaseChoice = window.confirm("If you would like uppercase letters, click \"Okay\"; otherwise, click \"Cancel\"");
  var numericChoice = window.confirm("If you would like numbers, click \"Okay\"; otherwise, click \"Cancel\"");
  var specialChoice = window.confirm("If you would like special characters, click \"Okay\"; otherwise, click \"Cancel\"");

  // Check if user picked at least one of the choices
  if(!lowercaseChoice && !uppercaseChoice && !numericChoice && !specialChoice) {
    while(!lowercaseChoice && !uppercaseChoice && !numericChoice && !specialChoice) {
      window.prompt("Sorry, you must pick at least one option.  Please try again.");
      var lowercaseChoice = window.confirm("If you would like lowercase letters, click \"Okay\"; otherwise, click \"Cancel\"");
      var uppercaseChoice = window.confirm("If you would like uppercase letters, click \"Okay\"; otherwise, click \"Cancel\"");
      var numericChoice = window.confirm("If you would like numbers, click \"Okay\"; otherwise, click \"Cancel\"");
      var specialChoice = window.confirm("If you would like special characters, click \"Okay\"; otherwise, click \"Cancel\"");
    }
  }

  // Empty password to build and eventually return
  var password = "";

  // Characters
  var lowercase = "abcdefghijklmnopqrstuvwxyz";
  var uppercase = "ABCDEFGHIJKLMNOPQRSTUBWXYZ";
  var numeric = "1234567890";
  var special = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

  // Build password
  while(password.length < length) {
    type = getRandomInt(4); // Returns 0, 1, 2, or 3

    // If type = 0 and lowercase is allowed, pick a lowercase
    if(type === 0 && lowercaseChoice) {
      password += lowercase[getRandomInt(lowercase.length)];
    }

    // If type = 1 and uppercase is allowed, pick an uppercase
    else if(type === 1 && uppercaseChoice) {
      password += uppercase[getRandomInt(uppercase.length)];
    }

    // If type = 2 and numeric is allowed, pick a number
    else if(type === 2 && numericChoice) {
      password += numeric[getRandomInt(numeric.length)];
    }

    // If type = 3 and special characters are allowed, pick a special character
    else if(type === 3 && specialChoice) {
      password += special[getRandomInt(special.length)];
    }

    // Inefficiency point: if we could not use the selected type, continue the loop
    else {
      continue;
    }
  }

  // Return final product
  return password;
}

function getRandomInt(max) {
  return (Math.floor(Math.random() * Math.floor(max)));
}


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
