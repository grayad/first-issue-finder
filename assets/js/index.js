var getIssues = function() {
    // format the github api url
    var apiUrl = "https://api.github.com/search/issues"

    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
            console.log(response.json());
        } else {
            alert('Error: No Issues Found');
        }
    })
    .catch(function(error) {
        // .catch() to handle network errors
        alert("Unable to connect to GitHub");
    });
};

getIssues();