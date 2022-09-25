var inputs=document.getElementsByClassName("form-control");
var flag=1;
    function check(i){
            input=document.getElementById(i);
            var req=document.getElementById(i+"-req");
             if(input.value=="")
                    req.style.display='block';
                else
                    req.style.display='none';
        
    }

    function unameChange(){
        document.querySelector("#uname-taken").style.display="none";
        document.querySelector("#uname-avail").style.display="none";
        check("uname");
    }

    function sub(e){
        for(var i=0;i<inputs.length;i++)
            if(inputs[i].value=="")
                {
                    e=e || window.event;
                    e.preventDefault();
                    var req=document.getElementById((inputs[i].id)+"-req");
                    req.style.display='block';
                    
                }
        check_uname();
        if(flag==1){
            e=e || window.event;
            e.preventDefault();
        }
    }

    function check_uname(){
        var uname=document.getElementById("uname").value;
        if(uname=="")
            return;
        console.log(uname);
        fetch('check_uname',{
            method:'POST',
            headers:{
                'X-CSRFToken': jQuery("input[name=csrfmiddlewaretoken]").val(),
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({uname})
        }).then(response=>{
            return response.json()
        }).then(data=>{
            console.log(data);
            if(data==1){
                var taken=document.querySelector("#uname-taken");
                taken.style.display="block";
                flag=1;
                console.log(flag);
            }
            else{
                var avail=document.querySelector("#uname-avail");
                avail.style.display="block";
                flag=0;
            }
        })
    }

