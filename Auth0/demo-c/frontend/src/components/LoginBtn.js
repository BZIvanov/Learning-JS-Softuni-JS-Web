const LoginBtn = () => {
  const login = async () => {
    const domain = process.env.REACT_APP_AUTH_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH_CLIENT_ID;
    const audience = process.env.REACT_APP_AUTH_AUDIENCE;
    const scope = 'read:cakes';
    const responseType = 'code';
    const redirectUri = process.env.REACT_APP_AUTH_REDIRECT_URI; // this is our Allowed Callback URLs value

    // check readme file for info about authorize endpoint
    const response = await fetch(
      `https://${domain}/authorize?` +
        `audience=${audience}&` +
        `scope=${scope}&` +
        `response_type=${responseType}&` +
        `client_id=${clientId}&` +
        `redirect_uri=${redirectUri}`,
      {
        redirect: 'manual',
      }
    );

    window.location.replace(response.url);
  };

  return <button onClick={() => login()}>Login</button>;
};

export default LoginBtn;
