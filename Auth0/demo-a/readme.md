# Auth0

To use Auth0 service you need to create your account.

## Create Application

1. From the menu on the left select **Applications** > **Applications** and click **Create application**.
2. Give it a name and select **Regular Web Applications**. Click **Create**.
3. Select technology **Node.js with Express**.
4. Click the **Settings** tab for the newly created app and scroll down to **Application URIs**.
5. Provide value _http://localhost:3000/callback_ for **Allowed Callback URLs** and _http://localhost:3000_ for **Allowed Logout URLs**.
6. Click **Save changes** button.
7. Go to **Quick Start** tab and click **Save settings and continue**.
8. On the same tab you should be able to see you configs, which you need for the .env file.
9. Now go to _http://localhost:3000/login_ and you should be able to see auth0 login form.
10. To logout visit _http://localhost:3000/logout_.
11. Login and Logout routes are provided by Auth0, you don't have to create them.
