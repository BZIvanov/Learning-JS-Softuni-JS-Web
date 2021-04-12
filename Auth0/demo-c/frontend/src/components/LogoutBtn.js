const LogoutBtn = () => {
  const logout = async () => {
    const domain = process.env.REACT_APP_AUTH_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH_CLIENT_ID;
    const returnTo = 'http://localhost:3000';

    const response = await fetch(
      `https://${domain}/logout?` +
        `client_id=${clientId}&` +
        `returnTo=${returnTo}`,
      {
        redirect: 'manual',
      }
    );

    window.location.replace(response.url);
  };

  return <button onClick={() => logout()}>Logout</button>;
};

export default LogoutBtn;
