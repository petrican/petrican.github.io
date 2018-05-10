// This info could be from an XHR but for this is only for demo purposes
var carData =
[
 {
    "name": "-- Select a brand --",
    "img": ""
 },
 {
    "name": "Alfa Romeo",
    "img": "alfa.png"
 },
 {
    "name": "Audi",
    "img": "audi.png"
 },
 {
    "name": "Bmw",
    "img": "bmw.png"
 },
 {
    "name": "Fiat",
    "img": "fiat.png"
 },
 {
    "name": "Toyota",
    "img": "toyota.png"
 },
 {
    "name": "Volkswagen",
    "img": "vw.png"
}];


var dataHolder = {};

var resetData = function() {
    dataHolder = {
        title: null,
        brand: null,
        year: null,
        mileage: null,
        fuel: null,
        color: null,
        damaged: null,
        damage_details: null,
        price: null,
        currency: null,
        description: null
    };
}

var firstForm        = document.getElementById('modal-form-section-one');
var secondForm       = document.getElementById('modal-form-section-two');
var showSubmitted    = document.getElementById('show-submitted-data');

/**
 * Fields
 */
var titleField       = document.getElementById('title-anouncement');
var brandField       = document.getElementById('mark-brand');
var yearField        = document.getElementById('year');
var mileageField     = document.getElementById('mileage');
var colorField       = document.getElementById('color');
var selectedColor    = document.getElementById('selected-color');
var damageNo         = document.getElementById('damage-no');
var damageYes        = document.getElementById('damage-yes');
var damageDetailsBox = document.getElementById('damage-details-box');
var damageDetails    = document.getElementById('damage-details');
var priceField       = document.getElementById('price');
var currencyField    = document.getElementById('currency');
var descriptionField = document.getElementById('description');

var errorMessages    = document.getElementById('errors');
var errorMessages2   = document.getElementById('errors-two');

// Populate year
var yearNow = parseInt((new Date()).getFullYear());
for (var i=yearNow; i>= 1900; i--) {
    yearField.options[yearField.options.length] = new Option(i, i);
}


// Populate dropdown with data
var markBrand = document.getElementById('mark-brand');
carData.forEach( function (item) {
    markBrand.options[markBrand.options.length] = new Option(item.name, item.name);
});


// Update the image on change
var updateImage = function(autoItem) {
    var placeholderToUpdate = document.getElementById('brand-image');
    if (autoItem.value == '-- Select a brand --') {
        placeholderToUpdate.innerHTML = '';
        return;
    }
    carData.forEach( function (item) {
      if( autoItem.value === item.name) {
          placeholderToUpdate.innerHTML = '<img src="images/' + item.img + '">';
      }
    });
};

// Update the color
var updateColor = function(colorField) {
    selectedColor.style.backgroundColor = colorField.value;
};


/**
 *  Validate first form
 */
var validateFirstForm = function() {
    errorMessages.innerHTML     = ''; // clear error firsts
    if(titleField.value == '') {                                   // title validation
        titleField.classList.add('form-error');
        titleField.focus();
        errorMessages.innerHTML += '<br /> Title cannot be empty.';
        errorMessages.style.display = 'block';
        return false;
    } else {
        titleField.classList.remove('form-error');
    }

    if(brandField.value == '-- Select a brand --') {              // brand validation
        brandField.classList.add('form-error');
        brandField.focus();
        errorMessages.innerHTML += '<br /> You must select the brand of the car.';
        errorMessages.style.display = 'block';
        return false;
    } else {
        brandField.classList.remove('form-error');
    }

    var regex=/^[0-9]+$/;
    var mileageVal = mileageField.value;
    if(mileageField.value == '' || !mileageVal.match(regex)) {    // mileage validation
        mileageField.classList.add('form-error');
        mileageField.focus();
        errorMessages.innerHTML += '<br /> Mileage must not be empty and must be a number.';
        errorMessages.style.display = 'block';
        return false;
    } else {
        mileageField.classList.remove('form-error');
    }

    if(colorField.value == '') {                                  // color validation
        colorField.classList.add('form-error');
        colorField.focus();
        errorMessages.innerHTML += '<br /> You must set the color.';
        errorMessages.style.display = 'block';
        return false;
    } else {
        brandField.classList.remove('form-error');
    }

    errorMessages.innerHTML     = '';                             // clear errors
    errorMessages.style.display = 'none';
    return true;
};

