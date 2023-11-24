const cl = console.log;
const postsContainer = document.getElementById("postsContainer");
const postForm = document.getElementById("postForm");
const titleControl = document.getElementById("title");
const bodyControl = document.getElementById("body");
const userIdControl = document.getElementById("userId");

let baseUrl = `https://jsonplaceholder.typicode.com`

let postsUrl = `${baseUrl}/posts`

let postArray = [];
// templating

const templating = (arr) => {
    let result = ``;
    arr.forEach(post => {
        result += `<div class="card mb-4">
                   <div class="card-header">
                      <h2>${post.title}</h2>
                   </div>
                   <div class="card-body">
                     <p>
                           ${post.body} 
                     </p>
                  </div>
                 <div class="card-footer d-flex justify-content-between">
                     <button class="btn btn-outline-primary">
                        Edit
                     </button>
                     <button class="btn btn-outline-danger">
                        Delete
                     </button>
           
                </div>
                </div>  `
    });
    postsContainer.innerHTML = result;
}

const onSubmitPost = (eve) =>{
    eve.preventDefault();
    let newPost = {
        title : titleControl.value,
        body : bodyControl.value,
        userId : userIdControl.value
    }
    cl(newPost);


    let xhr = new XMLHttpRequest();
    xhr.open("POST", postsUrl , true);

    xhr.send(JSON.stringify(newPost));

    xhr.onload = function(){
        if(xhr.status === 200 || xhr.status === 201){
            //cl(xhr.response)
            newPost.id = JSON.parse(xhr.response).id;
           postArray.push(newPost);
           templating(postArray)
    }
  }
}


const getAllPosts = () => {
//1.create a instance/object XMLHttpRequest

let xhr = new XMLHttpRequest();

//2.configuration of API call

xhr.open("GET", postsUrl,true);

//3.
xhr.send();

//4.
xhr.onload = function(){
     if(xhr.status === 200){
       // cl(xhr.response)

       postArray= JSON.parse(xhr.response)
   // cl(data)
    templating(postArray);
     }else{
        alert("something went wrong !!!")
     }
   
   

   // cl(Xhr.status) // 200
   // cl(Xhr.statusText) // 200
 }
}
getAllPosts();

postForm.addEventListener("submit",onSubmitPost);
