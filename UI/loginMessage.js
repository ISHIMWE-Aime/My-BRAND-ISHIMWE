let logedInUserDataBase = JSON.parse(localStorage.getItem("CurrentUser"));

if(logedInUserDataBase === null){
    alert("Please login to make reactions and write a comment on blog");
}