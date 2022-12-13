var issueBtn = document.getElementById("issueBtn");
var issueDiv = document.getElementById("issueDiv");

var getIssues = function () {
  // format the github api url
  var apiUrl =
    "https://api.github.com/search/issues?q=label:goodfirstissue+state:open&sort=created&direction=desc";

  // make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert("Error: No Issues Found");
      }
    })
    .catch(function (error) {
      // .catch() to handle network errors
      alert("Unable to connect to GitHub");
    });
};


