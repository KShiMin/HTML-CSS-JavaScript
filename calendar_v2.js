// set global count
var check = "none";

//function to show/hide calendar
function showCalendar(num){
    var click = document.getElementsByClassName("calendar");
    if (num === 0){
        click[0].style.display = "none";
        check = "none";
    }
    else{
        click[0].style.display = "block";
        check = "block";
    }
}

function displayCalendar(){
    var calendar = document.getElementsByClassName("calendar");
    if (check === "none"){
        calendar[0].style.display = "block";
        check = "block";
    }
    else{
        console.log("hi")
        calendar[0].style.display = "none";
        check = "none";
    }
}

// event listener function to listen for click event
document.addEventListener("mouseup", function(event) {
    // get month container 
    var obj = document.querySelector(".month-container");
    
    // const array of month-container children classnames
    const check_name = ["days", "today", "prev", "nextDates", "next", "month", "days today", "over", "over prevDates", "days click"];

    // get clicked target classname 
    var e = event.target.className;
    console.log("event target is " + e)
    console.log("class name includes " + obj.className.includes(e));
    // get clicked target parent classname 
    var e_parent = event.target.parentNode.className;

    // get clicked target id 
    var e_id = event.target.id;
    console.log("event target id is " + e_id)

    // call select 
    select(e_id);

    // call direction for arrow 
    direction(e);

    // if statement to check if check in is clicked 
    if (e === "inputs" || e_parent === "inputs"){
        displayCalendar();
    }

    // check if click event is outside month-container 
    else if(!obj.className.includes(e) && check === "block" && !check_name.includes(e)){
        console.log("hello")
        displayCalendar();
    }
});

// initialise first clicked date id
var clickedId = "";

// function to select dates
function select(e){
    var count = 0;
    if(e.includes("days") || e.includes("nextDates") || e.includes("prevDates")){
        // if else to check if first clicked date and second clicked date is not none 
        if(clickedId === "" || clickedId !== ""){
            // checkClick()
            if (!e.includes('click')){
                clickedId = e;
                console.log("clicked ID is" +  clickedId);
                // get element from id and give it click class
                var clicked = document.getElementById(e);
                clicked.classList.add('click');
                console.log(clicked)             
            } else{
                console.log("hi")
            }
        }
        count += 1
        // if to check if firstid and secid not none 
        if(clickedId !== "" && count > 0){
            console.log(count)
            // get first num and second num from element textcontent
            var clickedNum = parseInt(document.getElementById(clickedId).textContent);
            console.log("clickedNum is " + clickedNum)
            // set check in check out day
            // document.querySelector(".day_1").innerHTML = firstNum;
        }
    }
    
}

function checkClick(){
    var check_body = document.getElementsByTagName("th");
    console.log(check_body)
    for(i = 0; i<check_body; i++){
        console.log("hello " + i);
    }
    // if (check_body.className.includes(" click")){
    //     console.log("hi")
    // }
}

// create base date obj 
var date = new Date();

// create date for calendar and set date to 1
var calendarDate = new Date();
calendarDate.setDate(1);

// get today day index
var todayIndex = new Date().getDay();

// var for total num of row and rol 
var row = 6;
var col = 7;

// get month index and year
var monthIndex = date.getMonth();
var year = date.getFullYear();

// get todays date
var today = date.getDate();

// get last day 
var lastDay = new Date(year, monthIndex, 0).getDate();

// months array
var months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

// short form months array
var shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// weekdays array
var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// function to delete tbody 
function deleteTbody() {

    // get tables
    var firstTable = document.querySelector(".month");

    // get the tbody tag from table
    var firstBody = firstTable.getElementsByTagName('tbody')[0];

    // delete table body 
    firstTable.removeChild(firstBody);
}

// function to generate calendar
function firstCalendar() {

    // get table from html 
    var table_1 = document.querySelector(".month");

    // get month for first calendar 
    var currentMonth = calendarDate.getMonth();

    // get location to put month 
    var monthName = document.querySelector("#month");

    // get first day of month index 
    // also used for number of prev months date to add into calendar
    var firstDayIndex = calendarDate.getDay();

    // get last day of prev month
    var lastDayOfPrev = new Date(year, currentMonth, 0).getDate();

    // get last day of current month 
    // also number of days in the current month 
    var lastDayOfCurrent = new Date(year, currentMonth + 1, 0).getDate();

    // call create Calendar function to create calendar
    createCalendar(lastDayOfCurrent, firstDayIndex, table_1, lastDayOfPrev, currentMonth, monthName, calendarDate);
}

// function create prev month days
function createPrevDate(tr, firstDay, lastDay, month) {
    if (firstDay === 0) {
        var first = 6;
    }
    else {
        var first = firstDay - 1;
    }
    //for loop to loop through num of prev dates 
    for (i = first; i > 0; i--) {
        // create th element and give it class and id
        var th = document.createElement('th');
        if(month === monthIndex){
            th.setAttribute("class", "over");
        }
        else{
            th.setAttribute("class", "prevDates");
        }

        var prevMonthDate = lastDay - i + 1;
        var text = document.createTextNode(prevMonthDate.toString());
        th.appendChild(text);
        tr.appendChild(th);
    }
}

// function to dynamically create calendar
var createCalendar = (lastDayCurrent, firstDay, table, lastDayPrev, month, monthName, dateObj) => {
    var counter = 1;
    var nextDates = 1;

    // set month on calendar 
    monthName.innerHTML = months[month] + " " + dateObj.getFullYear();

    // create tbody and append to table
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    // nested for loop to dynamically generate calendar 
    // outer for loop to loop through num of row
    for (i = 0; i < row; i++) {
        tr = document.createElement('tr');
        // inner for loop to loop through num of col
        for (j = 0; j < col; j++) {
            // create th element
            var th = document.createElement('th');

            if (i === 0 && j === 0 && firstDay !== 1) {
                // call createPrevDate
                createPrevDate(tr, firstDay, lastDayPrev, month);
                if (firstDay === 0) {
                    var first = 6;
                }
                else {
                    var first = firstDay - 1;
                }
                // set to num of prev month day to input  
                j = first - 1;
            }
            else if (counter <= lastDayCurrent) {
                // if statement to find past date
                if (counter < today && month === date.getMonth()) {
                    th.setAttribute("class", "over");
                }
                // else if to find today
                else if (counter == today && month === date.getMonth()) {
                    th.setAttribute("class", "days today");
                    th.setAttribute("id", "days_" + counter);
                }
                else {
                    th.setAttribute("class", "days");
                    th.setAttribute("id", "days_" + counter);
                }

                // create text element 
                var text = document.createTextNode(counter.toString());

                // append text to th and append th to tr
                th.appendChild(text);
                tr.appendChild(th);
                counter++;
            }
            else {
                //set th attribute
                th.setAttribute("class", "nextDates");
                th.setAttribute("id", "next_" + nextDates);

                //create text element 
                var text = document.createTextNode(nextDates.toString());

                //append text to th and append th to tr 
                th.appendChild(text);
                tr.appendChild(th);
                nextDates++;
            }
        }
        // append tr to tbody
        tbody.appendChild(tr);
    }
    // append tbody to table
    table.appendChild(tbody);
}


// function to determine direction
function direction(dir) {

    // if statement to check for direction
    if (dir === "next") {
        calendarDate.setMonth(calendarDate.getMonth() + 1);
        deleteTbody();
        firstCalendar();
    }
    else if (dir === "prev") {
        calendarDate.setMonth(calendarDate.getMonth() - 1);
        deleteTbody();
        firstCalendar();
    }
}


// call function to create both calendar
firstCalendar("none");