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


function fetchGitHubInformation(event){
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
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        function(response){
            var userData = response;
            //so the "#gh-user-data" will get the content provide by the fuction
            //"userInformationHtml() that takes the "userData as argument"
            $("#gh-user-data").html(userInformationHTML(userData));
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
