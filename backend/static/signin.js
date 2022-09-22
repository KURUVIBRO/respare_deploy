
    var username=document.querySelector('#uname');
    var password=document.querySelector('#pass1');
    username.addEventListener('keyup',function(){
        var check=document.querySelector('#text1');
         if(username.value=="")
                check.style.display='block';
            else
                check.style.display='none';
    })
    
    password.addEventListener('change',function(){
        var check=document.querySelector('#text2');
         if(password.value=="")
                check.style.display='block';
            else
                check.style.display='none';
    })

    function sub(e){
    if(username.value=="" || password.value=="")
        {
            e=e || window.event;
            e.preventDefault();
        }
    }
console.log(username);