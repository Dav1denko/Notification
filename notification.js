update()

document.querySelector('.notification_form button').addEventListener('click', function () {
    let time = document.querySelector('.notification_form input').value
    let message = document.querySelector('.notification_form textarea').value

    let info = document.querySelector('.notification_info')

    if (!time || !message) {
        info.textContent = "Set time and message"
        info.style.opacity = 1
        setTimeout(() => {
            info.style.opacity = 0
        }, 2000)
        setTimeout(() => {
            info.textContent = ''
        }, 3000)
        return
    }
    localStorage.setItem(time, message)
    update()
})

document.querySelector('.notification_list > button').addEventListener('click', function () {
    if (localStorage.length && confirm("do you want clear list notification?")) {
        localStorage.clear()
        update()
        document.querySelector('.notification_list').hidden = true
    } else if (!localStorage.length) {
        alert("No notification!")
    }
})

function update() {
    if (!localStorage.length) {
        document.querySelector('.notification_list').hidden = true
    } else {
        document.querySelector('.notification_list').hidden = false
    }
    document.querySelector('.notification_list > div').innerHTML = ''
    document.querySelector('.notification_info').textContent = ''
    for (let key of Object.keys(localStorage)) {
        document.querySelector('.notification_list > div').insertAdjacentHTML(`beforeend`, `
        <div class="notification_item">
            <div>${key} - ${localStorage.getItem(key)}</div>
            <button data-time="${key}">&times;</button>
            </div>
        `)
    }
    document.querySelector('.notification_form input').value = ''
    document.querySelector('.notification_form textarea').value = ''
    if (document.querySelector('.audioAlert')) {
        document.querySelector('.audioAlert').remove()
    }
}

document.querySelector('.notification_list').addEventListener('click', function (e) {
    if (!e.target.dataset.time) {
        return
    }
    localStorage.removeItem(e.target.dataset.time)
    update()
})

setInterval(() => {
    let currentDate = new Date()
    let currentHour = currentDate.getHours()
    if (currentHour < 10) {
        currentHour = '0' + currentHour
    }
    let currentMinute = currentDate.getMinutes()
    if (currentMinute < 10) {
        currentMinute = '0' + currentHour
    }
    let currentTime = '${currentHour}:${currentMinute}'
    for (let key of Object.keys(localStorage)) {
        let keyHour = key.split(':')[0]
        let keyMinute = key.split(':')[1]

        if (key == currentTime || (keyHour == currentHour && keyMinute < currentMinute)) {
            document.querySelector(`button[data-time="${key}"]`).closest(`.notification_item`).classList.add(`notification_warning`)
            if (!document.querySelector('.audioAlert')) {
                document.querySelector('body').insertAdjacentHTML('afterbegin', `<audio
        loop class="audioAlert"><source src="alert.mp3" type="audio/mpeg"></audio>`)
                document.querySelector('.audioAlert').play()
            }
        }
    }
}, 1000)