const textAreaInput = document.getElementById("articleInput");
const saveButton = document.getElementById("save");
const newBlogTittleInput = document.getElementById("blog_tittle");
const newTittleSlot = document.getElementById("newTittle");
const newBlogAuthor = document.getElementById("blog_author");

const blogCreationErrorMessageEl = document.querySelector('#blogCreationErrorDisplay')

const fileEl = document.getElementById("backgorundImage");

const title = newBlogTittleInput.value
const author = newBlogAuthor.value
const content = textAreaInput.value
let imageUlr = ''
let newBlog = {}

fileEl.addEventListener("change", () => {
    blogData = {};
    const fr = new FileReader();
    fr.readAsDataURL(fileEl.files[0]);

    fr.addEventListener("load", () =>{
        const url = fr.result;
        console.log(url)

        urlArray.push(url);
        if(url !== ""){
            // localStorage.setItem("imageUlr", JSON.stringify(urlArray));
            imageUlr = url
        }
    })
})

if(imageUlr !== ''){
    newBlog = { title, author, content, imageUlr }
}

saveButton.addEventListener('click', async () => {
    try {
        const res = await fetch('https://important-red-beanie.cyclic.app/createBlog', {
            method: 'POST',
            body: JSON.stringify(newBlog),
            headers: { 'Content-Type': 'application/json'}
        })

        const resMessage = res.json()
        if(resMessage.statusCode === 201){
            location.href = 'Drafts.html'
        }

        if(resMessage.statusCode === 400){
            blogCreationErrorMessageEl.innerHTML = resMessage.error
        }
    } catch (error) {
        console.log(error)
    }
})
