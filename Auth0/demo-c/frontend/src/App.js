import { Route } from 'react-router-dom';
import LoginBtn from './components/LoginBtn';
import LogoutBtn from './components/LogoutBtn';
import Cakes from './components/Cakes';

const App = () => {
  return (
    <div>
      <div>
        <LoginBtn />
        <LogoutBtn />
      </div>
      <Route path='/cakes' component={Cakes} />
    </div>
  );
};

export default App;
