let regexEmail = /^[a-z0-9._-]+@(gmail|yahoo).com$/;
let passMobile = /^[0-9]{5,18}$/i;
let userArray;
try{
     userArray = JSON.parse(localStorage.getItem("myUsers"));
     
}catch(ex){
 userArray=new Array();
console.log(ex.massage);
}


// email
const logEmail = document.getElementById('loginEmail');
const logEmailMessage = document.getElementById('loginEmailMessage');
// password
const logPassword = document.getElementById('loginPassword');
const logPassMessage = document.getElementById('loginPassMessage');
// botton
const logSubmit = document.getElementById('loginSubmit');



logEmail.addEventListener('keyup', () => {
    logEmailMessage.innerText='';
    if(logEmail.value.length >=5) {

        if (logEmail.value.match(regexEmail)) {
            // logEmail.style.border="2px solid #32CD32 ";
            // logEmail.style.boxShadow="0px 0px 0px 3px #32CD32 ";
            logEmailMessage.style.display='none'
        }else{
            logEmailMessage.style.color='rgb(199, 0, 0)';
            logEmailMessage.innerText="Invalid Email";
            logEmailMessage.style.display=''
        }
    }else {
        logEmail.style.border='none';
        logEmail.style.borderBottom='2px solid black';
        logEmail.style.boxShadow='';
    }if(logEmail.value==''){
        logEmailMessage.style.display='none'
    }

})

logPassword.addEventListener('keyup', () => {
    logPassMessage.innerText='';
    if(logPassword.value.length >=5 ){

        if (logPassword.value.match(passMobile)) {
            logPassword.style.border="";
            logPassword.style.border="2px solid #32CD32 ";
            logPassword.style.boxShadow="0px 0px 0px 3px #32CD32 ";
        }
    }else {
        logPassword.style.border='none';
        logPassword.style.borderBottom='2px solid black';
        logPassword.style.boxShadow='';
    }

})


var boolPass=false;
var boolEmail=false;
var boolValidate = false;
var currentUserName;
var currentUserEmail;
function validateform(){
    if (logEmail.value == "") {
       
        logEmailMessage.style.color='rgb(199, 0, 0)';
        logEmailMessage.innerText='please Enter the email';
        boolEmail=false;
    } else{boolEmail=true}
    if (logPassword.value == ""){
        logPassMessage.style.color='rgb(199, 0, 0)';
        logPassMessage.innerText='Enter the password';
        boolPass=false;
    }else {boolPass=true;}

    if(userArray != 'null'){
    
    for (const iterator of userArray) {
        
        if(iterator.email == logEmail.value && iterator.pass == logPassword.value){
            boolValidate=true;
            currentUserName=iterator.name;
            currentUserEmail=iterator.email;
        }

    }
}
    if(boolPass && boolEmail && boolValidate){
            sessionStorage.setItem('currentUser',[currentUserName,currentUserEmail]);
    }
    return (boolPass && boolEmail && boolValidate);

}
