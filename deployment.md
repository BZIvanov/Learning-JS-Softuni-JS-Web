# Deployment on the FRONT-END

## NETLIFY

#### Front-end

1. Deploying on netlify.com

- create your account
- after login go to **Sites** section
- there you can find a box over which you can drag and drop the folder containing your project
- for your domain you will be given random site name, which you can change this way: _click your website box_ -> **Site settings** -> **Change site name** -> _Enter the name you want_

## HEROKU

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

# Deployment for the Database

More specificaly this means, where our database will be hosted and not actually deploying it there.

1. Using MongoDB Atlas. Of course this solution applies if you want to use MongoDB and not any other database.

- First create your account

  - You will need to start with selecting cluster region. Choose AWS as cloud provider and go with recommended region.
  - For cluster tier make sure you have selected M0 which is the free tier
  - No need to rename the cluster, go with the default name

- Next is to create your cluster user, the first created user will have admin rights
  - click your cluster name
  - click CONNECT button
  - fill the username and password for the new user
  - whitelist your current IP address by adding it
  - on the next step choose the option _Connect your application_
  - on the next step you can see your connection string. It should look like below:
    **mongodb+srv://Ivan:<password>@cluster0-jdope.mongodb.net/test?retryWrites=true&w=majority**
  - click again _Connect_ button to review again your connection string
  - you can also install _Atlas_ as GUI
  - if using Atlas click the connect button in MongoDB and you should be able to find a tab, where you can automatically connect Atlas.

2. Using PostgreSQL with Heroku

**2.1 Heroku**

- first you will need Heroku account
- once logged in click the button **New** => **Create new app**
- give a name on your app choose a region and click **Create app**
- you will be redirected to the overview page, on there click **Configure Add-ons** link
- search for _Heroku Postgres_ on the popup window select the _Free_ version and click **Provision**
- once created click on the database, new browser tab will be opened with overview of your database
- you can find your credentials by clicking **Settings** => **View Credentials**

**2.2 pgAdmin**

pgAdmin is GUI tool which will help us to eays work with our database. For example we can examine our tables.

- go to website _pgadmin.org_ click **Download** button and click **Windows**
- choose the latest version, then choose the _.exe_ file (should be like 100 MBs) to download
- install the .exe file
- when you start the pgAdmin new tab in the browser will be opened
- to have a server to work with, we need to create it. Click **Add New Server**
- name your server whatever you like in the _General_ tab
- in the _Connection_ tab is where our credentials are
- for the _Host name/address_ from Heroku credentials copy paste the _Host_ value
- port should match in the pgAdmin and Heroku (it matches by default with value 5432)
- for _Maintenance database_ in pgAdmin use the _Database_ value from Heroku
- the same way copy paste username and password from Heroku to pgAdmin
- click the _Save password_ radio button so you dont have to provide the password each time, when connecting
- _Role_ and _Service_ are not needed, click the **Save** button
- now on the left panel you should be able to see your server
- click your database name and click _Databases_, you should see many different which we don't own.
- to easily find our database copy the name from Heroku and search in the browser

**2.3 Docker**

We need Docker for Prisma

- go to _docker.com_ and click **Get Started**
