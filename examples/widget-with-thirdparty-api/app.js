$(document).ready(function() {
    var lock = new Auth0Lock(
      AUTH0_CLIENT_ID,
      AUTH0_DOMAIN
    );

    var userProfile;

    $('.btn-login').click(function(e) {
      e.preventDefault();
      lock.showSignin(function(err, profile, token) {
        if (err) {
          // Error callback
          console.log("There was an error");
          alert("There was an error logging in");
        } else {
          console.log("Auth0 token", token);
          // Success callback
          var delegationOptions = {
            id_token: token,
            api: API_TYPE
          };
          lock.getClient().getDelegationToken(delegationOptions,
            function(err, thirdPartyApiToken) {
              if (err) {
                console.log("There was an error getting a delegation token: " + JSON.stringify(err));
              } else {
                localStorage.setItem('thirdPartyApiToken', thirdPartyApiToken.id_token);
                console.log("Third party token", thirdPartyApiToken.id_token);
              }
            });

          // Save the JWT token.
          localStorage.setItem('userToken', token);

          // Save the profile
          userProfile = profile;

          $('.login-box').hide();
          $('.logged-in-box').show();
          $('.nickname').text(profile.nickname);
        }
      });
    });


    $('.btn-api').click(function(e) {
        // Just call your API here. The header will be sent
    })


});
