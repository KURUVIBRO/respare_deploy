console.log("Hasdi");
const overlay=document.getElementById('overlay');
var t=0;
let topicCreated=new Array();
var temp_topic;
var temp_choices;
var temp_reactions;


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


function show_offensive(t_id)
{
    off=document.getElementById("off-"+t_id);
    off.style.opacity=100;
    off2=document.getElementById("off-msg");
    off2.style.opacity=100;
    //off2.style.display="block";
}
function close_offense(t_id)
{
    off=document.getElementById("off-"+t_id);
    off.style.opacity=0;
    off2=document.getElementById("off-msg");
    off2.style.opacity=0;
    //off2.style.display="none";
}
function openModal(t_id){
    
    modal=document.getElementById(t_id);
    if(modal==null) return
    modal.classList.add('active');
    overlay.classList.add('active');
    console.log("Hi");
    textarea = document.getElementById("c-input"+t_id);
    textarea.addEventListener('input', autoResize, false);
    
    function autoResize() {
        console.log("Hi");
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    }

}

function closeModal(t_id){
    modal=document.getElementById(t_id);
    if(modal==null) return
    modal.classList.remove('active');
    overlay.classList.remove('active');
    off2=document.getElementById("off-msg");
    off2.style.opacity=0;
    //off2.style.display="none";
    //close_offense(t_id);
}


overlay.addEventListener('click',()=>{
    //console.log("Clicked");
    const modals=document.querySelectorAll('.topic-full,.active');
    modals.forEach(modal=>{
        closeModal(modal.id);
    })
})

//loadprogress
function UpdateProgressBar(id,value,string){
    value=value.toFixed(0);
    let s=String(value)+"%";
    var el;
    
    if(string=="full")
        el=string+"result-"+id;
    else
        el="result-"+id;
    document.getElementById(el).style.width=s;
}
function check(t_id,string){
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
            UpdateProgressBar(u.id,u.count*percent,string);
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
        temp_choices=data;
        data.forEach((u)=>{
            data_c=data_c+"<button onclick='f("+u.id+")' class='btn-"+i+"'>"+u.option+"</button>";
            i++;
            })
            data_c=data_c+"<button data-modal-target='"+t_id+"' class='comments-btn' onclick='openModal("+t_id+")' ><i class='fa fa-comments'></i></button></div><div class='result'>";
            var x=1;
            data.forEach((u)=>{
            data_c=data_c+"<span class='stat btn-"+x+"' id='result-"+u.id+"'></span>";
            x++;
        })
        data_c=data_c+"</div>";
        poll.insertAdjacentHTML('beforeend',data_c);
        check(t_id);

        var data_c="<div class='options'>";
        var fullpoll=document.getElementById("full-poll"+t_id);
        i=1;
        data.forEach((u)=>{
            data_c=data_c+"<button onclick='f("+u.id+")' class='btn-"+i+"'>"+u.option+"</button>";
            i++;
            })
            //data_c=data_c+"<button data-modal-target='"+t_id+"' class='comments' onclick='openModal("+t_id+")' >Comments</button></div><div class='result'>";
            var x=1;
            data_c=data_c+"</div><div class='result'>";
            data.forEach((u)=>{
            data_c=data_c+"<span class='stat btn-"+x+"' id='fullresult-"+u.id+"'></span>";
            x++;
        })
        data_c=data_c+"</div>";
        fullpoll.insertAdjacentHTML('beforeend',data_c);
        
    }
       )
    }

    async function loadComments(t_id){
        var link="topic/"+t_id+"/comments/";
        fetch(link,{
            method:'get'
        }).then(response=>{
            return response.json()
        }).then(data=>{
            comments=document.getElementById("comments"+t_id);
            data.forEach((u)=>{
                data_c="<div class='comment'><a href='/user/"+u.user+"'>"+u.user+"</a><p>"+u.body+"</p></div>";
                console.log("Here:"+data_c);
                comments.insertAdjacentHTML('beforeend',data_c);
            })
            //console.log(data[0].user);
            
            //console.log(data[0], data_c);
            
        })
    }

    
    async function comment(t_id){
        textbox=document.getElementById("c-input"+t_id);
        console.log(textbox.value);
        var link="topic/"+t_id+"/comment/";
        fetch(link,{
            method:'POST',
            headers:{
            'X-CSRFToken': jQuery("input[name=csrfmiddlewaretoken]").val(),
            'Content-Type':'application/json'
            },
            body:JSON.stringify({
                body:textbox.value
            })
        }).then(response=>{return response.json()})
        .then(data=>{
            if(data=="0")
                window.location.href = "/signin";
            else if(data=="1")
                {
                console.log("Offensive");
                show_offensive(t_id);}
            else
                {
            close_offense(t_id);
            data_c="<div class='comment'><a>"+data.user+"</a><p>"+data.body+"</p></div>";
            comments=document.getElementById("comments"+t_id);
            comments.insertAdjacentHTML('afterbegin',data_c);
            textbox.value="";}
           // self.location.reload();
        })
        //$( '.comments').load(location.href+" .comments");
       // $('#comments').load(document.URL +  ' #comments');
    }
    
//topicsloading
async function loadTopics(){
    fetch('gettopics/',{
        method:'get'
    }).then(response=>{
        return response.json()
    }).then(data=>{
        temp_topic=data;
        var temp=document.getElementsByClassName("topic-box");
        var topics=temp[0];
        data.forEach((u)=>{
        data_c="<div class='topic' onclick='openModal("+u.id+")'><p class='tag'>posted by respare</p><h1>"+u.title+"</h1><p>"+
        u.description+"</p><img src="+u.wide_image+"><div class='poll' id='poll"+u.id+"'></div></div>";
        data_c=data_c+"<div class='topic topic-full' id='"+u.id+"'><button class='close-btn' onclick='closeModal("+u.id+")'>&times;</button><div class='topic full'><p class='tag'>posted by respare</p><h1>"+u.title+"</h1><p>"+
        u.description+"</p><img src="+u.wide_image+"><div class='poll' id='full-poll"+u.id+"'></div><div class='comment-section' id='comment-section"+u.id+"'><div class='comments-input'><div class='comment-send'>"+
        "<textarea id='c-input"+u.id+"' rows='1' onchange='close_offense("+u.id+")' columns='' placeholder='Share are your opinion' onchange='linebreak("+u.id+")'></textarea><button class='post' onclick='comment("+u.id+")'><i class='fa fa-send-o'></i></button></div><div class='hatespeech' id='off-"+u.id+"'><span>! Offensive Language Detected</span></div></div><div id='comments"+u.id+"' class='comments'><h3>Comments</h3></div></div></div></div>";
        topics.insertAdjacentHTML('beforeend',data_c);
        
        loadChoices(u.id);
        loadComments(u.id);
        //modal=document.getElementById(u.id);
        //var data_full;
        //data_full="<div class='topic'><p class='tag'>posted by respare</p><h1>"+u.title+"</h1><p>"+
        //u.description+"</p><img src="+u.wide_image+"><div class='poll' id='full-poll"+u.id+"'></div></div>";
        //data_c=data_c+"<div class='topic topic-full' id='"+u.id+"'><button class='close-btn' onclick='closeModal("+u.id+")'>&times;</button></div>";
        //modal.insertAdjacentHTML('beforeend',data_full);
        
        
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
                {
                    check(data,"none");
                    check(data,"full");
                }
          }
         )
    }

/*window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        loadTopics();
    }
};*/