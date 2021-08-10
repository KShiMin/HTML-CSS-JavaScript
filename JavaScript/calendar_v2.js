// set global count
var check = "none";


//function to show/hide calendar
function displayCalendar(){
    var calendar = document.getElementsByClassName("calendar");
    if (check === "none"){
        calendar[0].style.display = "block";
        check = "block";
    }
    else{
        calendar[0].style.display = "none";
        check = "none";
    }
}

// event listener function to listen for click event
document.addEventListener("mouseup", function(event) {
    // get month container 
    var obj = document.querySelector(".month-container");

    // const array of month-container children classnames
    const check_name = ["days", "today", "prev", "prevDates", "nextDates", "next", "month", "days today", "over", "over prevDates", "days nextDates"];

    // get clicked target classname 
    var e = event.target.className;

    // get clicked target parent classname 
    var e_parent = event.target.parentNode.className;

    // get clicked target id 
    var e_id = event.target.id;
    
    if(e_id !== ""){
        // call select 
        select(e_id);
        // moveToNextMonth(e_id);
    }
    
    if(e.includes("nextDates") || e.includes("prevDates")){
        checkDir(e, e_id);
    }

    // call direction for arrow 
    direction(e);

    // if statement to check if check in is clicked 
    if (e === "inputs" || e_parent === "inputs"){
        displayCalendar();
    }

    // check if click event is outside month-container 
    else if(!obj.className.includes(e) && check === "block" && !check_name.includes(e)){
        displayCalendar();
    }
})


// function to select dates
function select(e){
    // get all elements with class days
    var child = document.querySelectorAll(".days");

    var content = document.getElementById(e);
    var text = content.textContent;

    // for loop to find which element contains the class "days"
    for(i=0; i < child.length; i++){
        if(child[i].className.includes("today")){
            var id = child[i].id;
            var change = document.getElementById(id);
            change.classList.remove("today");
            break
        }
    }

    // for loop to find the element that is clicked and set class "days" to it
    for(i=0; i< child.length; i++){
        if(child[i].id === e){
            var id= child[i].id;
            var change = document.getElementById(id);
            change.classList.add("today");
            break
        }
    }
    write(text);
    // set check to block and call displayCalendar function to 
    // hide calendar after user selected the date they want
    check = "block";
    displayCalendar();
}

// function to check if nextDates or prevDates were clicked
function checkDir(name, dire){

    // get the content for clicked element
    var content = document.getElementById(dire);
    var text = content.textContent;

    if (name.includes("nextDates")){
        direction("next");
        setnewToday(text);
        write(text);
    }
    else if (name.includes("prevDates")){
        direction("prev");
        setnewToday(text);
        write(text);
    }
}

// function to highlight the clicked dates
function setnewToday(text){

    // get all elements with class days
    var child = document.querySelectorAll(".days");

      // for loop to find which element contains the class "days"
    for(i=0; i < child.length; i++){
        if(child[i].className.includes("today")){
            var id = child[i].id;
            var change = document.getElementById(id);
            change.classList.remove("today");
            break
        }
    }

     // for loop to find the element that is clicked and set class "days" to it
    for(i=0; i< child.length; i++){
        var id= child[i].id;
        var change = document.getElementById("days_" + text);
        change.classList.add("today");
        break
    }  
}

// create base date obj 
var date = new Date();

// create date for calendar and set date to 1
var calendarDate = new Date();
calendarDate.setDate(1);

// create another date obj to store content needed to be written into input box
var secondCalendar = new Date();

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

    var thead = document.querySelector("thead");
    thead.setAttribute("id",  (currentMonth + 1))

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
            th.setAttribute("id", "prev_" + (lastDay - i + 1));
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
        // set an id to calendar row
        tr.setAttribute("id", "month_table_row")
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

                // create text element --> for prevDates number to be shown on calendar
                var text = document.createTextNode(counter.toString());

                // append text to th and append th to tr
                th.appendChild(text);
                tr.appendChild(th);
                counter++;
            }
            else {
                //set th attribute
                th.setAttribute("class", "days nextDates");
                th.setAttribute("id", "next_" + nextDates);

                //create text element --> for nextDates number to be shown on calendar
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
        // set secondCalendar month
        secondCalendar.setMonth(secondCalendar.getMonth() + 1);
        deleteTbody();
        firstCalendar();
    }
    else if (dir === "prev") {
        calendarDate.setMonth(calendarDate.getMonth() - 1);
        secondCalendar.setMonth(secondCalendar.getMonth() - 1);
        deleteTbody();
        firstCalendar();
    }
}

function write(day){
    var day = day;
    var month = secondCalendar.getMonth() + 1;
    var year = secondCalendar.getFullYear();
    var input = document.querySelector(".date-container input");

    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = '0' + month;
    }
    var format = day + '/' + month + '/' + year;

    input.value = format;
}


// call function to create both calendar
firstCalendar("none");