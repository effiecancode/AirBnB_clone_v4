$(document).ready(function() {
    const reviewsToggle = $('#show_reviews');  // span next to Reviews h2
    const reviewSection = $('.reviews');  // reviews section

    reviewsToggle.click(function() {
        const buttonText = reviewsToggle.text().trim();

        if (buttonText === 'hide') {
            // If text is "hide", remove all Review elements
            reviewSection.empty();
            reviewsToggle.text('show');  // Change text to "show"
        } else {
            // Fetch, parse, and display reviews
            fetchReviews();
            reviewsToggle.text('hide');  // Change text to "hide"
        }
    });

    function fetchReviews() {
        const review = $('<div class="review">Sample Review Content</div>');
        reviewSection.append(review);
    }
});
