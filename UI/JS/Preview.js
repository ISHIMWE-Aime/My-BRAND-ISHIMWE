let linkDataFromLocal = JSON.parse(localStorage.getItem("linkData"));
const previewButton = document.getElementById("preview");
let previewedRAMflag = [];
let previewedRAM = {};
let flag = true;

previewButton.addEventListener("click",function(){
    flag = false;
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
    console.log(previewedRAM);

    linkDataFromLocal.splice(0, 1)
    linkDataFromLocal.unshift(flag);
    previewedRAMflag.push(flag);
    previewedRAMflag.push(previewedRAM);
    //newBlogTittleInput.value = "";
    //newBlogAuthor.value = "";
    // textAreaInput.value = "";
    localStorage.setItem("linkData", JSON.stringify(linkDataFromLocal));
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