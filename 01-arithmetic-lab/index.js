/**
 * Arithmetic Operators Lab
 * Demonstrates basic operands and BODMAS precedence.
 */

let students = 30;

// Augmented Assignment (Cleaner and more professional)
students += 1; 

// Displaying results to the UI (makes the project "live")
const displayResult = (value) => {
    document.getElementById("myh1").textContent = `Student Count: ${value}`;
    console.log(`Current Student Count: ${value}`);
};

// Operator Precedence Example
// 1. Parenthesis, 2. Exponents, 3. Mult/Div/Mod, 4. Add/Sub
let complexResult = 1 / 2 * (3 + 5); 

displayResult(students);
document.getElementById("myp").textContent = `Precedence Result (1/2 * (3+5)): ${complexResult}`;