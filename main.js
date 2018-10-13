$(document).ready(function() {

	var quote;
	var author;

	function getNewQuote() {
		$.ajax({
			url: 'https://api.forismatic.com/api/1.0/',
			jsonp: 'jsonp', // needs to be JSONP over JSON to prevent cross-origin issue (CORS)
			dataType: 'jsonp',
			data: { //this data is used when making the API request, you can also include this info in 'url'
				method: 'getQuote',
				lang: 'en',
				format: 'jsonp'
			},
			success: function(response) {
				quote = response.quoteText;
				author = response.quoteAuthor;

				$('#quote').text(quote);

				if (author) { // not all quotes have authors, taking care of edge case
					$('#author').text('- ' + author);
				} else {
					$('#author').text('- unknown');
				}
			}
		});
	}
	getNewQuote(); // function called when page is loaded

	$('.get-quote').on('click', function (event) {
		event.preventDefault(); // keeps page from jumping back to top with every button click
		getNewQuote(); // function called again on every button click
	});

	$('.share-quote').on('click', function(event) {
		event.preventDefault();
		window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(quote + '- ' + author)); 
	});
});