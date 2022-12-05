const textAreaInput = document.getElementById("articleInput");
const saveButton = document.getElementById("save");
const newBlogTittleInput = document.getElementById("blog_tittle");
const newTittleSlot = document.getElementById("newTittle");
const newBlogAuthor = document.getElementById("blog_author");
let dataBase = [];
let blogData = {};
//for each reload
let articleToEditTittle = JSON.parse(localStorage.getItem("linkDataForEdit"));
if(articleToEditTittle[0] === true){
    dataBase = JSON.parse(localStorage.getItem("blogData"));
    newBlogTittleInput.value = articleToEditTittle[1];
    for(let i = 0; i < dataBase.length; i++){
        for(const property in dataBase[i]){
            if(dataBase[i][property] === articleToEditTittle[1]){
                console.log(dataBase[i][property]);
                textAreaInput.value = dataBase[i]["blog"];
                newBlogAuthor.value = dataBase[i]["Author"];
            }
        }
    } 
    articleToEditTittle[0] = false;
    localStorage.setItem("linkDataForEdit", JSON.stringify(articleToEditTittle));
}
saveButton.addEventListener("click",function(){
    //dataBase retore
    dataBase = JSON.parse(localStorage.getItem("blogData"));
    let blogData = {};
    //tittle displaying and refresh
    let tittle = newBlogTittleInput.value;
    newTittleSlot.innerHTML = tittle + " by: " + newBlogAuthor.value;

    //Save to localstarage
    const userID = idGenerator();
    console.log(userID);
    blogData["Tittle"] = newBlogTittleInput.value;
    blogData["Author"] = newBlogAuthor.value;
    blogData["blog"] = textAreaInput.value;
    blogData["blogId"] = userID;
    console.log(blogData);
    dataBase.push(blogData);
    newBlogTittleInput.value = "";
    newBlogAuthor.value = "";
    // textAreaInput.value = "";
    localStorage.setItem( "blogData",JSON.stringify(dataBase));
})

function idGenerator(){
    let character = "";
    let userid = "";
    let randomNum = Math.floor(10 + Math.random() * 28);
    let currentDate = new Date().toJSON();
    for ( let i = randomNum ; i >= 10 ; i -= 3 ){
        if(i <= 28){
            character = String.fromCharCode(i + 8);
        }else{
            character= String.fromCharCode(i);
        }

        if(character == '\n' || character == " " || character == '\t' || character == '\f'){
            character = "$";
        } 
        character += currentDate;
        userid += character;
    }
    return userid;
}
