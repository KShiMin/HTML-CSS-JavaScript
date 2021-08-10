// Function to hide the calendar
function hide(){
    var x = document.querySelector(".calendar","input");
    
    if (x.style.display === "block"){
        x.style.display = "none";
    } else{
        x.style.display = "block";
    }
}

//create date obj
var date = new Date();

var calendarScript = () =>{
    date.setDate(1);

    //get month by index
    var monthIndex = date.getMonth();

    //call dates class from html
    var dayInCurrentMonth = document.querySelector(".dates");
    
    //get current year and month 
    var year = date.getFullYear();
    var month = date.getMonth();

    //create new date obj specifying current year and month
    var newDate = new Date(year, month + 1, 0);
    
    //get num of days in month
    var daysInMonth = newDate.getDate();
    console.log(daysInMonth)
    // Find which day does the first date of the current month starts
    //find the day index of where the first day will start on calendar
    var firstDayOfMonthIndex = date.getDay();
    console.log(firstDayOfMonthIndex)
    
    //get last day of prev month 
    var prevLast = new Date(year, month, 0).getDate();
    
    // get the number of days of the next month to put into current month calendar 
    var nextDays = 42 - daysInMonth - firstDayOfMonthIndex;
    console.log(nextDays)
    //create new date obj to compare using system current time.
    var compareDate = new Date();
    
    //array of months
    var months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];

    //set .content h1  and .content p text to month and year dynamically using js
    document.querySelector(".date-content h2").innerHTML = months[monthIndex] + " " + year;
    document.querySelector(".date-content p").innerHTML = new Date().toDateString();
    
    //set days to empty string --> no overlaps
    var days = "";

    //for loop to get prev month dates
    for(x = firstDayOfMonthIndex; x > 0; x--){
        days += `<div class="prev-date">${prevLast - x + 1}</div>`;
    }
    
    // for loop to get the current month dates
    for(i = 1; i <= daysInMonth; i++){
        if(i === compareDate.getDate() && date.getMonth() === compareDate.getMonth()){
            days += `<div class="today">${i}</div>`;
        }else{
            days += `<div>${i}</div>`;
        }
    }
    
    // for loop to get next months dates
    for(j = 1; j <= nextDays; j++){
        days += `<div class="next-date">${j}</div>`;
        dayInCurrentMonth.innerHTML = days;
    }

}

var prev = document.querySelector(".previous");
if (prev !== "null"){
    prev.addEventListener('click', function(){
        date.setMonth(date.getMonth() -1 );
        calendarScript();
    })
}

var next = document.querySelector(".next");
if(next !== "null"){
    next.addEventListener('click', function(){
        date.setMonth(date.getMonth() + 1);
        calendarScript();
    })
}

calendarScript();