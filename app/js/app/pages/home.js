const saveSearchButtons = document.getElementsByClassName('save-search-btn');
const saveSearchWrap = document.getElementById('save-search-wrap');
const saveNewFiltersButton = document.getElementById('save-new-filters-btn');

let deleteSaveButtons = document.getElementsByClassName('delete-save-btn');
let savedSearchBtn = document.getElementById('saved-search-btn');

const addFilterButtons = document.getElementsByClassName('add-filters-btn');
const closeWindowButtons = document.getElementsByClassName('close-btn-widget');
const deleteSavedDataButtons = document.querySelectorAll('.modal-saved-search .fa-trash');

const swipeChevronButtons = document.getElementsByClassName('swipe-chevron');

savedSearchBtn.addEventListener('click', ()=>{
    savedSearchBtn.closest('section').querySelector('.modal-saved-search').classList.add('active');

})

function rotateChevron(){
    for(let btn of swipeChevronButtons){
        btn.addEventListener('click', function(event){
            btn.closest('div').querySelector('.fa-angle-down').classList.toggle('rotate-90deg');
            btn.closest('div').querySelector('.fa-angle-down').style.transition = 'all 0.1s ease-out';
        })
    }
}

function deleteSavedTableData(){
    for(let btn of deleteSavedDataButtons){
        btn.addEventListener('click', function(){
            btn.closest('tr').outerHTML = '';
        })
    }
}

for (let btn of saveSearchButtons) {
    btn.addEventListener('click', () => {
        btn.closest('section').querySelector('.modal-custom').classList.add('active');

    })
    saveNewFilters();
}

function deleteBlock(event){
    event.target.closest('span').outerHTML = '';
}

function saveNewFilters() {

    saveNewFiltersButton.onclick = () => {
        let value = saveNewFiltersButton.closest('div').querySelector('input').value;
        saveNewFiltersButton.closest('div').querySelector('input').value = '';

        saveSearchWrap.insertAdjacentHTML('afterbegin', `
            <span class="save-search-block p-2 mb-2 pl-4 pr-2 mr-2"\>
              ${value}
              <button class="delete-save-btn" onclick='deleteBlock(event)'><i class="fa fa-times" aria-hidden="true"></i></button>
             </span>
        `);

        saveNewFiltersButton.closest('section').querySelector('.modal-custom').classList.remove('active');
    }

}

function toggleSearchWindow(){
    for(let btn of addFilterButtons){
        btn.addEventListener('click', function () {
            btn.closest('section').querySelector('.search-filter-window').classList.toggle('d-block');
            btn.closest('section').querySelector('.search-filter-window').style.opacity = 1;
        })
    }
};

function closeWindow() {
    for(let btn of closeWindowButtons){
        btn.addEventListener('click', function () {
            btn.closest('section').querySelector('.search-filter-window').classList.toggle('d-block');
        })
    }
};

rotateChevron();
closeWindow();
toggleSearchWindow();
deleteSavedTableData();