var socket = io()
let name;
let text = document.getElementById('textarea')
let messagearea = document.querySelector('.message__area')
do{
    name = prompt('Enter your name!')  
} while (!name);

text.addEventListener('keyup',(e)=>{
     if (e.keyCode==13) {
        sendMessage(e.target.value.trim())
     }
})

function sendMessage(msg){
   let message = {
        user : name,
        mess : msg
   }
  
   appendMessage(message,'outgoing')
      scrollamount()
     text.value=""
   socket.emit('message',message)

}

function appendMessage(message,type){
     let element = document.createElement('div')
     let classname = type
     element.classList.add(classname,'message')

     let markup = ` <h1 style="color: red;">${message.user}</h1>
     <p style="color: red;">${message.mess}</p>`

     element.innerHTML=markup

        messagearea.appendChild(element)    
}

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollamount()
})

function scrollamount(){
    messagearea.scrollTop = messagearea.scrollHeight
}