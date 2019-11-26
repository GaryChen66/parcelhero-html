let checkboxesService = document.getElementsByClassName('service-static-group');
let checkboxesMeasure = document.getElementsByClassName('measure-static-group');
let checkboxesInsurance = document.querySelector('.insurance-static-label');
let checkboxesReferenceFirst = document.getElementsByClassName('reference-first-static-group');
let checkboxesReferenceSecond = document.getElementsByClassName('reference-second-static-group');

function radiogroups(radiogroups){
    for(let box of radiogroups){
        box.onclick = function(){
            for(let box of radiogroups){
                box.classList.remove('active-checkbox');

            }

            box.classList.add('active-checkbox');

        }

    }

}

$(function () {
	let counters = $('[data-action="counter"]').on('change', function (e) {
        let $input = $(this);
        $input.closest('.radio-group').toggleClass('active-checkbox', $input.is(':checked'));
    });
    });

radiogroups(checkboxesMeasure);
radiogroups(checkboxesService);