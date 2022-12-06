let linkDataFromLocal = JSON.parse(localStorage.getItem("linkData"));
const previewButton = document.getElementById("preview");
let previewedRAMflag = [];
let previewedRAM = {};
let flag = true;
console.log(linkDataFromLocal);

let urlArray = [];


fileEl.addEventListener("change", () => {
    // previewedRAM = {};
    const fr = new FileReader();
    fr.readAsDataURL(fileEl.files[0]);

    fr.addEventListener("load", () =>{
        const url = fr.result;
        console.log("the url is: ",url);

        urlArray.push(url);
        if(url !== ""){
            localStorage.setItem("imageUlr", JSON.stringify(urlArray));
        }
       
        //console.log(url);
        // let image = new Image();
        // image.src = url;
        // document.body.append(image);
    })
})

previewButton.addEventListener("click",function(){
    flag = false;
    let imageUrlFromLocal = JSON.parse(localStorage.getItem("imageUlr"));
    //published restore
    // published = JSON.parse(localStorage.getItem("PublishedblogData"));

    //tittle displaying and refresh
    let tittle = newBlogTittleInput.value;
    newTittleSlot.innerHTML = tittle + " by: " + newBlogAuthor.value;

    //Save to localstarage
    let iD = idGenerator();
    console.log(iD);
    previewedRAM["Tittle"] = newBlogTittleInput.value;
    previewedRAM["Author"] = newBlogAuthor.value;
    previewedRAM["blog"] = textAreaInput.value;
    previewedRAM["blogId"] = iD;
    previewedRAM["backgroundImage"] = imageUrlFromLocal[0];
    console.log(previewedRAM);
    if(JSON.parse(localStorage.getItem("linkData")) !== null){
        linkDataFromLocal.splice(0, 1)
        linkDataFromLocal.unshift(flag);
        localStorage.setItem("linkData", JSON.stringify(linkDataFromLocal));
    }
    previewedRAMflag.push(flag);
    previewedRAMflag.push(previewedRAM);
    //newBlogTittleInput.value = "";
    //newBlogAuthor.value = "";
    // textAreaInput.value = "";
    localStorage.setItem( "PreviwedblogData",JSON.stringify(previewedRAMflag));
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