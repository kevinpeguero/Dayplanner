$(document).ready(function() {

    // Create variables to hold the current date and hour
    var containerDiv = $('.container');
    var date = moment().format('dddd, MMMM Do YYYY')
    $('#current-date').text(date);
    // set the current hour in military time
   var currentHour = parseInt(moment().format('H'))
  console.log(currentHour)
  
  // Create array of objects to hold the values for each hour of the day
  // milTime is military time 
  var timeValues = [
    {time: "9 AM", milTime: 09},
    {time: "10 AM", milTime: 10},
    {time: "11 AM", milTime: 11},
    {time: "12 AM", milTime: 12},
    {time: "1 PM", milTime: 13},
    {time: "2 PM", milTime: 14},
    {time: "3 PM", milTime: 15},
    {time: "4 PM", milTime: 16},
    {time: "5 PM", milTime: 17}
  ]
  
  // create a for loop to that iterates through the time values array and dynamically make a row for each hour.
  for(var i = 0; i < timeValues.length; i++) {
    
    var savedText = localStorage.getItem(i) || "";
    var timeRow = $('<div>');
    // create div to hold the hour content
    var hourDiv = $('<div>');
    // create div to hold the textarea content
    var textDiv = $('<div>');
    // create textarea element to type in task
    var textArea = $('<textarea>');
     // create div to hold the button
    var buttonDiv = $('<div>');
    // create the button to save for local storage
    var saveButton = $('<button>');
    
  
    // add classes to the created elements
    timeRow.addClass('row');
    hourDiv.addClass('time col-md-1'); 
    hourDiv.html(`<p class="hour-text">${timeValues[i].time}</p>`) // Displays the hour
    textDiv.addClass('col-md-10');
    textDiv.attr('value', timeValues[i].milTime); // holds the time value in milary time
    textArea.text(savedText);
    buttonDiv.addClass('col-md-1');
    saveButton.addClass('saveBtn');
    saveButton.html(`<i class="fas fa-lock"></i>`)
  
    // append the row to the container div
    containerDiv.append(timeRow);
    // append the time, textareaDiv and buttonDiv to the parent row row
    timeRow.append(hourDiv, textDiv, buttonDiv);
    // append the textarea element to the textareaDiv
    textDiv.append(textArea);
    // apppend the saveButton to the buttonDiv
    buttonDiv.append(saveButton);
  
  
    // after the loop runs this checks if there is value in the text area and displays text content if there is value
   if (localStorage.getItem(timeValues[i].milTime)) {
    textArea.text(localStorage.getItem(timeValues[i].milTime));
  }
  }
  
   
  
  // Loop through the textarea rows and change the color according to the current hour of the day
  function changeColor() {
    var rowColor = $(".col-md-10");
    for (let j = 0; j < rowColor.length; j++) {
      var currentDiv = $(rowColor[j]);
      if (currentDiv.attr("value") > currentHour) {
        currentDiv.addClass("future");
      } else if (currentDiv.attr("value") < currentHour) {
        currentDiv.addClass("past");
      } else {
        currentDiv.addClass("present");
      }
    }
  }
  // Call the changeColor function
  changeColor();
  
  
  // Event listener to save the task when button is clicked
  $('.saveBtn').on('click', function() {
    // this will find the textarea value that the user inputs
    var textValue = $(this).parent().parent().find('textarea').val()
    // this will find the current time for that textarea div
    var divValue = $(this).parent().parent().find('.col-md-10').attr('value');
  
    // sets the input and time as keys and values
    localStorage.setItem(divValue, textValue)
  })
  
  
  });