var inputs=document.getElementsByClassName("form-control");
var flag=1,pflag=0;
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
        if(flag==1 || pflag==1){
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

function check_password(pass){
    document.getElementById("pass1-check").style.display="none";
    document.getElementById("pass2-check").style.display="none";
    check(pass);
    console.log("Hi");
    var pass1=document.getElementById("pass1").value;
    var pass2=document.getElementById("pass2").value;
    if(pass1!=pass2)
        {
            console.log("Incorrect: "+pass1+" "+pass2);
            pflag=1;
            document.getElementById("pass1-check").style.display="block";
            document.getElementById("pass2-check").style.display="block";
        }
    else
        pflag=0;
}
