const addDescriptionButton = document.getElementById('add-description-btn'),
      saveDescriptionButton = document.getElementById('save-description-btn'),
      descInputs = document.getElementsByClassName('past-desc-input'),
      closeDescriptionButton = document.getElementById('close-description-btn'),
      saveCancelWrap = document.getElementById('save-cancel-wrap');

closeDescriptionButton.addEventListener('click', function () {
    deleteAllPrompts();
    saveCancelWrap.style.display = 'none';

})
saveDescriptionButton.addEventListener('click', function(){
    addAllPrompts();
    deleteAllPrompts();
    saveCancelWrap.style.display = 'none';

})
addDescriptionButton.addEventListener('click', function(){
    saveCancelWrap.style.display = 'flex';
    addDescriptionButton.closest('div.table').querySelector('tbody').insertAdjacentHTML('beforeend', `
        <tr class='desc-prompt'>
                        <td>
                            <input class="past-desc-input" placeholder="Description name">
                        </td>
                        <td>
                            <div class="table-actions">
                                <i data-toggle="tooltip" data-placement="top" title="Favorite?" class="fas fa-star" aria-hidden="true" data-original-title="Favorite"></i>
                            </div>
                        </td>
                        <td></td>
                    </tr>
        `);
})

function deleteAllPrompts() {
    let nodes = [].slice.call(descInputs, 0);
    nodes.forEach((item)=>item.closest('tr').outerHTML = '');

}
function addAllPrompts(){
    for(let input of descInputs){
        if(!input.value == ''){
            addDescriptionButton.closest('div.table').querySelector('tbody').insertAdjacentHTML('beforeend', `
        <tr>
                        <td>
                            ${input.value}
                        </td>
                        <td>
                            <div class="table-actions">
                                <i data-toggle="tooltip" data-placement="top" title="Favorite?" class="fas fa-star" aria-hidden="true" data-original-title="Favorite"></i>
                            </div>
                        </td>
                        <td><div class="table-actions pull-right">
                                <span data-toggle="modal" data-target="#confirmRemove">
                                    <i data-toggle="tooltip" data-placement="top" title="" class="far fa-trash-alt" aria-hidden="true" data-original-title="Remove">
                                    </i><span class="sr-only">Remove</span>
                                </span>
                            </div>
                            </td>
                    </tr>
        `);

        }

    }

}
