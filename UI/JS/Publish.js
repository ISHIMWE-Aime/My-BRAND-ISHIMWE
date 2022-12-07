const publishButton = document.getElementById("publish");
let fromLocalStoreDrafts =JSON.parse(localStorage.getItem("blogData"));//for saving a drafts at the time when publish button is pressed.

if(fromLocalStoreDrafts === null){
    fromLocalStoreDrafts = [];
}

let published = [];
let publishedData = {};

/* There is no need of repeating this code because there are on other page
linked on the same file as this linked to*/

// fileEl.addEventListener("change", () => {
//     publishedData = {};
//     const fr = new FileReader();
//     fr.readAsDataURL(fileEl.files[0]);

//     fr.addEventListener("load", () =>{
//         const url = fr.result;
//         console.log(url)

//         urlArray.push(url);
//         if(url !== ""){
//             localStorage.setItem("imageUlr", JSON.stringify(urlArray));
//         }
//         //console.log(blogData);
//         // let image = new Image();
//         // image.src = url;
//         // document.body.append(image);
//     })
// })


// console.log("The image link is ", imageUrlFromLocal);

publishButton.addEventListener("click",function(){

    let imageUrlFromLocal = JSON.parse(localStorage.getItem("imageUlr"));

    if(imageUrlFromLocal == null )
        console.log("it is a null image");

    console.log("The image link is ", imageUrlFromLocal);

    if(JSON.parse(localStorage.getItem("PublishedblogData")) !== null){
        published = JSON.parse(localStorage.getItem("PublishedblogData"))
        //tittle displaying and refresh
        let tittle = newBlogTittleInput.value;
        newTittleSlot.innerHTML = tittle + " by: " + newBlogAuthor.value;

        //Save to localstarage
        let iD = idGenerator();
        console.log(iD);
        publishedData["Tittle"] = newBlogTittleInput.value;
        publishedData["Author"] = newBlogAuthor.value;
        publishedData["blog"] = textAreaInput.value;
        publishedData["blogId"] = iD;
        publishedData["backgroundImage"] = imageUrlFromLocal[0];

        console.log(publishedData);
        
        published.push(publishedData);
        fromLocalStoreDrafts.push(publishedData);

        newBlogTittleInput.value = "";
        newBlogAuthor.value = "";
        textAreaInput.value = "";

        localStorage.setItem( "PublishedblogData",JSON.stringify(published));
        localStorage.setItem( "blogData",JSON.stringify(fromLocalStoreDrafts));
    }else {
        let tittle = newBlogTittleInput.value;
        newTittleSlot.innerHTML = tittle + " by: " + newBlogAuthor.value;

        //Save to localstarage
        let iD = idGenerator();
        console.log(iD);
        publishedData["Tittle"] = newBlogTittleInput.value;
        publishedData["Author"] = newBlogAuthor.value;
        publishedData["blog"] = textAreaInput.value;
        publishedData["blogId"] = iD;
        publishedData["backgroundImage"] = imageUrlFromLocal[0];

        console.log(publishedData);

        published.push(publishedData);
        fromLocalStoreDrafts.push(publishedData);

        newBlogTittleInput.value = "";
        newBlogAuthor.value = "";
        // textAreaInput.value = "";

        localStorage.setItem( "PublishedblogData",JSON.stringify(published));
        localStorage.setItem( "blogData",JSON.stringify(fromLocalStoreDrafts));
    }

})

function idGenerator(){
    let character = "";
    let iD = "";
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
        iD += character;
    }
    return iD;
}
