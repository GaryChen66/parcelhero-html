let addProductButtons = document.getElementsByClassName('add-product-btn'),
    addExportButtons = document.getElementsByClassName('add-export-btn');

for(let btn of addProductButtons){
    btn.addEventListener('click', function () {
        if (btn.classList.contains('active')) return false;
        btn.classList.add('active');

        btn.closest('.add-description-block').querySelector('.save-cancel-wrap').style.display = 'block';
        btn.closest('.add-product-table').querySelector('table').insertAdjacentHTML('beforeend', `
           <table>
               <thead>
                   <tr class="set-product-row">
                      <th class="pl-0 w-25p border-none">Product name</th>
                      <th class="pl-0 w-25p border-none">Part number</th>
                      <th class="pl-0 w-25p border-none">Unit price</th>
                      <th class="pl-0 w-0 border-none" >Tarrif code</th>
                      <th class="pl-0 w-0 pl-5 pr-5 border-none">Currency</th>
                   </tr>
               </thead>
                 <tbody>
                     <tr class="set-product-row">
                         <td>
                             <input type="text" class="gray-input">
                         </td>
                         <td>
                             <input type="text" class="gray-input">
                         </td>
                         <td>
                             <input type="text" class="gray-input">
                         </td>
                         <td>
                            <input type="text" class="gray-input">
                         </td>
                         <td class="pl-5 pr-5">
                            <select class="gray-input">
                               <option selected>GBP</option>
                               <option selected>US Dollar</option>
                            </select>
                         </td>
                     </tr>
               </tbody>
            </table>
        `);

        btn.closest('.add-product-table').querySelector('.save-product-btn').onclick = function(){
                    btn.classList.remove('active');
                    btn.closest('.add-description-block').querySelector('.save-cancel-wrap').style.display = 'none';

                    let inputCollection = btn.closest('.add-product-table').querySelectorAll('.gray-input');
                    let arr = [...inputCollection].map(item => item.value);

                    if(!(arr[0] === '' || arr[1] === '' || arr[2] === '' || arr[3] === '')) {
                        btn.closest('.add-product-table').querySelector('.tbody').insertAdjacentHTML('beforeend', `
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
                           <td class="pl-5">
                              ${arr[4]}
                           </td>
                         </tr>
                        `);
                    }
                    else{
                        alert('All fields required');
                    }
                    let setProductRow = btn.closest('.add-product-table').querySelectorAll('.set-product-row');
                    for(let row of setProductRow){
                        row.outerHTML = "";

                    }

            }

    })
    btn.closest('.settings-form').querySelector('.cancel-product-btn').onclick = function(){
        btn.classList.remove('active');
        let setProductRow = btn.closest('.add-product-table').querySelectorAll('.set-product-row');
        btn.closest('.add-description-block').querySelector('.save-cancel-wrap').style.display = 'none';

        for(let row of setProductRow){
            row.outerHTML = "";

        }

    }

}

