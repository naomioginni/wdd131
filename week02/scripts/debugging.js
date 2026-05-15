const radiusOutput = document.getElementById('radius');
// FIX 1: querySelector('area') looks for an <area> tag. We need an ID selector ('#area') or getElementById.
const areaOutput = document.querySelector('#area'); 
let area = 0;

// FIX 2: Removed the extra '='. A single '=' assigns a value. '==' compares values.
const PI = 3.14159; 

// FIX 3: Changed 'const' to 'let' because the value of radius changes to 20 later in the code.
let radius = 10;

area = PI * radius * radius;

// FIX 4: Use .textContent to change the text inside the HTML element, rather than trying to overwrite the element reference itself.
radiusOutput.textContent = radius;
areaOutput.textContent = area;

// Reassigning the radius (this works now because we used 'let')
radius = 20;
area = PI * radius * radius;

// FIX 5: Use .textContent again for the second update
radiusOutput.textContent = radius;
areaOutput.textContent = area;