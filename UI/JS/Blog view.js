let tittleTex = JSON.parse(localStorage.getItem("linkData"));//to capture clicked blog
let previewDataFromLocal = JSON.parse(localStorage.getItem("PreviwedblogData"));
let dataFromDataBase = JSON.parse(localStorage.getItem("PublishedblogData"));

const blogViewTittle = document.getElementById("BlogViewTittle");
console.log(tittleTex, blogViewTittle);

const paragraphSlot = document.getElementById("paragraph");
const blogImage = document.getElementById("blogImageslot");

const comment = document.getElementById("contentOfNewComent");
const post = document.getElementById("post");
const listOfComents= document.getElementById("listOfComents");
const timeSlot = document.getElementById("time");
const numOfComents = document.getElementById("numOfComents");

let logedInUserDataBase = JSON.parse(localStorage.getItem("CurrentUser"));
let UserCredentials = JSON.parse(localStorage.getItem("UserCredentials"));

let commentData = [];
let newComment = {};

let time = new Date();

if( (JSON.parse(localStorage.getItem("comments"))) !== null){

    commentData = JSON.parse(localStorage.getItem("comments"));
    let numCount = 0;

    for(let i = 0; i < commentData.length; i++){
        if( commentData[i]["blogId"] === tittleTex[2]){
            numCount += 1;
            listOfComents.innerHTML += `
            <div id="commentorAndComment">
            <div id="commentorImageSlot">
                <img src="images/commentor pict.jpg" alt="commentorImage" id="commentorImage">
            </div>
            <div id="commetorNameTimeAndParagraph">
                <div id="commentorNameAndTime">
                    <h5 class="commentorName">Lorem ipsum dolor</h5>
                    <p id="time">- ${commentData[i]["time"]}</p>
                </div>
                <p id="comentParagraph">
                    ${commentData[i]["comment"]}
                </p>
            </div>
            </div>
            `
        }
    }
    numOfComents.innerHTML = numCount;
}

console.log(paragraphSlot);


if((JSON.parse(localStorage.getItem("linkData")) !== null) && (tittleTex[0] === true)){
    if(tittleTex[0] == true){    
        blogViewTittle.innerHTML = tittleTex[1];
        for(let i = 0; i < dataFromDataBase.length; i++){
            for(const property in dataFromDataBase[i]){
                if(dataFromDataBase[i][property] === tittleTex[1]){
                    if(dataFromDataBase[i]["blogId"] === tittleTex[2]){//to filter the comment for each blog
                        console.log(dataFromDataBase[i][property]);
                        blogImage.innerHTML = `
                        <img src=${dataFromDataBase[i]["backgroundImage"]} alt="" id="blogImage">
                        `
                        paragraphSlot.innerHTML  = dataFromDataBase[i]["blog"];
                    }
                }
            }
        }
    }
} else{
    blogViewTittle.innerHTML = previewDataFromLocal[1]["Tittle"];
    paragraphSlot.innerHTML  = previewDataFromLocal[1]["blog"];
    blogImage.innerHTML = `
        <img src=${previewDataFromLocal[1]["backgroundImage"]} alt="" id="blogImage">
    `
}

const recommended = document.getElementById("listOfRecommended");
if(dataFromDataBase !== null)
    for(let i = 0; i < dataFromDataBase.length; i++){
        recommended.innerHTML += `
        <div class="recArticles">
        <div class="recArticleImageSlot">
            <img src=${dataFromDataBase[i]["backgroundImage"]} alt="recommended_Article_Image" class="recArticleImage">
        </div>
        <div id="recArticleTittle">
            <h2>${dataFromDataBase[i]["Tittle"]}</h2>
        </div>
        </div>
    `
    }

post.addEventListener("click", function(){
    //remember to ret newComment to empty objet for it click
    newComment = {};

    let timeAndYear = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + "-" + time.getDate() + "/" + (time.getMonth()+1) + "/" + time.getFullYear();
    let currentUserName;

    if(logedInUserDataBase !== null){
        for(let j = 0; j < UserCredentials.length; j++){
            if(logedInUserDataBase["email"] === UserCredentials[j]["email"]){
                //let commentorName = document.getElementsByClassName("commentorName");
                currentUserName = UserCredentials[j]["name"];
            }
        }
    
        listOfComents.innerHTML += `
        <div id="commentorAndComment">
        <div id="commentorImageSlot">
            <img src="images/commentor pict.jpg" alt="commentorImage" id="commentorImage">
        </div>
        <div id="commetorNameTimeAndParagraph">
            <div id="commentorNameAndTime">
                <h5 class="commentorName">${currentUserName}</h5>(I think there is a bug here!)
                <p id="time">- ${timeAndYear}</p>
            </div>
            <p id="comentParagraph">
                ${comment.value}
            </p>
        </div>
        </div>
        `
    
        newComment["comment"] = comment.value;
        newComment["blogId"] = tittleTex[2];
        newComment["blogTittle"] = tittleTex[1];
        newComment["time"] = timeAndYear;
    
        commentData.push(newComment);
        console.log(commentData);
        localStorage.setItem("comments", JSON.stringify(commentData));
    }else{
        alert("Login to make a comment");
    }
})

