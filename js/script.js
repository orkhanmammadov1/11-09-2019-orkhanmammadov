// var tabs = Array.from(document.querySelectorAll("[data-toggle='tab']"));
// console.log(tabs);
// tabs.forEach(function (tab) {

//     tab.addEventListener("click", function (e) {
//         e.preventDefault();

//         if (this.classList.contains("active")) {
//             return;
//         }

//         var content = document.querySelector(this.getAttribute("href"));

//         if (content == null) {
//             return;
//         }

//         var activeIndex = findParentActiveChild(this.parentNode.parentNode);

//         tabs[activeIndex].classList.remove("active");

//         this.classList.add("active");

//         for (var i = 0; i < content.parentNode.children.length; i++) {
//             if (content.parentNode.children[i].classList.contains("active")) {
//                 content.parentNode.children[i].classList.remove("active");
//             }
//         }

//         content.classList.add("active");

//     });
// });


// function findParentActiveChild(parentParent) {
//     return tabs.findIndex(function (tab) {
//         return tab.classList.contains("active") && tab.parentNode.parentNode == parentParent;
//     });
// }

// window.setTimeout(function () {
//     console.log("Salam");
// }, 1000);

// var count = 0;
// var intervalNum = window.setInterval(function () {
//     console.log("Salam");
//     count++;
//     if (count == 5) {
//         window.clearInterval(intervalNum);
//     }
// }, 100);


// document.querySelector(".toggleTimer").addEventListener("click", function () {
//     if (this.innerText == "Pause") {
//         window.clearInterval(intervalNum);
//         this.classList.replace("btn-primary", "btn-warning");
//         this.innerText = "Play";
//     } else {
//         intervalNum = window.setInterval(function () {
//             console.log("Salam");
//         }, 1000);

//         this.classList.replace("btn-warning", "btn-primary");
//         this.innerText = "Pause";
//     }

//     console.log(intervalNum);
// });


// Timer

var timer = document.querySelector(".timer");

var langKeys = {
    az: {
        days: "Gün",
        hours: "Saat",
        minutes: "Dəq",
        seconds: "San"
    },
    en: {
        days: "Day",
        hours: "Hour",
        minutes: "Min",
        seconds: "Sec"
    },
    ru: {
        days: "День",
        hours: "Час",
        minutes: "Mин",
        seconds: "Сек"
    }
}



var Deadline = new Date(timer.dataset.date);

generateDiffDivs();

var timerInterval = window.setInterval(generateDiffDivs, 1000);


function generateDiffDivs() {
    var diffs = getDiff(Deadline.getTime() - Date.now());
    removeTimerDivs();

    for (var type in diffs) {
        var div = document.createElement("div");
        div.dataset.type = type;
        div.innerHTML = diffs[type] + "<span>" + langKeys[timer.dataset.lang][type] + "</span>";
        timer.append(div);
    }

    if (diffs.days == 0 && diffs.hours == 0 && diffs.minutes == 0 && diffs.seconds == 0) {
        window.clearInterval(timerInterval);
        return;
    }
}

function removeTimerDivs() {
    var divs = document.querySelectorAll(".timer div");

    divs.forEach(function (div) {
        div.remove();
    })
}

function getDiff(diffSecond) {
    var diff = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };
    var dayDiff = Math.floor(diffSecond / 1000 / 60 / 60 / 24);

    if (dayDiff >= 1) {
        diff.days = dayDiff;
        diffSecond -= dayDiff * 1000 * 60 * 60 * 24;
    }

    var hourDiff = Math.floor(diffSecond / 1000 / 60 / 60);

    if (hourDiff >= 1) {
        diff.hours = hourDiff;
        diffSecond -= hourDiff * 1000 * 60 * 60;
    }

    var minDiff = Math.floor(diffSecond / 1000 / 60);

    if (minDiff >= 1) {
        diff.minutes = minDiff;
        diffSecond -= minDiff * 1000 * 60;
    }

    var secDiff = Math.floor(diffSecond / 1000);

    if (secDiff >= 1) {
        diff.seconds = secDiff;
        diffSecond -= secDiff * 1000;
    }

    return diff;
}