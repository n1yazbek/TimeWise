import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

const authenticate = () => {
  const clientId = "9479417d30f943aa8282efe721bd37a0";
  const clientSecret = "f8f862b885514552a907cb67bcbb5752";
  const redirectUri = "http://localhost:3000/callback";
  const scopes = ["user-read-private", "user-read-email"];

  const queryParams = new URLSearchParams({
    response_type: "token",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopes.join(" "),
  });

  window.location.href = `https://accounts.spotify.com/authorize?${queryParams}`;
};

const getToken = () => {
  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  const accessToken = hashParams.get("access_token");

  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  } else {
    authenticate();
  }
};

getToken();
