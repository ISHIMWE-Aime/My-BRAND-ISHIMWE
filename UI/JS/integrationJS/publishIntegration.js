const publishButton = document.getElementById("publish");

publishButton.addEventListener('click', async () => {
    console.log(localStorage.getItem('authorization'));
    console.log(newBlog)
    
    const title = newBlogTittleInput.value
    const author = newBlogAuthor.value
    const content = textAreaInput.value

    //console.log({ title, author, content, imageUlr })
    newBlog = { title, author, content, imageUlr }
    console.log( 'the new blog is :', newBlog)
    
    try {
        const res = await fetch('https://important-red-beanie.cyclic.app/publishBlog', {
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