var myNav = document.getElementById('mynav');
window.onscroll = function () { 
    if (document.body.scrollTop >= 1175|| document.documentElement.scrollTop >= 1175 ) {
        myNav.classList.add("nav-colored");
        myNav.classList.remove("nav-transparent");
    } 
    else {
        myNav.classList.add("nav-transparent");
        myNav.classList.remove("nav-colored");
    }
};