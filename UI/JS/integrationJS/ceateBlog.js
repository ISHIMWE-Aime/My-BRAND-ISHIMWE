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

// reset error message
newBlogTittleInput.addEventListener('input', ()=>{
    blogCreationErrorMessageEl.remove()
})
newBlogAuthor.addEventListener('input', ()=>{
    blogCreationErrorMessageEl.remove()
})
textAreaInput.addEventListener('input', ()=>{
    blogCreationErrorMessageEl.remove()
})

saveButton.addEventListener('click', async () => {
    console.log(localStorage.getItem('authorization'));
    console.log(newBlog)
    
    const title = newBlogTittleInput.value
    const author = newBlogAuthor.value
    const content = textAreaInput.value

    //console.log({ title, author, content, imageUlr })
    newBlog = { title, author, content, imageUlr }
    console.log( 'the new blog is :', newBlog)
    
    try {
        const res = await fetch('https://important-red-beanie.cyclic.app/createBlog', {
            method: 'POST',
            body: JSON.stringify(newBlog),
            headers: { 
                'Content-Type': 'application/json',
                'authorization': JSON.parse(localStorage.getItem('authorization'))
            }
        })

        const resMessage  = await res.json()

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
            var style = document.createElement('style');
            style.innerHTML = `
            #blogCreationErrorDisplay {
                    background-color: rgba(255, 0, 0, 0.602);;
                    border-radius: 10px;
                    padding: 20px;
                    width: 25%;
                    border: 2px solid;
                }
            `
            document.head.appendChild(style);

            if(resMessage.message[0].author !== undefined ){
                blogCreationErrorMessageEl.innerHTML = resMessage.message[0].author
            }
            if(resMessage.message[0].title !== undefined){
                blogCreationErrorMessageEl.innerHTML += `<br> ${resMessage.message[0].title}`
            }
            if(resMessage.message[0].content !== undefined){
                blogCreationErrorMessageEl.innerHTML += `<br> ${resMessage.message[0].content}`
            }
            if(resMessage.message[0].imageUlr !== undefined){
                blogCreationErrorMessageEl.innerHTML += `<br> ${resMessage.message[0].imageUlr}`
            }
        }

        if(resMessage.statusCode === 406){
            blogCreationErrorMessageEl.innerHTML = resMessage.message
            location.href = 'AdminLogin.html'
        }
    } catch (error) {
        console.log(error)
    }
})

//for each reload
forEachReload()
async function forEachReload(){
    blogDataFromDB = await fetch('https://important-red-beanie.cyclic.app/allBlogs', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'authorization': JSON.parse(localStorage.getItem('authorization'))
        }
    })
    blogDataFromDB = await blogDataFromDB.json()
    console.log(blogDataFromDB.data)

    forEdit(blogDataFromDB)
}

let forEdit = (dataBase) =>{
    if(JSON.parse(localStorage.getItem("linkDataForEdit")) !== null){
        let articleToEditTittle = JSON.parse(localStorage.getItem("linkDataForEdit"));
        if(articleToEditTittle[0] === true){
            // dataBase = JSON.parse(localStorage.getItem("blogData"));
            newBlogTittleInput.value = articleToEditTittle[1];
            console.log(dataBase.data.length)
            for(let i = 0; i < dataBase.data.length; i++){
                for(const property in dataBase.data[i]){
                    if(dataBase.data[i][property] === articleToEditTittle[1]){
                        console.log(dataBase.data[i][property]);
                        textAreaInput.value = dataBase.data[i]["content"];
                        newBlogAuthor.value = dataBase.data[i]["author"];
                    }
                }
            } 
            articleToEditTittle[0] = false; // for interlocking editor access
            localStorage.setItem("linkDataForEdit", JSON.stringify(articleToEditTittle));
        }
    }
}