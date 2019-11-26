let editContactButtons = document.getElementsByClassName('edit-contact-btn'),
    saveContactButtons = document.getElementsByClassName('save-contact-btn'),
    cancelContactButtons = document.getElementsByClassName('cancel-contact-btn'),
    addUserButtons = document.getElementsByClassName('add-user-btn'),
    saveTableDataButtons = document.getElementsByClassName('save-description-btn'),
    closeTableDataButtons = document.getElementsByClassName('close-description-btn'),
    addContactButtons = document.getElementsByClassName('add-contact-btn'),
    addMemberButtons = document.getElementsByClassName('add-members-btn'),
    addCostMemberButtons = document.getElementsByClassName('add-cost-member-btn');

for(let btn of addCostMemberButtons){
    btn.addEventListener('click', function(){

        btn.closest('.table').querySelector('table').classList.add('d-block');

        btn.closest('.table').querySelector('.table-wrap tbody').insertAdjacentHTML('beforeend', `
               <tr class="set-member-row">
                  <td class="pr-5">
                     <input type="text" class="gray-input w-100">
                  </td>
                  <td class="pr-5">
                     <input type="text" class="gray-input w-100">
                  </td>
                  <td>
                      </td>
                  <td>
                      </td>
                  </tr>
        `)

    })

    // btn.closest('.edit-settings-wrap').querySelector('.save-member-btn').addEventListener('click', function(){
    //     let setMemberRows = btn.closest('.edit-settings-wrap').querySelectorAll('.set-member-row');
    //     btn.closest('.table').querySelector('table').classList.remove('d-block');
    //     for(let row of setMemberRows){
    //        row.outerHTML = '';
    //
    //     }
    //
    // })

}

for(let btn of addContactButtons){
    btn.addEventListener('click', function(){
        btn.closest('.add-contact-wrap').querySelector('.table-wrap').classList.add('d-block');
        btn.closest('.add-contact-wrap').querySelector('.table-wrap tbody').insertAdjacentHTML('beforeend',`
       
             <tr>
                <td class="pt-4 pb-4 pr-5">
                   <input type="text" class="gray-input w-100" placeholder="Name" class="not-rounded">
                </td>
                <td class="pt-4 pb-4 pr-5">
                   <input type="text" class="gray-input w-100" placeholder="Email" class="not-rounded">
                </td>
                <td class="pt-4 pb-4 pr-5">
                   <input type="text" class="gray-input w-100" placeholder="Phone" class="not-rounded">
                </td>
                <td class="pt-4 pb-4 pr-5">
                    <div class="table-actions">
                      <i class="fas fa-star"></i>
                    </div>
                </td>
             </tr>
      
        `);

    });

}


