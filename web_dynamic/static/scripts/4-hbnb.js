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
        const amenityList = Object.values(amenityIds).join(', ');
        $('.popover h4').text(amenityList);
    });

    // Handle button click to send a new POST request with the list of amenities
    $('button').click(function() {
        // Make a POST request to the places_search endpoint with the list of checked amenities
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: Object.values(amenityIds) }),  // Send the list of amenities
            success: function(data) {
                // Handle the response data as needed
                console.log('Response from places_search:', data);
            },
            error: function() {
                // Handle error if the request to places_search fails
                console.error('Error: Unable to fetch places.');
            }
        });
    });

    // Send HTTP request to check API status
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function(data) {
            // Check the API status and update the class of div#api_status accordingly
            if (data.status === 'OK') {
                $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }

            // Loop through the results and create article tags representing Places
            const placesSection = $('.places');
            placesSection.empty();  // Clear existing content

            data.places.forEach(place => {
                const article = $('<article>');
                article.text(place.description);  // Assuming place description is a valid property

                placesSection.append(article);
            });
        },
        error: function() {
            // Handle error if the request to check API status fails
            console.error('Error: Unable to fetch API status.');
        }
    });
});
