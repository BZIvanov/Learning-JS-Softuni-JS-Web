# Deployment on the FRONT-END

1. Deploying on netlify.com

- create your account
- after login go to **Sites** section
- there you can find a box over which you can drag and drop the folder containing your project
- for your domain you will be given random site name, which you can change this way: _click your website box_ -> **Site settings** -> **Change site name** -> _Enter the name you want_

2. Deploying on Heroku

- Create your account
- When in Heroku click the button _Create new app_
- You will be redirected to the installation page
- Download the installer which will install Heroku CLI
- Check if installed correctly by running in the terminal

```bash
heroku --version
```

- You need to log in from the termianl

```bash
heroku login
```

- After login create your heroku project

```bash
heroku create some-project
```

- And follow the rest of the steps...

Something specific is that you will need simple express server file which will serve the app.

You will also need to specify the run commands in package.json file
