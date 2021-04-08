## Usage

Check this [link](https://auth0.com/docs/quickstart/spa/react) for official docs example or follow the steps below for fast overview.

1. First go to Auth0 website and register account or login with existing.
2. From the menu on the left go to **Applications** > **Applications** and click the button **Create application**.
3. Give it a name then select **Single Page Web Applications** and click **Create** button.
4. Select **React** as technology.
5. In the click the **Settings** tab.
6. Scroll down to **Application URLs** and for **Allowed Callback URLs** provide value _http://localhost:3000_. Do the same for **Allowed Logout URLs** and **Allowed Web Origins**.
7. Scroll down and click button **Save changes**.
8. Scroll to the top where you can find **Domain** and **Client ID** values which you will need for the .env file.
