var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

function getRepoIssues(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl)
        .then(function(response){
            //check if request was successful
            if(response.ok){
                response.json()
                    .then(function(data){
                        displayIssues(data);

                        //check if api has paginated issues
                        if(response.headers.get("Link")) {
                            displayWarning(repo);
                        }
                    })
            }
            else {
                alert("There was a problem with your request");
            }
        });
}

//function to display a warning for overflow of repos
function displayWarning(repo){
    //add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    //append a link element with an hred attr that points to the github repo url
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on Github.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    //append the warning to container
    limitWarningEl.appendChild(linkEl);
    };

//function to display our fetched issues
function displayIssues(issues){
    //if we have a repo with no open issues
    if(issues.length === 0){
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    for(var i = 0; i < issues.length; i++) {
        //create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url)
        issueEl.setAttribute("target", "_blank");


        //create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //creaet a type element
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        }
        else {
            typeEl.textContent = "(Issue)";
        }

        //append to container
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl)
    }
};

getRepoIssues("facebook/react");