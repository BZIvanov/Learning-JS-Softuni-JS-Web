## Creation process

### Backend

1. Login to Auth0.
2. From the menu on the left click **Applications**, then **APIs**, then click the **Create API** button.
3. Give it a **Name** by your choice (ex. cakes-api). Provide **Identifier** (ex. https://www.cakes-api.com). Use the default algorithm RS256. And click **Create** button.
4. After created you will be redirected to your API window. Click the **Settings** tab.
5. In the settings tab scroll down to **RBAC Settings** and enable both **Enable RBAC** and **Add Permissions in the Access Token**. And click the **Save** button at the bottom.
6. Now click the **Permissions** tab. Add the below values in the resepective field and agree with the **Add** button for each row.

| Permission (Scope) | Description      |
| ------------------ | ---------------- |
| read:cakes         | Read your cakes  |
| write:cakes        | Write your cakes |

7. Now click the **Quick start** tab and select **Node.js**, there you can find generated starter code.

### Frontend

1. From the menu on the left click **Applications**, then **Applications**, then click the **Create Application** button.
2. Give it a **Name** by your choice (ex. My Cakes App). Select **Single Page Web Applications**. And click **Create** button.
3. Select **React** as technology on the next step.
4. Once created go to the **Settings** tab, where you can get you values for the .env file and also set some values.
5. Scroll down to **Application URIs** and for **Allowed Callback URLs** set value _http://localhost:3000/cakes_, for **Allowed Logout URLs** set value _http://localhost:3000_, for **Allowed Web Origins** set value _http://localhost:3000_, for **Allowed Origins (CORS)** set value _http://localhost:3000_.
6. Scroll to bottom and click **Save changes** button.
7. As mentioned in step 4 in settings tab is where you can find the values needed for .env file on the frontend.
