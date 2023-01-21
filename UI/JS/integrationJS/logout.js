let userPresense = JSON.parse(localStorage.getItem('authorization'));
let logINB = document.getElementsByClassName('loginB');
console.log(logINB)

console.log(userPresense)
if(userPresense){
    logINB[0].innerHTML = 'Log Out'
    logINB[1].innerHTML = 'Log Out'
}else{
    logINB[0].addEventListener('click', () => {
        location.href = 'userLogin.html'
    })

    logINB[1].addEventListener('click', () => {
        location.href = 'userLogin.html'
    })
}

console.log(logINB[0].innerHTML, logINB[1].innerHTML)

if(logINB[0].innerHTML === 'Log Out'){
    logINB[0].addEventListener('click', () => {
        userPresense = ''

        logINB[0].innerHTML = 'Log in'
        logINB[1].innerHTML = 'Log in'
        localStorage.setItem("authorization", JSON.stringify(userPresense))
        location.href = 'index.html'
    })

    logINB[1].addEventListener('click', () => {
        userPresense = ''
        
        logINB[0].innerHTML = 'Log in'
        logINB[1].innerHTML = 'Log in'
        localStorage.setItem("authorization", JSON.stringify(userPresense))
        location.href = 'index.html'
    })
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }