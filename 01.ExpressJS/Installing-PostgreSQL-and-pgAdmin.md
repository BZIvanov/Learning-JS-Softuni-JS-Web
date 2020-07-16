# Installing the Database

1. Go to official [website](https://www.postgresql.org/).
2. Click the _Download_ button.
3. Click the version matching your operating system.
4. Click _Download the installer_ hyperlink.
5. You should be able to see a table with versions of PostgreSQL and operating systems. Click the _Download_ button with the latest version for your operating system.
6. Wait for downloading the exe file.
7. On the Select Components step uncheck _pgAdmin 4_, because we will install it separately
8. On the Data Directory step select different from C:\ directory, use D:\ instead. Something like this D:\PostgreSQL
9. The next steps are obvious or default.
10. On the last step uncheck Stack Builder and click _Finish_
11. That's it.

# Installing GUI tool pgAdmin

1. Go to official [website](https://www.pgadmin.org/).
2. Click _Download_.
3. Select your operatin system.
4. Select the latest version.
5. Click the .exe file hyperlink.
6. Install the exe file, the steps are pretty obvious/default.
7. That's it, you can now open pgAdmin and start working your GUI tool.

## Using psql

If you want to use the psql command, you need to add it to the Environment variables on Windows. Note that you have to edit the **path** variable by adding new path to it, not to create whole new variable.

Then you can use the following command

```
psql -U postgres
```

This will log you in and allow you to do changes.
**-U** stands for user
**postgres** is the name of the default super-user in postrgeSQL

With the below command you can list all the databases you have

```
\l
```

We can select one of our databases in the list by running

```
\c database-name-here
```

Will displat table

```
\dt
```
