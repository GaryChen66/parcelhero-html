const closePackagingButtons = document.getElementsByClassName('close-packaging-btn'),
      saveCancelPackagingWrap = document.getElementsByClassName('save-cancel-wrap'),
      addPackageButtons = document.getElementsByClassName('add-package-btn');

for(let btn of addPackageButtons){
    btn.addEventListener('click', function () {
        if(btn.classList.contains('active')) return false;
        btn.classList.add('active');

        for(let block of saveCancelPackagingWrap){
            block.classList.add('d-block');

        }
        btn.closest('.settings-form').querySelector('.add-package-table table tbody').insertAdjacentHTML('beforeend', `  
           <tr class="set-packaging-row">
               <td>
                 <input type="text" class="gray-input" class="not-rounded">
               </td>
               <td>
                  <input type="text" class="gray-input" class="not-rounded">
               </td>
               <td>
                 <input type="text" class="gray-input" class="not-rounded">
               </td>
               <td>
                 <input type="text" class="gray-input" class="not-rounded">
               </td>
               <td class="pl-0">
                 <div class="d-flex">
                        <button class="size-unit-btn">
                          CM
                        </button>
                        <button class="size-unit-btn">
                          IN
                         </button>
                      </div>
               </td>
               <td class="pl-3">
                   <i class="fas fa-star"></i>
                   </span>
               </td>
               <td></td>
           </tr>
    `);

        addPackagingRow();

    });

}

function addPackagingRow(){
    for(let btn of addPackageButtons){
        let saveBtn = btn.closest('.settings-form').querySelector('.add-description-block .save-packaging-btn');

        saveBtn.onclick = function() {
            btn.classList.remove('active');
            btn.closest('.add-description-block').querySelector('.save-cancel-wrap').classList.remove('d-block');

            let inputCollection = btn.closest('.settings-form').querySelectorAll('.set-packaging-row .gray-input');
            let arr = [...inputCollection].map(item => item.value);

            if(!(arr[0] === '' || arr[1] === '' || arr[2] === '' || arr[3] === '')) {

                btn.closest('.settings-form').querySelector('.add-package-table table tbody').insertAdjacentHTML('beforeend', `
                  <tr>
                    <td>
                      ${arr[0]}
                    </td>
                    <td>
                      ${arr[1]}
                    </td>
                    <td>
                      ${arr[2]}
                    </td>
                    <td>
                      ${arr[3]}
                    </td>
                    <td>
                      CM
                    </td>
                    <td>
                       <div class="table-actions">
                          <span data-toggle="modal">
                              <i class="fas fa-star"></i>
                         </span>
                       </div>
                    </td>
                    <td>
                    <div class="table-actions pull-right">
                         <span data-toggle="modal" data-target="#confirmRemove">
                            <a href="#">Edit</a>
                            </i><span class="sr-only">Edit</span>
                          </span>
                          <span data-toggle="modal" data-target="#confirmRemove">
                             <i data-toggle="tooltip" data-placement="top" title="" class="far fa-trash-alt" aria-hidden="true" data-original-title="Remove">
                             </i><span class="sr-only">Remove</span>
                           </span>
                        </div>
                    </td>
                  </tr>
                `);

            }
            else{
                alert('All fields required');

            }

            let setPackageRows = btn.closest('.settings-form').querySelectorAll('.set-packaging-row');
            for (let row of setPackageRows) {
                row.outerHTML = '';

            }

        };

        let closeBtn =  btn.closest('.settings-form').querySelector('.close-packaging-btn');
        closeBtn.onclick = function(){
            let setPackageRows = btn.closest('.settings-form').querySelectorAll('.set-packaging-row');
            for(let block of saveCancelPackagingWrap){
                block.classList.remove('d-block');

            }

            for(let btn of addPackageButtons) {
                btn.classList.remove('active');
            }

            for (let row of setPackageRows) {
                row.outerHTML = '';

            }

        }

    }
}