/**
 * Validate second form
 */
var validateSecondForm = function() {
    errorMessages2.innerHTML     = '';
    if (damageYes.checked && damageDetails.value == '') {
        damageDetails.classList.add('form-error');
        damageDetails.focus();
        errorMessages2.innerHTML += '<br /> You must provide damage details.';
        errorMessages2.style.display = 'block';
        return false;
    } else {
        damageDetails.classList.remove('form-error');
    }

    var priceRegex = /^[1-9][0-9]{0,2}(?:\.?[0-9]{3}){0,3}(,[0-9]{2})?$/;
    var priceVal = priceField.value;
    if(priceField.value == '' || !priceVal.match(priceRegex)) {    // price validation
        priceField.classList.add('form-error');
        priceField.focus();
        errorMessages2.innerHTML += '<br /> You must provide a correct price.';
        errorMessages2.style.display = 'block';
        return false;
    } else {
        priceField.classList.remove('form-error');
    }

    if(descriptionField.value == '') {                             // description validation
        descriptionField.classList.add('form-error');
        descriptionField.focus();
        errorMessages2.innerHTML += '<br /> Description cannot be empty.';
        errorMessages2.style.display = 'block';
        return false;
    } else {
        descriptionField.classList.remove('form-error');
    }

    errorMessages2.innerHTML     = '';                             // clear errors
    errorMessages2.style.display = 'none';
    return true;
}


/**
 *  Render second form
 */
var renderSecondForm = function() {
    updateDamage();
    //validate first form
    if (validateFirstForm()) {
        firstForm.classList.add('hidden');
        secondForm.classList.remove('hidden');
    }
};


/**
 * Initial setup
 */
var initialSetup = function() {
    resetData();
    titleField.value   = '';
    titleField.classList.remove('form-error');
    brandField.value   = '-- Select a brand --';
    brandField.classList.remove('form-error');
    yearField.value    = yearNow;
    mileageField.value = '';
    mileageField.classList.remove('form-error');
    colorField.value   = '';
    colorField.classList.remove('form-error');
    selectedColor.style.backgroundColor = 'white';

    damageNo.checked       = true;
    damageDetails.value    = '';
    damageDetails.classList.remove('form-error');
    priceField.value       = '';
    priceField.classList.remove('form-error');
    descriptionField.value = '';
    descriptionField.classList.remove('form-error');
    firstForm.classList.remove('hidden');
    secondForm.classList.add('hidden');
    showSubmitted.classList.add('hidden');
    errorMessages.innerHTML  = '';
    errorMessages2.innerHTML = '';
}

/**
 * updateDamage
 */
var updateDamage = function() {
    damageDetailsBox.style.display = (damageYes.checked) ? 'block' : 'none';
    if (damageYes.checked) damageDetails.focus();
}


/**
 * Cancel
 */
var cancelSubmission = function() {
    firstForm.classList.remove('hidden');
    secondForm.classList.add('hidden');
    showSubmitted.classList.add('hidden');
};

/**
 * Complete submission
 */
var completeSubmission = function() {
   // validate second form
   if (validateSecondForm()) {
       dataHolder.title          = titleField.value;
       dataHolder.brand          = brandField.value;
       dataHolder.year           = yearField.value;
       dataHolder.mileage        = mileageField.value;
       dataHolder.fuel           = document.querySelector('input[name="fuel"]:checked').value;
       dataHolder.color          = colorField.value;
       dataHolder.damaged        = document.querySelector('input[name="damaged"]:checked').value
       dataHolder.damage_details = damageDetails.value;
       dataHolder.price          = priceField.value;
       dataHolder.currency       = currencyField.value;
       dataHolder.description    = descriptionField.value;

       var collectedData = JSON.stringify(dataHolder);
       showSubmitted.innerHTML = '<br /> Collected Data => <br /><br />' + collectedData;
       firstForm.classList.add('hidden');
       secondForm.classList.add('hidden');
       showSubmitted.classList.remove('hidden');
   }
}



/**
 * Basic Modal actions
 */
var overlay = document.getElementById('overlay');

var openModal = function () {
    initialSetup();
	overlay.classList.remove("is-hidden");
}

var closeModal = function () {
	overlay.classList.add("is-hidden");
	initialSetup();
}



