function changeExportReason() {
  const exportReasonSelect = document.getElementById('export-reason');

  const saleOptionText = document.getElementById('sale-option-text');
  const saleOptionEditLink = document.getElementById('sale-option-edit');
  const saleOptionEditor = document.getElementById('sale-option-editor');

  saleOptionEditLink.onclick = function () {
    saleOptionEditor.style.display = "block";
    saleOptionText.style.display = "none";
    saleOptionEditLink.style.display = "none";
    saleOptionEditor.focus();
  }

  saleOptionEditor.onblur = function () {
    saleOptionEditor.style.display = "none";
    saleOptionText.style.display = "block";
    saleOptionEditLink.style.display = "block";

    saleOptionText.innerHTML = saleOptionEditor.value;
  }

  exportReasonSelect.onchange = function () {
    hideOptionElements('sale-option');
    hideOptionElements('personal-gift-option');
    hideOptionElements('other-reason');

    switch(exportReasonSelect.value) {
      case 'sale':
        showOptionElements('sale-option');
        break;
      case 'personal-gift':
        showOptionElements('personal-gift-option');
        break;
      case 'other-reason':
        break;
      default:
    }
  }
}

function hideOptionElements(optionName) {
  const optionElements = document.getElementsByClassName(optionName);

  for(let element of optionElements) {
    element.style.display = "none";
  }
}

function showOptionElements(optionName) {
  const optionElements = document.getElementsByClassName(optionName);

  for(let element of optionElements) {
    element.style.display = "block";
  }
}

changeExportReason();

function changeQuantityCount(){
  const quantityCountBlock = document.getElementsByClassName('quantity-input-block');

  for(let block of quantityCountBlock){
      const minusBtn = block.querySelector('.quantity-minus');
      const plusBtn = block.querySelector('.quantity-plus');
      const quantityInput = block.querySelector('.quantity-count');

      if (minusBtn.querySelector('.disabled') && parseInt(quantityInput.value) > 0) {
          minusBtn.querySelector('.fa-circle').classList.remove('disabled');
      }

      minusBtn.onclick = function () {
          if (minusBtn.querySelector('.disabled')) return false;

          quantityInput.value = parseInt(quantityInput.value) - 1;

          if (parseInt(quantityInput.value) == 0) {
              minusBtn.querySelector('.fa-circle').classList.add('disabled');
          }
      }

      plusBtn.onclick = function () {
          quantityInput.value = parseInt(quantityInput.value) + 1;

          if (parseInt(quantityInput.value) == 1) {
              minusBtn.querySelector('.fa-circle').classList.remove('disabled');
          }
      }
  }
}

changeQuantityCount();

function changeItemDetails() {
  const itemBoxes = document.getElementsByClassName('item-box');

  for(let itemBox of itemBoxes) {
    const itemTitle = itemBox.querySelector('.item_title');
    const itemValue = itemBox.querySelector('.item-value');
    const itemQuantity = itemBox.querySelector('.item-quantity');

    const productName = itemBox.querySelector('.product-name');
    const quantityCount = itemBox.querySelector('.quantity-count');
    const valueInput = itemBox.querySelector('.value-input');

    productName.onkeyup = function() {
      itemTitle.innerHTML = productName.value;
    }

    valueInput.onchange = function() {
      itemValue.innerHTML = quantityCount.value * valueInput.value;
    }

    quantityCount.onchange = function() {
      itemValue.innerHTML = quantityCount.value * valueInput.value;
      itemQuantity.innerHTML = quantityCount.value;
    }

    const editBtn = itemBox.querySelector('.edit-item');

    editBtn.onclick = function() {
      hideAllItemBox();
      itemBox.classList.remove('hide');
    }

    const deleteBtn = itemBox.querySelector('.delete-item');

    deleteBtn.onclick = function() {
      itemBox.remove();
    }
  }
}

changeItemDetails();

const addItemBtn = document.getElementById('add-item-btn');
let itemCount = 1;

addItemBtn.onclick = function() {
  hideAllItemBox();

  itemCount++;

  const itemHtml = `<div class="item-box mb-2">
    <div class="item-header">
      <h5 class="header-underline mb-3 item_title"><span class="item-quantity mr-2">1</span>Item ${(itemCount)}</h5>
      <h5 class="item-tool">
        <i>&pound;</i>&nbsp;<span class="item-value">0.00</span>
        <img src="img/icon_edit_pencil.svg" class="edit-item ml-3" alt="Edit Icon">
        <img src="img/icon_delete_bin.svg" class="delete-item ml-3" alt="American Express">
      </h5>
    </div>

    <div class="item-details">
      <div class="block-title mb-0">
        <label class="text-label" for="quantity">Quantity</label>
      </div>
      <div class="search-input quantity-input-block">
          <span class="fa-stack quantity-minus" style="vertical-align: top;">
            <i class="fas fa-circle disabled fa-stack-2x"></i>
            <i class="fas fa-minus fa-stack-1x fa-inverse"></i>
          </span>
          <input type="tel" name="quantity" placeholder="" class="form-control not-rounded quantity-count" value="1">
          <span class="fa-stack quantity-plus" style="vertical-align: top;">
            <i class="fas fa-circle fa-stack-2x"></i>
            <i class="fas fa-plus fa-stack-1x fa-inverse"></i>
          </span>
      </div>

      <div class="block-title mt-4 mb-0">
        <label class="text-label" for="product-name">Product name</label>
      </div>
      <div class="search-input">
        <input type="text" value="Item ${(itemCount)}" name="product-name" placeholder="" class="form-control not-rounded product-name">
      </div>

      <div class="row mt-4">
          <div class="col-md-6">
              <div class="block-title mb-0">
                <label class="text-label" for="value-input">Value</label>
              </div>
              <div class="search-input">
                  <div class="input-icon">
                    <input type="number" min="0" value="0" name="value-input" placeholder="" class="form-control not-rounded value-input">
                    <i>&pound;</i>
                  </div>
              </div>
          </div>
          <div class="col-md-6 mt-4 mt-md-0">
              <div class="block-title mb-0">
                <label class="text-label" for="tarrif-code">Tarrif code</label> <i class="icon-help"></i>
              </div>
              <div class="search-input">
                <input type="text" name="tarrif-code" placeholder="" class="form-control not-rounded tarrif-code">
              </div>
          </div>
      </div>
    </div>
  </div>`;

  const itemBoxList = document.getElementById('item-box-list');

  itemBoxList.innerHTML += itemHtml;

  changeQuantityCount();
  changeItemDetails();
}

function hideAllItemBox() {
  const itemBoxes = document.getElementsByClassName('item-box');

  for(let itemBox of itemBoxes) {
    itemBox.classList.add('hide');
  }
}