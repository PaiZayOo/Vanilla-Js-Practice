const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

//select parent element
const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

//set the future date

let futureDate = new Date(2023,0,14,8,30,0);

let year = futureDate.getFullYear();
let hour = futureDate.getHours();
let minute = futureDate.getMinutes();
//month is 0 based index
let month = months[futureDate.getMonth()];
let date = futureDate.getDate();
//day is 0 based index
let weekday = weekdays[futureDate.getDay()];

giveaway.textContent = ` My birhday giveaway ends in  ${weekday}, ${date} ${month} ${year}, ${hour}:${minute} am`;

//get time in ms 
const future = futureDate.getTime();

function getRemainTime(){
    const today = new Date().getTime();
    let t = future - today;
    // 1s = 1000ms
    // 1m = 60s
    // 1hr = 60m
    // 1day = 24hr

    //values in millionsecs
    let oneDay = 24 * 60 * 60 * 1000;
    let oneHour = 60 * 60 * 1000;
    let oneMinute = 60 * 1000;
    
    //calculate remain time values

    let days = Math.floor(t/oneDay);
    let hours = Math.floor((t%oneDay)/oneHour);
    let minutes = Math.floor((t%oneHour)/oneMinute);
    let seconds = Math.floor((t%oneMinute)/1000);

    //set value arrays

    const values = [days, hours, minutes, seconds];
    function format(item){
        if(item < 10){
            return(item = `0${item}`)
        }
        return(item);
    }

    items.forEach(function(item,index){
        item.innerHTML = format(values[index]);
    })

    if (t < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`;
      }
    
};


let countdown = setInterval(getRemainTime,1000);
getRemainTime();

 

