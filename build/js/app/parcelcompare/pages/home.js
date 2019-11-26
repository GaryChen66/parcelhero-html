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


const quoteBtn = document.getElementById('quote-btn');
const ParcelNoInput = document.getElementById('parcel-no-input');
const dropDownRow = document.getElementById('add-rows');

quoteBtn.addEventListener('click', function () {
    $("#dropdown-row").collapse('show');
})

ParcelNoInput.addEventListener('focus', function () {
    $("#dropdown-row").collapse('show');
})

const addRowBtn = document.getElementById('add-row-btn');


addRowBtn.addEventListener('click', function () {
    const node = document.createElement("div");  

    node.classList.add('col-md-9');
    node.classList.add('mr-0');
    node.classList.add('pr-0');
    node.classList.add('px-sm-0');

    node.innerHTML = `<div class="widget-input-container d-flex pb-3">
        <div class="info-input-group">
            <div class="info-input">
                <div class="info-input-label">
                    Quantity
                </div>

                <div class="dropdown bootstrap-select form-control custom-picker">
                    <select class="form-control custom-picker" data-live-search="true" data-size="5" data-style="select-light" tabindex="-98">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="info-input-group mt-2 mt-md-0">
            <div class="info-input">
                <div class="input-group">
                    <input type="text" class="form-control" tabindex="1" placeholder="Weight">
                </div>
                <button class="btn not-rounded unit-btn">kg</button>
            </div>
        </div>

        <div class="info-input-group mt-2 mt-md-0">
            <div class="info-input">
                <div class="input-group">
                    <input type="text" class="form-control" tabindex="1" placeholder="Length">
                </div>
                <button class="btn not-rounded unit-btn">cm</button>
            </div>
        </div>

        <div class="info-input-group mt-2 mt-md-0">
            <div class="info-input">
                <div class="input-group">
                    <input type="text" class="form-control" tabindex="1" placeholder="Width">
                </div>
                <button class="btn not-rounded unit-btn">cm</button>
            </div>
        </div>

        <div class="info-input-group mt-2 mt-md-0">
            <div class="info-input">
                <div class="input-group">
                    <input type="text" class="form-control" tabindex="1" placeholder="Height">
                </div>
                <button class="btn not-rounded unit-btn">cm</button>
            </div>
        </div>

        <div class="info-input-group mt-2 mt-md-0">
            <div class="info-input">
                <span class="fa-stack del-row">
                    <i class="fas fa-circle disabled fa-stack-2x"></i>
                    <i class="fas fa-minus fa-stack-1x fa-inverse"></i>
                </span>
            </div>
        </div>
    </div>`;


    dropDownRow.appendChild(node);

    detailList();

    const delRow = node.querySelector('.del-row');

    delRow.addEventListener('click', function () {
        node.remove();
    })
});