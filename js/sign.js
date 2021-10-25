
let regexEmail = /^[a-z0-9._-]+@(gmail|yahoo).com$/;
let passMobile = /^[0-9]{5,18}$/i;
let userArray;
var userCount=0;
let myUser;
let users;

try{
    userArray  = JSON.parse(localStorage.getItem("myUsers"));
    users=userArray;
    userCount=users.length;
  
}catch(ex){
 userArray=[];
 userCount = 0;
users=new Array();
}
class User{
    constructor(name,email,pass){
            this.name=name;
            this.pass=pass;
            this.email=email;
    }
    static addUser(name,email,pass){

           myUser = new User(name,email,pass);
           users[userCount++]=myUser;
           localStorage.setItem("myUsers",JSON.stringify(users));
    }

}


// ----------------- sign Up -------------------

// fullname
const fullName = document.getElementById('fullName');
const nameMessage = document.getElementById('signNameMessage');
// email
const email =document.getElementById('signUpEmail');
const emailMessage = document.getElementById('signEmailMessage');
// password
const password = document.getElementById('signUpPassword');
const passMessage = document.getElementById('signPassMessage');
// botton
const subbtn = document.getElementById('signSubmit');

// fullname condition
fullName.addEventListener('keyup' , () =>{
    nameMessage.innerText='';
    if (fullName.value.includes(' ') && fullName.value.length >= 3){
        fullName.style.border="3px solid #32CD32";
        fullName.style.boxShadow="1px 0px 2px #32CD32";
    }else { 
        fullName.style.border='none';
        fullName.style.borderBottom='2px solid black';
        fullName.style.boxShadow='';
    }
})
// email condition
email.addEventListener('keyup', () => {
    emailMessage.innerText='';
    if(email.value.length >=5) {

        if (email.value.match(regexEmail)) {
            email.style.border="3px solid #32CD32";
            email.style.boxShadow="1px 0px 2px #32CD32";
            emailMessage.style.display='none'
        }else{
            emailMessage.style.color='rgb(199, 0, 0)';
            emailMessage.innerText="Invalid Email";
            emailMessage.style.display=''
        }
    }else {
        email.style.border='none';
        email.style.borderBottom='2px solid black';
        email.style.boxShadow='';
    }if(email.value==''){
        emailMessage.style.display='none'
    }

})
// password condition
password.addEventListener('keyup', () => {
    passMessage.innerText='';
    if(password.value.length >=5 ){

        if (password.value.match(passMobile)) {
            password.style.border="3px solid #32CD32";
            password.style.boxShadow="1px 0px 2px #32CD32";
        }
    }else {
        password.style.border='none';
        password.style.borderBottom='2px solid black';
        password.style.boxShadow='';
    }

})


var boolPass=false;
var boolEmail=false;
var boolName=false;
var boolValidate = true;

function validateform(){
    boolValidate = true;
    if (! (fullName.value.includes(' ') && fullName.value.length >= 3)){
        nameMessage.style.color='rgb(199, 0, 0)';
        nameMessage.innerText='please Enter Your Full Name';
        boolName=false;
        }else {boolName=true;}


        if (email.value == "") {
            emailMessage.style.color='rgb(199, 0, 0)';
            emailMessage.innerText='please Enter the email';
            boolEmail=false;
        } else{boolEmail=true;}

        
    if (password.value == ""){
        passMessage.style.color='rgb(199, 0, 0)';
        passMessage.innerText='Enter the password';
        boolPass=false;
    }else {boolPass=true;}
    

try{
    
    for (const iterator of userArray) {
       
        if((iterator.email+"") == email.value){
            
            boolValidate=false;
            if(boolEmail){
            emailMessage.style.color='rgb(199, 0, 0)';
            emailMessage.innerText='The email is already taken';
            emailMessage.style.display='';
            }
            break;
        
        }

    }
}catch(ex){
console.log(ex.massage);
boolValidate=true;
}

   if(boolPass && boolEmail && boolValidate && boolName){
    User.addUser(fullName.value,email.value,password.value)
    sessionStorage.setItem('currentUser',[fullName.value,email.value]);
   }else{
       console.log(boolName,boolEmail,boolValidate,boolPass);
   }
  


    return (boolPass && boolEmail && boolValidate && boolName);

}

