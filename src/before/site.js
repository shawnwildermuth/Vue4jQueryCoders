$(function () {
  $('#ghsubmitbtn').on('click', function (e) {
    e.preventDefault();
    $('#ghapidata').html(`<div id="loader">
      <img src="https://i.imgur.com/UqLN6nl.gif" alt="loading...">
    </div>`);

    var username = $('#ghusername').val();
    var requri = 'https://api.github.com/users/' + username;
    var repouri = 'https://api.github.com/users/' + username + '/repos';

    $.getJSON(requri)
      .done((json) => {
        if (json.message == "Not Found" || username == '') {
          $('#ghapidata').html("<h2>No User Info Found</h2>");
        }

        else {
          // else we have a user and we display their info
          var fullname = json.name;
          var username = json.login;
          var aviurl = json.avatar_url;
          var profileurl = json.html_url;
          var followersnum = json.followers;
          var followingnum = json.following;
          var reposnum = json.public_repos;

          if (fullname == undefined) { fullname = username; }

          var outhtml = `<h2>${fullname} 
            <span class="smallname">
              (@<a href="${profileurl}">${username}</a>)
            </span>
          </h2>
          <div class="ghcontent">
            <div class="float-left img-thumbnail m-1">
              <a href="${profileurl}" target="_blank">
                <img src="${aviurl}" 
                     width="80" 
                     height="80" 
                     alt="${username}">
              </a>
            </div>
            <p>
              Followers: ${followersnum} - 
              Following: ${followingnum}
              <br>Repos: ${reposnum}</p></div>
            <div class="repolist clearfix">`;

          var repositories;
          $.getJSON(repouri)
            .done((json) => {
              repositories = json;
              outputPageContent();
            });

          function outputPageContent() {
            if (repositories.length == 0) {
              outhtml += '<p>No repos!</p></div>';
            } else {
              outhtml += `<h4>Repos List:</h4> <div>`;
              $.each(repositories, function (index) {
                outhtml += `<div class='d-inline'>
                <a href="${repositories[index].html_url}"
                   class="btn btn-sm btn-info m-1" 
                   target="_blank">
                   ${repositories[index].name}
                </a>
              </div>`;
              });
              outhtml += '</div></div>';
            }
            $('#ghapidata').html(outhtml);
          } // end outputPageContent()
        } // end else statement
      }); // end requestJSON Ajax call
  }); // end click event handler

});