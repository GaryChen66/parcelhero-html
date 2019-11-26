const accountMenuBtn = document.getElementById('account-menu-btn');
const responsiveMenuWrap = document.getElementById('responsive-menu-wrap');

accountMenuBtn.addEventListener('click', function(){
    responsiveMenuWrap.classList.toggle('d-block');
})