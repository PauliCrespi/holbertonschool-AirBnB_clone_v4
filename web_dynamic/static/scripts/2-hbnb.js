$(document).ready(function () {
//you must store the Amenity ID in a variable (dictionary or list)
  let AmenityID = {}
//if the checkbox is checked, you must store the Amenity ID in a variable (dictionary or list)
// https://stackoverflow.com/questions/7960208/jquery-if-checkbox-is-checked
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      AmenityID[$(this).attr('data-id')] = $(this).attr('data-name');
//if the checkbox is unchecked, you must remove the Amenity ID from the variable
    } else {
      delete AmenityID[$(this).attr('data-id')];
    }
//update the h4 tag inside the div Amenities with the list of Amenities checked
    $('DIV.amenities h4').text(Object.values(AmenityID).join(', '));
});
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status == 'OK') {
      $('#api_status').addClass('available')
    } else {
      $('#api_status').removeClass('available')
    }
  })
});
