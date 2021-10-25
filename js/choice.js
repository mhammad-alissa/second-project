
let name1=document.getElementsByClassName("user-N")[0]
let string3=sessionStorage.getItem('currentUser')
string3=string3.slice(0,string3.indexOf(','));
console.log(string3)
name1.innerHTML=string3.slice(0,string3.indexOf(" "))
console.log(string3)
