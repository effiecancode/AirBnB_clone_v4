// wrapped in $(document).ready(function() {})
// to ensure it executes only when the DOM is fully loaded.

$(document).ready(function() {
    const amenityIds = {};  // Variable to store Amenity IDs

    // Listen for changes on each input checkbox using change()-an event handler
    $('input[type="checkbox"]').change(function() {
      const amenityId = $(this).data('id');
      const amenityName = $(this).data('name');

      if ($(this).is(':checked')) {
        // Checkbox is checked, store Amenity ID and name in the amenityIds variable
        amenityIds[amenityId] = amenityName;
      } else {
        // Checkbox is unchecked, remove Amenity ID
        delete amenityIds[amenityId];
      }

      // Update the h4 tag inside the div Amenities with the list of Amenities checked
      // use dom methods text, values - for dom manipulation
      const amenityList = Object.values(amenityIds).join(', ');
      $('.popover h4').text(amenityList);
    });
  });
