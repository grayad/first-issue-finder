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
        // function to create link for repo using repo api url
        var getRepoLink = function() {
            var repoApiUrl = issues[i].repository_url;
            repoApiUrl='https://github.com' + repoApiUrl.split("").splice(28).join("");

            return repoApiUrl;
        }

        // create card with title header
        var issueContainer = document.createElement('div');
        issueContainer.className= 'issueContainer card';
        var title = document.createElement('div');
        title.className= 'card-header';
        title.innerHTML=issues[i].title;

        // create card body
        var body= document.createElement('div');
        body.className= 'card-body';

        // # of assignees
        var assignees = document.createElement('p')
        assignees.className = 'card-text'
        assignees.innerHTML = '# of assignees: ' + issues[i].assignees.length;

        // view issue button using url
        var url = document.createElement('a');
        url.setAttribute('href', issues[i].html_url)
        var viewBtn = document.createElement('button');
        viewBtn.innerHTML = 'View Issue'
        viewBtn.className='btn btn-secondary'
        url.appendChild(viewBtn);

        // view repo button using url
        var repoUrl = document.createElement('a');
        repoUrl.setAttribute('href', getRepoLink())
        var repoBtn = document.createElement('button');
        repoBtn.innerHTML = 'Visit Repo'
        repoBtn.className='btn btn-secondary'
        repoUrl.appendChild(repoBtn);
        console.log(getRepoLink())

        // append all elements to issueDiv
        body.appendChild(assignees);
        body.appendChild(url)
        body.appendChild(repoUrl)
        issueContainer.appendChild(title);
        issueContainer.appendChild(body);
        issueDiv.appendChild(issueContainer);
    }
}