import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log(user);

  return (
    <div>
      {isAuthenticated && (
        <div>
          <h3>{user.name}</h3>
          <img src={user.picture} alt={user.name} />
        </div>
      )}
    </div>
  );
};

export default Profile;
