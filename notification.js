document.querySelector('.notification_form button').addEventListener('click', function() {
  let time = document.querySelector('.notification_form input').value  
  let message = document.querySelector('.notification_form textarea').value  

  let info = document.querySelector('.notification_info')

  if(!time || !message){
    info.textContent = "Set time and message"
    info.style.opacity = 1
    setTimeout(()=>{
        info.style.opacity = 0 
    },2000)
    setTimeout(()=>{
       info.textContent = ''
    },3000)
    return
  }
  localStorage.setItem(time, message)
})