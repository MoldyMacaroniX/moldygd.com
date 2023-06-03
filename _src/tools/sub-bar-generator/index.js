// Given through HTML form
// Current subscribers
var subs;
// Subscribers the bar will start at
var subStart;
// Subscriber goal
var subGoal;
// Total width of the bar (not thickness)
var lineWidth;
// Y coord of the bar (X coord is calculated later)
var lineY;
// Thickness of the line
var lineThickness;
// Thickness of the border
var borderThickness;
// The uploaded banner file (base image)
var fileBanner;

// Colors of lower line and upper line (also given through HTML form)
var lowerLineCol;
var upperLineCol;
var borderCol;

// Settings array to store all the above variables
var settings;
// The settings array recieved from localstorage
var retrievedObject

// Goal percent (current subs / sub goal)
// Not given through form but calculated through values solely from the form
var subPercent;

// Dimensions of the canvas
var width = 2560;
var height = 1440;
// Middle points of the canvas
var midWidth = width/2;
var midHeight = height/2;

// Bar positioning
// Total length of the bar (uses the lineWidth value from constants)
var barTotalLength;
// Current length of the bar (the % filled by current subs)
var barCurrentLength;
// The Y coord of the bar (uses the lineY value from constants)
var barY;

// Boolean generate transparent
var isTransparent = false;

// Create the canvas
var c = document.getElementById("banner");

// Retrieve settings from localstorage on page load
window.onload = getLocalStorage();

/**
 * Set the variables defined above to whatever the user inputs
 */
function setVars() {
    // Set the variables defined above provided by the user
    // (Numbers) Parse as int because its a number
    subs = parseInt(document.getElementById('subscribers').value);
    subStart = parseInt(document.getElementById('subscriberStart').value);
    subGoal = parseInt(document.getElementById('subscriberGoal').value);
    lineWidth = parseInt(document.getElementById('lineWidth').value);
    lineY = parseInt(document.getElementById('lineY').value);
    lineThickness = parseInt(document.getElementById('lineThickness').value);
    borderThickness = parseInt(document.getElementById('lineBorder').value);
    // (Colors) Parse as any because it is not a number
    lowerLineCol = document.getElementById('colorFull').value;
    upperLineCol = document.getElementById('colorComp').value;
    borderCol = document.getElementById('colorBorder').value;

    // If any of the values above are still null, set it to the following default values
    // Numbers
    if (subs == null) subs = 0;
    if (subStart == null) subStart = 0;
    if (subGoal == null) subGoal = 0;
    if (lineWidth == null) lineWidth = 0;
    if (lineY == null) lineY = 0;
    if (lineThickness == null) lineThickness = 0;
    if (borderThickness == null) borderThickness = 0;
    // Colors
    if (lowerLineCol == null) lowerLineCol = '#3e3e3eff';
    if (upperLineCol == null) upperLineCol = '#00ff03ff';
    if (borderCol == null) borderCol = '#000000ff';

    // Store the above values into the settings array for saving
    settings = {
        'subs': subs,
        'subStart': subStart,
        'subGoal': subGoal,
        'lineWidth': lineWidth,
        'lineY': lineY,
        'lineThickness': lineThickness,
        'borderThickness': borderThickness,
        'lowerLineCol': lowerLineCol,
        'upperLineCol': upperLineCol,
        'borderCol': borderCol
    };

    // Save the values added to the settings array to localstorage
    setLocalStorage()

    // Calc vars and start program
    calcAndStart();
}

/**
 * Calculate variables above that are not given by the user and start the program
 */
function calcAndStart() {
    // Calculate the remaining variables from the top of the file as well as adjust any that need adjusting
    subs-= subStart;
    subGoal-= subStart;
    subPercent = subs / subGoal;
    barTotalLength = lineWidth;
    barCurrentLength = (subPercent * barTotalLength);
    barY = lineY;

    // Now, call the make_base() function to draw the base image and start the program.
    make_base();
}

/**
 * Set the variable fileBanner to use the banner image provided
 */
function setImage() {
    fileBanner = URL.createObjectURL(event.target.files[0]);
};

// Make the base image (by calling the make_base function, which makes the base image)
// make_base();

/**
 * Draw the base image and call the rest of the program
 */
function make_base() {
    // Create the base image context (2d)
    img = c.getContext('2d');
    // Create a new image
    base_image = new Image();
    // Specify a url
    if (fileBanner != null) {
        base_image.src = fileBanner;
    } else {
        base_image.src = 'moldy.png';
    }
    if (!isTransparent) {
        // Once the image is loaded...
        base_image.onload = function() {
            // ...draw the image
            img.drawImage(base_image, 0, 0);
            // and then, AFTER the image is drawn, draw overtop of it (execute the rest of the draw procedure)
            drawLines();
        }
    } else {
        img.clearRect(0, 0, c.width, c.height);
        drawLines();
    }
}

/**
 * Procedure to follow when drawing everything over the base image
 */
