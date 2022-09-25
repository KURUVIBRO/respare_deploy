
    var inputs=document.getElementsByClassName("form-control");
    function check(i){
        input=document.getElementById(i);
        var req=document.getElementById(i+"-req");
         if(input.value=="")
                req.style.display='block';
            else
                req.style.display='none';
    
    }
    
    password.addEventListener('change',function(){
        var check=document.querySelector('#text2');
         if(password.value=="")
                check.style.display='block';
            else
                check.style.display='none';
    })

    function sub(e){
        for(var i=0;i<inputs.length;i++)
            if(inputs[i].value=="")
                {
                    e=e || window.event;
                    e.preventDefault();
                    var req=document.getElementById((inputs[i].id)+"-req");
                    req.style.display='block';
                    
                }
    }
console.log(username);