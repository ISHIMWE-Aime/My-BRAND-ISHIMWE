let tittleTex = JSON.parse(localStorage.getItem("linkData"));
let previewDataFromLocal = JSON.parse(localStorage.getItem("PreviwedblogData"));
let dataFromDataBase = JSON.parse(localStorage.getItem("PublishedblogData"));
const blogViewTittle = document.getElementById("BlogViewTittle");
console.log(tittleTex, blogViewTittle);

// style = window.getComputedStyle(blogViewTittle);
// top = style.getPropertyValue('top');
// console.log(top);


const paragraphSlot = document.getElementById("paragraph");
const blogImage = document.getElementById("blogImageslot");
console.log(paragraphSlot);

// for(let i = 0; i < tittleTex.length; i++){
//     blogViewTittle.innerHTML = tittleTex;
// }
// console.log(dataFromDataBase);
if((JSON.parse(localStorage.getItem("linkData")) !== null) && (tittleTex[0] === true)){
    if(tittleTex[0] == true){    
        blogViewTittle.innerHTML = tittleTex[1];
        for(let i = 0; i < dataFromDataBase.length; i++){
            for(const property in dataFromDataBase[i]){
                if(dataFromDataBase[i][property] === tittleTex[1]){
                    console.log(dataFromDataBase[i][property]);
                    blogImage.innerHTML = `
                    <img src=${dataFromDataBase[i]["backgroundImage"]} alt="" id="blogImage">
                    `
                    paragraphSlot.innerHTML  = dataFromDataBase[i]["blog"];
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