function drawLines() {
    borderLine();
    // Draw the lower line FIRST (because it is on a lower layer)
    lowerLine();
    // Draw the upper line SECOND (because it is on a higher layer)
    upperLine();
    // Print image
    saveCanvasImage();
    if (isTransparent) {
        downloadCanvas();
        isTransparent = false;
    }
}

/**
 * Draw the border bar (full width + extra width + extra thickness)
 */
 function borderLine() {
    // Create the line context (2d)
    var l = c.getContext("2d");
    // Begin the path
    l.beginPath();

    // Since the border needs to be slightly longer, add the borderThickness to the barTotalLength
    var borderTotalLength = barTotalLength + borderThickness;

    // Calculate the x start and x end of the line such that it is in the middle of the image
    var lineXstart = midWidth - (borderTotalLength/2);
    var lineXend = lineXstart + borderTotalLength;

    // Add the bar to the y value specified by the user
    var lineYstart = barY;
    // Since the y value doesn't change, this can just equal lineYstart
    var lineYend = lineYstart;

    // Start the line at the x and y start coord (calc above)
    l.moveTo(lineXstart,lineYstart);
    // End the line at the x and y end coord (calc above)
    l.lineTo(lineXend,lineYend);

    // Set the line color
    l.strokeStyle = borderCol;
    // Set the line thickness
    l.lineWidth = lineThickness + borderThickness;

    // Draw the line
    l.stroke();
}

/**
 * Draw the base bar (full width)
 */
function lowerLine() {
    // Create the line context (2d)
    var l = c.getContext("2d");
    // Begin the path
    l.beginPath();

    // Calculate the x start and x end of the line such that it is in the middle of the image
    var lineXstart = midWidth - (barTotalLength/2);
    var lineXend = lineXstart + barTotalLength;

    // Add the bar to the y value specified by the user
    var lineYstart = barY;
    // Since the y value doesn't change, this can just equal lineYstart
    var lineYend = lineYstart;

    // Start the line at the x and y start coord (calc above)
    l.moveTo(lineXstart,lineYstart);
    // End the line at the x and y end coord (calc above)
    l.lineTo(lineXend,lineYend);

    // Set the line color
    l.strokeStyle = lowerLineCol;
    // Set the line thickness
    l.lineWidth = lineThickness;
    
    // Draw the line
    l.stroke();
}

/**
 * Draw the currently full bar (width of only current subs with respect to the sub goal)
 */
function upperLine() {
    // Create the line context (2d)
    var l = c.getContext("2d");
    // Begin the path
    l.beginPath();

    // Calculate the x start and x end of the line
    // Start will be the same calculation as the lower line, but the end will end sooner.
    var lineXstart = midWidth - (barTotalLength/2);
    // Have the line go only for its current length
    var lineXend = lineXstart + barCurrentLength;

    // Add the bar to the y value specified by the user
    var lineYstart = barY;
    // Since the y value doesn't change, this can just equal lineYstart
    var lineYend = lineYstart;

    // Start the line at the x and y start coord (calc above)
    l.moveTo(lineXstart,lineYstart);
    // End the line at the x and y end coord (calc above)
    l.lineTo(lineXend,lineYend);

    // Set the line color
    l.strokeStyle = upperLineCol;
    // Set the line thickness
    l.lineWidth = lineThickness;

    // Draw the line
    l.stroke();
}

/**
 * 
 */
function saveCanvasImage() {
    var dataURL = c.toDataURL();
    var imageToDisplayCanvas = document.getElementById("image");
    imageToDisplayCanvas.setAttribute("src",dataURL);
}

function downloadCanvas() {
    image = c.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "banner.png";
    link.href = image;
    link.click();
}

function downloadTransparentCanvas() {
    isTransparent = true;
    setVars();
}

function setLocalStorage() {
    // Put the object into storage
    localStorage.setItem('settings', JSON.stringify(settings));
}

function getLocalStorage() {
    // Retrieve the object from storage
    retrievedObject = JSON.parse(localStorage.getItem('settings'));

    if (retrievedObject != null) {
        setVarsToSaved();
        console.log(retrievedObject.subGoal);
    }
}

function setVarsToSaved() {
    // Set the variables defined at the top of this file to the saved values in the settings array
    // Numbers
    document.getElementById('subscribers').setAttribute('value',retrievedObject.subs);
    document.getElementById('subscriberStart').setAttribute('value',retrievedObject.subStart);
    subGoal = document.getElementById('subscriberGoal').setAttribute('value',retrievedObject.subGoal);
    lineWidth = document.getElementById('lineWidth').setAttribute('value',retrievedObject.lineWidth);
    lineY = document.getElementById('lineY').setAttribute('value',retrievedObject.lineY);
    lineThickness = document.getElementById('lineThickness').setAttribute('value',retrievedObject.lineThickness);
    borderThickness = document.getElementById('lineBorder').setAttribute('value',retrievedObject.borderThickness);
    // Colors
    lowerLineCol = document.getElementById('colorFull').setAttribute('value',retrievedObject.lowerLineCol);
    upperLineCol = document.getElementById('colorComp').setAttribute('value',retrievedObject.upperLineCol);
    borderCol = document.getElementById('colorBorder').setAttribute('value',retrievedObject.borderCol);
}