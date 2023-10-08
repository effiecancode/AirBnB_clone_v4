$(document).ready(function() {
    const amenityIds = {};  // Variable to store Amenity IDs
    const locationIds = {};  // Variable to store Location IDs (States or Cities)

    // Listen for changes on each input checkbox using change()-an event handler
    $('input[type="checkbox"]').change(function() {
        const id = $(this).data('id');
        const type = $(this).data('type');

        if ($(this).is(':checked')) {
            // Checkbox is checked, store ID based on type (Amenity, State, or City)
            if (type === 'amenity') {
                amenityIds[id] = true;
            } else {
                locationIds[id] = true;
            }
        } else {
            // Checkbox is unchecked, remove ID based on type (Amenity, State, or City)
            if (type === 'amenity') {
                delete amenityIds[id];
            } else {
                delete locationIds[id];
            }
        }

        // Update the h4 tag inside the div Locations with the list of Locations checked
        const locationList = Object.values(locationIds).join(', ');
        $('.popover h4').text(locationList);
    });

    // Handle button click to send a new POST request with the list of amenities, cities, and states
    $('button').click(function() {
        // Make a POST request to the places_search endpoint with the list of checked items
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                amenities: Object.keys(amenityIds),
                cities: Object.keys(locationIds).filter(id => id.startsWith('city')),
                states: Object.keys(locationIds).filter(id => id.startsWith('state'))
            }),  // Send the list of amenities, cities, and states
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
