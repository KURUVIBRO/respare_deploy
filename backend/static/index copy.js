console.log("Hasdi");
const overlay=document.getElementById('overlay');
var t=0;
let topicCreated=new Array();


/*function openModal(modal){
    if(modal==null) return
    modal.classList.add('active');
    overlay.classList.add('active');
}



function closeModal(modal){
    if(modal==null) return
    modal.classList.remove('active');
    overlay.classList.remove('active');
}*/

function openModal(t_id){
    if(topicCreated.includes(t_id))
        {
            modal=document.getElementById(t_id);
            if(modal==null) return
            modal.classList.add('active');
            overlay.classList.add('active');
            return;
        }
    topicContain=document.getElementById("topic-container");
    //console.log("OpenModal: "+modal);
    var data_c="<div class='topic topic-full' id='"+t_id+"'><button class='close-btn' onclick='closeModal("+t_id+")'>&times;</button></div>";
    topicContain.insertAdjacentHTML('beforeend',data_c);
    modal=document.getElementById(t_id);
    if(modal==null) return
    modal.classList.add('active');
    overlay.classList.add('active');
    fetch('gettopic/',{
        method:'POST',
        headers:{
            'X-CSRFToken': jQuery("input[name=csrfmiddlewaretoken]").val(),
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id:t_id
        })
    }
    ).then(response=>{return response.json()})
    .then(data=>{
        console.log("Topic:"+data.id);
        var u=data;
        modal=document.getElementById(t_id);
        data_c="<div class='topic'><p class='tag'>posted by respare</p><h1>"+u.title+"</h1><p>"+
        u.description+"</p><img src="+u.wide_image+"><div class='poll' id='poll"+u.id+"'></div></div>";
        modal.insertAdjacentHTML('beforeend',data_c);
        topicCreated[t]=t_id;
        t++;
        }
    )
}

function closeModal(t_id){
    modal=document.getElementById(t_id);
    if(modal==null) return
    modal.classList.remove('active');
    overlay.classList.remove('active');
    var topic=document.element
}


overlay.addEventListener('click',()=>{
    //console.log("Clicked");
    const modals=document.querySelectorAll('.topic-full,.active');
    modals.forEach(modal=>{
        closeModal(modal.id);
    })
})

//loadprogress
function UpdateProgressBar(id,value){
    value=value.toFixed(0);
    let s=String(value)+"%";
    document.getElementById("result-"+id).style.width=s;
}
function check(t_id){
fetch('getreactions/',{
    method:'POST',
    headers:{
        'X-CSRFToken': jQuery("input[name=csrfmiddlewaretoken]").val(),
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        id:t_id
    })
}
).then(response=>{return response.json()})
.then(data=>{
if (data!="0"){
        let sum=0;
        data.forEach((u)=>{
            sum+=u.count;
        })
        console.log("Sum="+sum);
        let e;
        let percent=100/sum;
        data.forEach((u)=>{
            //e=document.getElementById(u.id);
            //e.innerHTML=u.count*percent+"%";
            UpdateProgressBar(u.id,u.count*percent);
        })
    }

    }
)
}


//loadchoices
async function loadChoices(t_id){
    
    fetch('getchoices/',{
        method:'post',
        headers:{
            'X-CSRFToken': jQuery("input[name=csrfmiddlewaretoken]").val(),
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id:t_id
        })
    }).then(response=>{
        return response.json()})
        .then(data=>{
        var poll=document.getElementById("poll"+t_id);
        var data_c="<div class='options'>";
        var i=1;
        data.forEach((u)=>{
            data_c=data_c+"<button onclick='f("+u.id+")' class='btn-"+i+"'>"+u.option+"</button>";
            i++;
            })
            data_c=data_c+"<button data-modal-target='"+t_id+"' class='comments' onclick='openModal("+t_id+")' >Comments</button></div><div class='result'>";
            var x=1;
            data.forEach((u)=>{
            data_c=data_c+"<span class='stat btn-"+x+"' id='result-"+u.id+"'></span>";
            x++;
        })
            
        data_c=data_c+"</div>";
        poll.insertAdjacentHTML('beforeend',data_c);
        check(t_id);
        
    }
       )
    }


//topicsloading
async function loadTopics(){
    fetch('gettopics/',{
        method:'get'
    }).then(response=>{
        return response.json()
    }).then(data=>{
        var temp=document.getElementsByClassName("topic-box");
        var topics=temp[0];
        data.forEach((u)=>{
        data_c="<div class='topic'><p class='tag'>posted by respare</p><h1>"+u.title+"</h1><p>"+
        u.description+"</p><img src="+u.wide_image+"><div class='poll' id='poll"+u.id+"'></div></div>";
        //data_c=data_c+"<div class='topic topic-full' id='"+u.id+"'><button class='close-btn' onclick='closeModal("+u.id+")'>&times;</button></div>";
        topics.insertAdjacentHTML('beforeend',data_c);
        loadChoices(u.id);
        console.log("Here");
         
    })
    }
        )
        
    }

loadTopics();
/*comments=document.querySelectorAll('.comments');
        console.log(console[0]);
        close=document.querySelectorAll('.close-btn');
        comments.forEach(button=>{
            button.addEventListener('click',()=>{
                //const modal=document.querySelector(button.dataset.modalTarget);
                console.log("Full Button:"+button);
                const modal=document.getElementById(button.dataset.modalTarget);
                openModal(modal);
            })
        })
        
        close.forEach(button=>{
            button.addEventListener('click',()=>{
                
                const modal=button.closest('.topic-full');
                closeModal(modal);
            })
        })*/
//react
function f(c_id){
    console.log("HI");
    fetch('react/',{
        method:'post',
        headers:{
            'X-CSRFToken': jQuery("input[name=csrfmiddlewaretoken]").val(),
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id:c_id
        })
        }).then(response => {
            return response.json()
         }).then(data =>{
            if(data=="-1")
                window.location.href = "/signin";
            else
                check(data);
          }
         )
    }