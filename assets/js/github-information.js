//writing the fetch function for the gitHub repositories

function userInformationHTML(user) {
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

function repoInformationHTML(repos){
    //since the repos response will be an array
    //we check if there are repos on the user account
    if (repos.length == 0){
        return `<div class="clearfix repo-list">No repos!</div>`;
    }
    //using the map() method to iterate on the array and put in a HTML
    //template of list item "li"
    var listItemsHTML = repos.map(function(repo){
        return `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`;
    });

    //now to display everything since the map return an array the "join('\n')" is used to
    // prevent to need to iterate again on this array
    return `<div class="clearfix repo-list"><p><strong>Repo List:</strong></p><ul>${listItemsHTML.join("\n")}</ul> </div>`
}


function fetchGitHubInformation(event){
    //cleaning the userData and repoData to don't display when
    //the text is empty
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");

    //creating a varible to hold the user name, using Jquery
    var username = $("#gh-username").val();
    //if statement to check if somethin was typed on the input area
    if (!username){
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        // now the return to in case nothing is typed so the fetch will not try to take something
        //that does not exist
        return;
    }
    //loading the loading gif
    $("#gh-user-data").html(`<p><img src="assets/css/loader.gif" alt="loading gif"></p>`);

    //now here is how promise in jquery can be achieved
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        //below is the get method fot the repositories
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        //the response then is divided by 2
        function(firstResponse, secodResponse){
            //since that we are using more than one response
            //the response will be stored in an array so we need to select
            //the first element since that is the only thing in the array
            var userData = firstResponse[0];
            var repoData = secodResponse[0];
            //so the "#gh-user-data" will get the content provide by the fuction
            //"userInformationHtml() that takes the "userData as argument"
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
         //here is the errorRespond in case happens
        }, function(errorResponse){
            //checking if is a 404 error
            if (errorResponse.status === 404){
                $("#gh-user-data").html(`<h2>No info found for user: ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
    } );


}
//this will display the default value of the inpu (octocat)
$("document").ready(fetchGitHubInformation);
