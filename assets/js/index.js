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

        // calculate days since issue posted
        var postDuration = function() {
            // issue date from API
            var creationDate = issues[i].created_at;
            // today's date
            var today = new Date();

            // format issue Date
            var date = creationDate.split("").splice(0,10).join("") + " " + creationDate.split("").splice(11).join("");
            var formatedDate = new Date(date);

            // calculate how many days since the issue was posted
            var differenceInTime = today.getTime()-formatedDate.getTime();
            var daysSincePosted = Math.round(differenceInTime/(1000 * 3600 * 24))

            return daysSincePosted;
        }
        const daysSincePosted = postDuration();

        // create card with title header
        var issueContainer = document.createElement('div');
        issueContainer.className= 'issueContainer card';
        var title = document.createElement('div');
        title.className= 'card-header';
        title.innerHTML=issues[i].title;

        // date footer
        var date = document.createElement('div');
        date.className= 'card-footer text-muted';

        // conditional singular vs plural for date
        if (daysSincePosted===1){
            date.innerHTML=daysSincePosted + ' day ago'
        } else {
            date.innerHTML=daysSincePosted + ' days ago'
        }

        // create card body
        var body= document.createElement('div');
        body.className= 'card-body';

        // # of assignees
        var assignees = document.createElement('p');
        assignees.className = 'card-text';
        
        if (issues[i].assignees.length === 0) {
            assignees.className= 'text-success';
            assignees.innerHTML = '# of assignees: ' + issues[i].assignees.length + ", could be YOU!";
        } else {
            assignees.className= 'text-dark';
            assignees.innerHTML = '# of assignees: ' + issues[i].assignees.length
        }

        // user
        var userLink = document.createElement('a');
        userLink.setAttribute('href', issues[i].user.html_url);
        userLink.innerHTML = issues[i].user.login;
        var user = document.createElement('p')
        user.className = 'card-text'
        user.innerHTML = 'User: ';
        user.appendChild(userLink);

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

        // append all elements to issueDiv
        body.appendChild(assignees);
        body.appendChild(user)
        body.appendChild(url)
        body.appendChild(repoUrl)
        issueContainer.appendChild(title);
        issueContainer.appendChild(body);
        issueContainer.appendChild(date);
        issueDiv.appendChild(issueContainer);
    }
}