for(let btn of addUserButtons){
    btn.addEventListener('click', function () {
        if (btn.classList.contains('active')) return false;
        btn.classList.add('active');

        btn.closest('.user-settings-wrap').querySelector('table').insertAdjacentHTML('beforeend',`
            <tr class="bg-gray-light add-user-row">
               <td class="pb-0">
                 <input type="text" class="form-control not-rounded set-input" placeholder="Name">
               </td>
               <td class="pb-0">
                  <div class="input-group mb-3 ">
                    <select class="form-control select-light not-rounded not-rounded set-input">
                       <option selected disabled>Select cost centre</option>
                       <option>1</option>
                       <option>2</option>
                       <option>3</option>
                    </select>
                  </div>
               </td>
               <td class="pb-0">
                 <input type="text" class="form-control not-rounded set-input" placeholder="Email">
               </td>
               <td class="pb-0">
                 <input type="text" class="form-control not-rounded set-input" placeholder="Phone">
               </td>
               <td class="pl-3 pb-0">
                 <button class="btn btn-blue-adv not-rounded mr-2 mt-2 btn-sm save-description-btn pull-right d-block w-100">
                    Save
                  </button>
               </td>
               <td>
                  <button class="btn not-rounded mr-2 mt-2 text-uppercase btn-sm close-description-btn pl-0">
                    Cancel
                  </button>
               </td>
        </tr>
        `);

            addUserRow();

    });

        for(let btn of closeTableDataButtons){
            btn.onclick = function(){
                btn.closest('tr').outerHTML = '';

            }
        }

}
function addUserRow(){
    for(let btn of addUserButtons){
        let saveBtn = btn.closest('.user-settings-wrap').querySelector('.save-description-btn');

        saveBtn.onclick = function() {
            btn.classList.remove('active');

            let inputCollection = btn.closest('.user-settings-wrap').querySelectorAll('.set-input');
            let arr = [...inputCollection].map(item => item.value);

            if(!(arr[0] === '' || arr[1] === '' || arr[2] === '' || arr[3] === '')) {
                saveBtn.closest('tbody').insertAdjacentHTML('beforeend', `
                  <tr>
               <td class="pb-0">
                 ${arr[0]}
               </td>
               <td class="pb-0">
               <div class="input-group mb-3 ">
                    ${arr[1]}
               </td>
               <td class="pb-0">
                    ${arr[2]}
               </td>
               <td class="pb-0">
                    ${arr[3]}
               </td>
               <td class="pl-3 pb-0">
                 <button class="invitation-status-btn status-btn">
                     Invitation pending
                 </button>
               <td>
                  <div class="dropdown">
                     <button class="btn dropdown-toggle btn-sm" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                       <i class="fas fa-ellipsis-h"></i>
                     </button>
                     <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#"><i class="fas fa-paper-plane mr-2"></i>Resend login</a>
                        <a class="dropdown-item" href="#"><i class="fas fa-trash mr-2"></i>Delete member</a>
                        <a class="dropdown-item" href="#"><i class="fas fa-star mr-2"></i>Set primary member</a>
                     </div>
                   </div>
               </td>
        </tr>
                `);

            }
            else{
                alert('All fields required');

            }

            let setPackageRows = btn.closest('.user-settings-wrap').querySelectorAll('.add-user-row');
            for (let row of setPackageRows) {
                row.outerHTML = '';

            }

        };

        let closeBtn = saveBtn.closest('tr').querySelector('.add-user-row .close-description-btn');
        closeBtn.addEventListener('click',function(){
            closeBtn.closest('tr').outerHTML = '';
        })

    }
}

for(let btn of saveContactButtons){
    btn.onclick = function(){
        btn.closest('.edit-settings-wrap').style.display='none';
    }

}
for(let btn of editContactButtons) {
    btn.addEventListener('click', function (){
        if(btn.closest('.settings-form-group').querySelector('.edit-settings-wrap').style.display === 'block'){
            btn.closest('.settings-form-group').querySelector('.edit-settings-wrap').style.cssText = 'display: none';
        }
        else{
            btn.closest('.settings-form-group').querySelector('.edit-settings-wrap').style.cssText = 'display: block';
        }


})

}
for(let btn of cancelContactButtons){
    btn.onclick = function(){
        btn.closest('.edit-settings-wrap').style.display='none';
    }

}

for(let btn of addMemberButtons){
    btn.addEventListener('click', function(){
        if(btn.classList.contains('active')) return false;

        btn.classList.add('active');
        btn.closest('.settings-form').querySelector('.add-members-table table tbody').insertAdjacentHTML('afterend', `
          <tr class="set-members-row">
            <td>
              <input type="text" class="gray-input" placeholder="Name">
            </td>
            <td>
              <input type="text" class="gray-input" placeholder="Email">
            </td>
            <td class="pl-3 w-100">
                 <button class="btn btn-blue-adv not-rounded btn-sm save-description-btn pl-5 pr-5 mr-3">
                    Save
                  </button>
                  <button class="btn not-rounded text-uppercase btn-sm close-description-btn pl-0">
                    Cancel
                  </button>
            </td>
          </tr>
        `)

        let saveBtn = btn.closest('.settings-form').querySelector('.add-members-table .save-description-btn');

        saveBtn.addEventListener('click', function(){
            btn.classList.remove('active');

            let inputCollection = btn.closest('.settings-form').querySelectorAll('.gray-input');
            let arr = [...inputCollection].map(item=>item.value);

            if(!(arr[0] === '' && arr[1] === '')){
                btn.closest('.settings-form').querySelector('.add-members-table table tbody').insertAdjacentHTML('beforeend', `
                  <tr>
                    <td>
                      ${arr[0]}
                    </td>
                    <td>
                      ${arr[1]}
                    </td>
                    <td>
                    
                    </td>
                  </tr>
                `);

            }

                let setMemberRows = btn.closest('.settings-form').querySelectorAll('.set-members-row');
                for(let row of setMemberRows){
                    row.outerHTML = '';

                }

        })

    });

}


