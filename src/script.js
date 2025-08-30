// script.js
document.getElementById('login-button').onclick = function() {
    document.getElementById('login-modal').style.display = 'flex';
};

document.getElementById('login-modal').onclick = function(event) {
    if (event.target == this) {
        document.getElementById('login-modal').style.display = 'none';
    }
};

document.getElementById('login-modal').querySelector('.close').onclick = function() {
    document.getElementById('login-modal').style.display = 'none';
};

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove('active');
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove('active');
    }
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}