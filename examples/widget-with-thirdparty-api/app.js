$(document).ready(function() {
    var widget = new Auth0Widget({
        domain: AUTH0_DOMAIN,
        clientID: AUTH0_CLIENT_ID,
        callbackURL: AUTH0_CALLBACK_URL,
        callbackOnLocationHash: true
    });

    var userProfile;

    $('.btn-login').click(function(e) {
      e.preventDefault();
      widget.signin({ popup: true} , null, function(err, profile, token) {
        if (err) {
          // Error callback
          console.log("There was an error");
          alert("There was an error logging in");
        } else {
          // Success calback

          widget.getClient().getDelegationToken('IckaP4QRfGSRGuVZfP9VJBUdlXtgcS4o', token,
            function(err, thirdPartyApiToken) {
              localStorage.setItem('thirdPartyApiToken', thirdPartyApiToken.id_token);
              console.log("Third party token", thirdPartyApiToken.id_token);
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
