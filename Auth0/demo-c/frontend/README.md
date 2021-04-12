## Endpoints

1. Go to your application in Auth0 website.
2. Click **Settings** tab.
3. Scroll down to **Advanced settings**.
4. In Advanced settings click the tab **Endpoints** and there you can find the different endpoints you have available.

## Result

Follow this steps once all 3 prjects are set up.

1. You should be able to see login and logout buttons.
2. Click the login button and signup an account to login.
3. You will be asked to give access to the Cakes App.
4. This way you will be able to Sign up new user, but he won't have any permissions.
5. To give permissions to the user go to Auth0 website. From menu on the left select **User Managment**, then **Users**, then click the user you want.
6. Open **Permissions** tab for the user. Click **Assign permissions**. From the dropdown menu select the API you want to use for this user. Mark read and write (this 2 were specified for this project) permissions and click **Add permissions**.
7. Logout and Login again with the user who now have the permissions.
