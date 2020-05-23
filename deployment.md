# Deployment on the FRONT-END

1. Deploying on netlify.com

- create your account
- after login go to **Sites** section
- there you can find a box over which you can drag and drop the folder containing your project
- for your domain you will be given random site name, which you can change this way: _click your website box_ -> **Site settings** -> **Change site name** -> _Enter the name you want_

2. Deploying on Heroku

2.1 For the React app:

First you will need to create very simple server file using Express.js which will serve the application. This is needed because our express server will handle server requests and provide our built application files.

Make changes in package.json file so the start command will start our express server, not the react app locally.

2.2 For the Heroku:

- Create your account
- When in Heroku click the button _Create new app_
- You will be redirected to the installation page
- Download the installer which will install Heroku CLI
- Check if installed correctly by running in the terminal

```bash
heroku --version
```

- You need to log in from the terminal

```bash
heroku login
```

- After login create your heroku project on the website or from the CLI

```bash
heroku create some-project
```

- Then run the following command to add the repository to heroku. Here except origin we have another remote which is the heroku, so with the second line we push to the heroku repository, not our github.

```bash
heroku git:remote -a your-app-name
git push heroku master
```

2.3 Heroku environment variables

- With the following command you can check for already set env variables

```bash
heroku config
```

- And this is how we can set env variable

```bash
heroku config:set KEY=value ANOTHER=some-other-value
```
