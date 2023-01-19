let userPresense = JSON.parse(localStorage.getItem('authorization'));
let logINB = document.getElementById('loginB');
console.log(logINB)

console.log(userPresense)

if(userPresense){
    logINB.innerHTML = 'Log Out'
}else{
    logINB.addEventListener('click', () => {
        location.href = "userLogin.html"
    })
}

// console.log(logINB[0].innerHTML, logINB[1].innerHTML)

if(logINB.innerHTML === 'Log Out'){
    logINB.addEventListener('click', () => {
        userPresense = ''

        logINB.innerHTML = 'Log in'
        localStorage.setItem("authorization", JSON.stringify(userPresense))
        location.href = 'index.html'
    })
}