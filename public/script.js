const hamburger = document.querySelector('.hamburger')
const menu = document.querySelector('.menu')

hamburger.addEventListener('click', function() {
    console.log('1')
    menu.classList.toggle("show-hamburger-menu")
})
