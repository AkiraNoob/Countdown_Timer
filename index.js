const fixedHeight = document.getElementById('date').offsetHeight;

let hours_index = document.getElementById('hours-text');
let minutes_index = document.getElementById('minutes-text');
let seconds_index = document.getElementById('seconds-text');
let date_index = document.getElementById('date-text');

let title_index = document.getElementById('head-title');
let para = new Date();
let newYear = document.createTextNode(para.getFullYear() + 1);
title_index.appendChild(newYear);

let subDate = para.getDate();
let subHours = para.getHours();
let subMin = para.getMinutes();
let subSec = para.getSeconds();

if (para.getFullYear % 4 === 0) {
    if (calcDate(subDate, para.getMonth(), para.getFullYear()) !== 365) {
        let subtract = calcDate(subDate, para.getMonth(), para.getFullYear());
        document.getElementById('date').style.height = fixedHeight * 1 / 366 * subtract + 'px';
    } else {
        document.getElementById('date').style.height = fixedHeight + 'px';
    }
} else {
    if (calcDate(subDate, para.getMonth(), para.getFullYear()) !== 364) {
        let subtract = calcDate(subDate, para.getMonth(), para.getFullYear());
        document.getElementById('date').style.height = fixedHeight * 1 / 365 * subtract + 'px';
    } else {
        document.getElementById('date').style.height = fixedHeight + 'px';
    }
}

if (23 - subHours !== 23) {
    let subtract = 24 - subHours;
    document.getElementById('hours').style.height = fixedHeight * 1 / 24 * subtract + 'px';
} else {
    document.getElementById('hours').style.height = fixedHeight + 'px';
}

if (59 - subMin !== 59) {
    let subtract = 60 - subMin;
    document.getElementById('minutes').style.height = fixedHeight * 1 / 60 * subtract + 'px';
} else {
    document.getElementById('minutes').style.height = fixedHeight + 'px';
}

if (59 - subSec !== 59) {
    let subtract = 60 - subSec;
    document.getElementById('seconds').style.height = fixedHeight * 1 / 60 * subtract + 'px';
} else {
    document.getElementById('seconds').style.height = fixedHeight + 'px';
}

function getLiveTime() {
    const date = new Date();
    let dateValue = calcDate(date.getDate(), date.getMonth() + 1, date.getFullYear());
    let hoursValue = 24 - date.getHours() - 1;
    let minutesValue = 60 - date.getMinutes() - 1;
    let secondsValue = 60 - date.getSeconds() - 1;
    date_index.innerHTML = dateValue;
    hours_index.innerHTML = hoursValue;
    minutes_index.innerHTML = minutesValue;
    seconds_index.innerHTML = secondsValue;
    countdownEffect(dateValue, hoursValue, minutesValue, secondsValue);
}
function countdownEffect(a, b, c, d) {
    if (a === 365 || a === 364) {
        subDate = a;
        document.getElementById('date').style.height = fixedHeight + 'px';
    }
    if (b === 23) {
        subHours = b;
        document.getElementById('hours').style.height = fixedHeight + 'px';
    }
    if (c === 59) {
        subMin = c;
        document.getElementById('minutes').style.height = fixedHeight + 'px';
    }
    if (d === 59) {
        subSec = d;
        document.getElementById('seconds').style.height = fixedHeight + 'px';
    }

    if (Math.abs(subDate - a) !== 0) {
        subDate = a;
        let index = document.getElementById('date');
        if (para.getFullYear() % 4 === 0) {
            index.style.height = (a / 366 * fixedHeight) + 'px';
        } else {
            index.style.height = (a / 365 * fixedHeight) + 'px';
        }
        if (a === 0) {
            index.style.height = '1px';
        }
    }
    if (Math.abs(subHours - b) !== 0) {
        subHours = b;
        let index = document.getElementById('hours');
        index.style.height = (b / 24 * fixedHeight) + 'px';
        if (b === 0) {
            index.style.height = '1px';
        }
    }
    if (Math.abs(subMin - c) !== 0) {
        subMin = c;
        let index = document.getElementById('minutes');
        index.style.height = (c / 60 * fixedHeight) + 'px';
        if (c === 0) {
            index.style.height = '1px';
        }
    }
    if (Math.abs(subSec - d) !== 0) {
        subSec = d;
        let index = document.getElementById('seconds');
        index.style.height = (d / 60 * fixedHeight) + 'px';
        if (d === 0) {
            index.style.height = '1px';
        }
    }
}
function calcDate(date, month, year) {
    const dateInMonth = (month) => {
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            case 2:
                return 28;
            default:
                return 30;
        }
    }
    let sum = 0;
    for (let i = month + 1; i <= 12; i++) {
        if (i === 2 && year % 4 === 0) {
            sum += dateInMonth(i) + 1;
        } else {
            sum += dateInMonth(i);
        }
    }
    if (month === 2 && year % 4 === 0) {
        sum += dateInMonth(month) + 1 - date;
    } else {
        sum += dateInMonth(month) - date;
    }
    return sum;
}
setInterval(getLiveTime, 1000);

