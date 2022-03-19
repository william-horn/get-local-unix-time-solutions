// my solution #2
// ~~special thanks to: Carl Vega 
// for this 'getLocalHourDecimal' function solution idea
function getLocalHourDecimal(now=new Date()) {
    const localHour = now.getHours()%12;
    const localMs = now.getMilliseconds();
    const localSec = now.getSeconds();
    const localMin = now.getMinutes();
    const localHourMs = localHour + localMin/60 + localSec/3600 + localMs/3600000;
    return localHourMs;
}
// ~~

// my solution #1
function toLocal(date) {
    return (date.getTime()/1000/60/60)%12 - date.getTimezoneOffset()/60;
}

// carl solution 
function carlSolution(date) {
    let hour = date.getHours()
      if (hour > 12) {
        hour = hour - 12
      }
    const minutes = date.getMinutes()
    const milliseconds = date.getMilliseconds()
    const timeFormatted = hour + (minutes + (milliseconds/1000))/60
    return timeFormatted;
}
    
// test
setInterval(() => {
    const now = new Date();
    now.setHours(0);
    console.log("---------------------------------------------------");
    console.log("My solution #2: \t\t", getLocalHourDecimal(now));
    console.log("My solution #1: \t\t", toLocal(now));
    console.log("Carl solution: \t\t\t", carlSolution(now));
    console.log("---------------------------------------------------");
}, 10);



// TIME FORMATTING
// !! important =>
// the code below can be replaced with 'new Date().toLocaleString'

// generate mathematical sequence of {12, 1, 2, ..., 12, 1, 2, ...}
function getClockHour(index) {
    const time = (index + 11)%12 + 1;
    const postfix = ~~(index/12)%2 == 0 ? "am" : "pm";
    return { value: time, timePostfix: postfix }
}

// takes string of form "\d?\d?" and returns replacement string of zeros for unmatched digits
// TODO: try to generalize this later into a 'formatNthPlace'?
function formatTensPlace(numStr) {
    numStr = numStr.toString();
    return "00".replace(new RegExp("0{" + numStr.length + "}$"), numStr);
}

// return string in formatted time: hours:minutes:seconds(postfix)
function getClockTime(date) {
    const totalHours = date.getHours();
    const clockHour = getClockHour(totalHours);
    return clockHour.value
        + ":" + formatTensPlace(date.getMinutes()) // format: "0\d" or "\d\d"
        + ":" + formatTensPlace(date.getSeconds()) // format: "0\d" or "\d\d"
        + clockHour.timePostfix;
}
// !!
