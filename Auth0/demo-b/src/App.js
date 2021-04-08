import { useAuth0 } from '@auth0/auth0-react';
import LoginBtn from './components/LoginBtn';
import LogoutBtn from './components/LogoutBtn';
import Profile from './components/Profile';

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <LoginBtn />
      <LogoutBtn />
      <Profile />
    </div>
  );
};

export default App;
