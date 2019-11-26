let topMenuBtn = document.getElementById('top-menu-btn');
let profileSectionWrap = document.getElementById('profile-section-wrap');

topMenuBtn.addEventListener('click', ()=>{
    profileSectionWrap.classList.toggle('d-flex');
});