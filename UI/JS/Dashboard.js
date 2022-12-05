let fromLocalStorePosts =JSON.parse(localStorage.getItem("PublishedblogData"));
let fromLocalStoreDrafts =JSON.parse(localStorage.getItem("blogData"));
const postBuffer = document.getElementById("data");
const draftBuffer = document.getElementById("data1");
const daysDate = document.getElementById("daysOfMonth");

let date = new Date();
let day = date.getDate();
let dayName = date.getDay();
let month = date.getMonth();;
console.log(dayName,day, month);

let monthLength = (month === 1) ? 31
                : (month === 2) ? 28
                : (month === 3) ? 31
                : (month === 5) ? 31
                : (month === 7) ? 31
                : (month === 8) ? 31
                : (month === 10) ? 31
                : (month === 12) ? 31
                : 30;
console.log(monthLength);

for(let i = 0; i <= monthLength; i++){
    if(i === day){
            daysDate.innerHTML += `
            <div  class="days" >
                <div id="dayName">${dayName}</div>
                <div>${i}</div>
            </div>
        ` 
        // document.daysDate.style.color = "white";
    }else{
        if(i === 0){
            //do nothing.
        }else {
            daysDate.innerHTML += `
            <div  class="days" >
                <div>${i}</div>
            </div>
        ` }
    }
}
postBuffer.innerHTML = fromLocalStorePosts.length;
draftBuffer.innerHTML = fromLocalStoreDrafts.length;