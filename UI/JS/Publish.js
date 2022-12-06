const publishButton = document.getElementById("publish");
let published = [];
let publishedData = {};

fileEl.addEventListener("change", () => {
    publishedData = {};
    const fr = new FileReader();
    fr.readAsDataURL(fileEl.files[0]);

    fr.addEventListener("load", () =>{
        const url = fr.result;
        console.log(url)
        publishedData["backgroundImage"] = url;
        console.log(blogData);
        // let image = new Image();
        // image.src = url;
        // document.body.append(image);
    })
})

publishButton.addEventListener("click",function(){
    //published restore
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
        console.log(publishedData);
        published.push(publishedData);
        newBlogTittleInput.value = "";
        newBlogAuthor.value = "";
        // textAreaInput.value = "";
        localStorage.setItem( "PublishedblogData",JSON.stringify(published));
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
        console.log(publishedData);
        published.push(publishedData);
        //newBlogTittleInput.value = "";
        //newBlogAuthor.value = "";
        // textAreaInput.value = "";
        localStorage.setItem( "PublishedblogData",JSON.stringify(published));
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
