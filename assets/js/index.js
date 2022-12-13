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
          console.log(data.items);
          displayIssues(data.items)
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

getIssues();

var displayIssues = function(issues) {
    for (i=0; i<issues.length; i++) {
        var issueContainer = document.createElement('div');
        issueContainer.className= 'issueContainer';
        var title = document.createElement('h1');
        title.innerHTML=issues[i].title;

        issueContainer.appendChild(title);
        issueDiv.appendChild(issueContainer);
    }
}