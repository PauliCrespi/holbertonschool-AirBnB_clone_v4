// Your script must be executed only when DOM is loaded
$(document).ready(function () {
// you must store the Amenity ID in a variable (dictionary or list)
  const AmenityID = {};
  // if the checkbox is checked, you must store the Amenity ID in a variable (dictionary or list)
  // https://stackoverflow.com/questions/7960208/jquery-if-checkbox-is-checked
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      AmenityID[$(this).attr('data-id')] = $(this).attr('data-name');
      // if the checkbox is unchecked, you must remove the Amenity ID from the variable
    } else {
      delete AmenityID[$(this).attr('data-id')];
    }
    // update the h4 tag inside the div Amenities with the list of Amenities checked
    $('DIV.amenities h4').text(Object.values(AmenityID).join(', '));
  });
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  // https://www.w3schools.com/jquery/jquery_ajax_get_post.asp
  // https://stackoverflow.com/questions/5004233/jquery-ajax-post-example-with-php
  // https://www.w3schools.com/js/js_loop_forin.asp
  $.ajax({
    // Request http://0.0.0.0:5001/api/v1/places_search/
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    // Send a POST request with Content-Type: application/json
    type: 'POST',
    contentType: 'application/json',
    // and an empty dictionary in the body
    data: JSON.stringify({}),
    success: (data) => {
      data.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      // Loop into the result of the request and create an article tag representing
      // Place in the section.places. (info borrada en el HTLM previo)
      for (const place of data) {
        const article = `
        <article>
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guests</div>
            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`;
        $('section.places').append(article);
      }
    }
  });
});