for(let btn of addExportButtons){
    btn.onclick = function () {
        if(document.querySelector('.export-block-active')) return false;

        btn.closest('.export-wrap').querySelector('.reasons-export-container').insertAdjacentHTML('afterend', `
            <div class="reasons-export-block export-block-active mt-3 mb-3">
                <span class="reasons-export-span">
                    <input type="text" class="form-control form-control-sm add-new-export-input" placeholder="Reason for export">
                </span>
                <p class="reasons-export-paragraph">
                   <input type="text" class="form-control form-control-sm add-new-export-input" placeholder="Declaration statement (optional)">
                </p>
                <div class="tooltip-container">
                    <span>
                        <i class="fa-star fas mr-2"></i>
                    </span>
                </div>
                <div class="save-cancel-wrap mt-2 mb-2 d-block">
                    <button class="btn btn-blue-adv not-rounded mr-2 pt-2 pb-2 pr-3 pl-3 btn-sm save-export-block-btn text-uppercase">
                        Save
                    </button>
                    <button class="btn not-rounded btn-sm cancel-export-block-btn text-uppercase">
                        Cancel
                    </button>
                </div>
            </div>
        `);

        btn.closest('.export-wrap').querySelector('.save-export-block-btn').onclick = function(){
            let inputCollection = btn.closest('.export-wrap').getElementsByClassName('add-new-export-input');
            let arr = [...inputCollection].map(item => item.value);


            let saveBtn = btn.closest('.export-wrap').querySelector('.reasons-export-container');

            if(!(arr[0] === '')){
                saveBtn.insertAdjacentHTML('beforeend', `
                <div class="reasons-export-block mt-3 mb-3">
                    <div>
                        <span class="reasons-export-span">
                            ${arr[0]}
                        </span>
                    </div>
                    <p class="reasons-export-paragraph">
                       ${arr[1]}
                    </p>
                </div>
               `);
            }
            else{
                alert('Reason required');

            }

          }

        let closeBtn = btn.closest('.export-wrap').querySelector('.cancel-export-block-btn');
        closeBtn.onclick = function(){
            closeBtn.closest('.reasons-export-block').outerHTML = '';
            btn.classList.remove('active');

        }

    }

}


function changeExportBlock(){
    let reasonsExportBlocks = document.getElementsByClassName('reasons-export-block');

    for(let block of reasonsExportBlocks){
        block.onclick = function () {
            if(document.querySelector('.export-block-active')) return false;


            let span = block.querySelector('.reasons-export-span').innerHTML;
            let paragraph = block.querySelector('.reasons-export-paragraph').innerHTML;

            block.outerHTML = `
        <div class="reasons-export-block export-block-active mt-3 mb-3">
            <div>
                <span class="reasons-export-span">
                    <input type="text" class="form-control form-control-sm add-new-export-input" value=${span}>
                </span>
            </div>
            <p class="reasons-export-paragraph">
               <input type="text" class="form-control form-control-sm add-new-export-input" value=${paragraph}>
            </p>
            <div class="tooltip-container">
                <span>
                    <i class="fa-star fas mr-2"></i>
                    <i class="fa-trash fas remove-export-btn"></i>
                </span>
            </div>
            <div class="save-cancel-wrap mt-2 mb-2 d-block">
                <button class="btn btn-blue-adv not-rounded mr-2 pt-2 pb-2 pr-3 pl-3 btn-sm save-export-block-btn text-uppercase">
                    Save
                </button>
                <button class="btn not-rounded btn-sm cancel-export-block-btn text-uppercase">
                    Cancel
                </button>
            </div>
        </div>
        `;
            saveExportBlock(span, paragraph);

        }

    }

    function saveExportBlock(span, paragraph) {
        let saveBtn = document.querySelector('.save-export-block-btn');

        let closeBtn = saveBtn.closest('.export-wrap').querySelector('.cancel-export-block-btn');

        closeBtn.onclick = function(){
            closeBtn.closest('.reasons-export-block').outerHTML = `
              <div class="reasons-export-block mt-3 mb-3">
                    <span class="reasons-export-span">
                        ${span}
                    </span>
                    <p class="reasons-export-paragraph">
                        ${paragraph}
                    </p>
              </div>
            `;

        }

        saveBtn.onclick = function(){

            let inputCollection = saveBtn.closest('.export-wrap').getElementsByClassName('add-new-export-input');
            let arr = [...inputCollection].map(item => item.value);

            if(!(arr[0] === '')){
                saveBtn.closest('.reasons-export-block').outerHTML = `

                 <div class="reasons-export-block mt-3 mb-3">
                        <span class="reasons-export-span">
                            ${arr[0]}
                        </span>
                        <p class="reasons-export-paragraph">${arr[1]}
                        </p>
                  </div>
                `;

            }
            else{
                alert('Heading required');

            }

        }

        let removeExportBtn = document.querySelector('.remove-export-btn');
        removeExportBtn.onclick = function(){
            removeExportBtn.closest('.reasons-export-block').outerHTML = ''

        }


    }
}
changeExportBlock();
