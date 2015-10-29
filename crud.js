// $('#stars').raty();
Parse.initialize("s71MfpFlUNWYhiymV6y8vXOM3Ux9f0jy2RD64CJt", "HTnyEDNCPGV6xQp8ECR8XiGSb8jSXSIFrdgj9gd2");

var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({foo: "bar"}).then(function(object) {
  alert("yay! it worked");
});
// Click event when form is submitted
$('review-submit-btn').on('click', function() {
	// Create a new sub-class of the Parse.Object, with name "Review"
	var Review = Parse.Object.extend('Review');

	console.log('Yes, the btn was pressed');

	// Create a new instance of your Review class 
	var review = new Review();

	// For each input element, set a property of your new instance equal to the input's value	
	var title = $('#title').val();
	var thoughts = $('#thoughts').val();

	review.set("thoughts", thoughts);
	review.set("title", title);

	// After setting each property, save your new instance back to your database
	review.save(null, {
		success: function(review){
			alert("hgfh");
		},
		error: function(review, error){
			alert("Failed to create object");
		}
	});
	
	//review.save().then(successFunc, failFunc);
});



// Write a function to get data
var getData = function() {
	var Review = Parse.Object.extend('Review');

	// Set up a new query for our Review class
	var query = new Parse.Query(Review)

	// Set a parameter for your query -- where the website property isn't missing
	query.notEqualTo('website', '')

	/* Execute the query using ".find".  When successful:
	    - Pass the returned data into your buildList function
	*/
	query.find({
		success:function(results) {
			buildList(results)
		} 
	})
}

// A function to build your list
var buildList = function(data) {
	// Empty out your ordered list
	$('ol').empty()

	// Loop through your data, and pass each element to the addItem function
	data.forEach(function(d){
		addItem(d);
	})
}


// This function takes in an item, adds it to the screen
var addItem = function(item) {
	// Get parameters (website, band, song) from the data item passed to the function
	var title = item.get('title')
	var thoughts = item.get('thoughts')
	
	// Append li that includes text from the data item
	var li = $('<li>Check out ' + band + ', their best song is ' + song + '</li>')
	
	// Create a button with a <span> element (using bootstrap class to show the X)
	var button = $('<button class="btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span></button>')
	
	// Click function on the button to destroy the item, then re-call getData
	button.click(function() {
		item.destroy({
			success:getData
		})
	})

	// Append the button to the li, then the li to the ol
	li.append(button);
	$('ol').append(li)
	
}

// Call your getData function when the page loads
getData() 

