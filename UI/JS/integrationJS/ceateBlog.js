const textAreaInput = document.getElementById("articleInput");
const saveButton = document.getElementById("save");
const newBlogTittleInput = document.getElementById("blog_tittle");
const newTittleSlot = document.getElementById("newTittle");
const newBlogAuthor = document.getElementById("blog_author");
const loading = document.querySelector('.loading')

const blogCreationErrorMessageEl = document.querySelector('#blogCreationErrorDisplay')

const fileEl = document.getElementById("backgorundImage");

let imageUlr = ''
let newBlog = {}

saveButton.addEventListener('click', () => {
    loading.innerHTML= `
    <p style='background-color: white; width: 100px; height: auto; color: black; position: fixed'>Loading...<p>
    `
})

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


saveButton.addEventListener('click', async () => {
    console.log(localStorage.getItem('authorization'));
    console.log(newBlog)
    
    const title = newBlogTittleInput.value
    const author = newBlogAuthor.value
    const content = textAreaInput.value

    if(imageUlr !== ''){
        newBlog = { title, author, content, imageUlr }
        console.log( 'the new blog is :', newBlog)
    }
    
    try {
        const res = await fetch('http://localhost:5000/createBlog', {
            method: 'POST',
            body: JSON.stringify(newBlog),
            headers: { 
                'Content-Type': 'application/json',
                'authorization': JSON.parse(localStorage.getItem('authorization'))
            }
        })

        const resMessage  = res

        console.log(resMessage)
        if(resMessage){
            loading.innerHTML = '';
        }

        // console.log(res.cookie)
        // console.log(res.cookies)

        if(resMessage.statusCode === 201){
            location.href = 'Drafts.html'
        }

        if(resMessage.statusCode === 400){
            blogCreationErrorMessageEl.innerHTML = resMessage.error
        }

        if(resMessage.statusCode === 406){
            blogCreationErrorMessageEl.innerHTML = resMessage.message
            location.href = 'AdminLogin.html'
        }
    } catch (error) {
        console.log(error)
    }
})
