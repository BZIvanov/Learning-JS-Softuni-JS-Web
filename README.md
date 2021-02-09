# General info

## Production and Development dependencies

For our project we usually use many 3rd party packages, but some of them are for production version and some for development.
To separate them, when installing we can specify which are for development only the following way:

```javascript
npm install nodemon --save-dev
```

-dev in the end will place it in dev dependencies in the package.json file.

---

## Nodemon

Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.

Just use _nodemon_ instead of _node_ in your scripts in the package.json file to run your code, and now your process will automatically restart when your code changes. To install from your terminal run:

```javascript
npm install nodemon --save-dev
```

## ESLint and Prettier

In order for them to work make sure you have enabled _Format On Save_ option in VS Code. You can find that option _File>Preferences>Settings_.

To see the warnings from ESLint you need to have open VS Code on the root level with the configurations files for prettier and eslint.

## Packages and dependencies

Open terminal in the root folder with package.json file and run one of the following commands.

- **npm list** - will list the tree of the dependencies for our project and also the dependencies of our dependencies. This tree view list might get really large.

- **npm list --depth=1** - this command will also display the tree of dependencies, but only for the first 2 levels (0 and 1). Increasing the number will also increase the depth of the tree we will see.

- **npm view mongoose dependencies** - will display the dependencies for specific package

- **npm view mongoose versions** - will display all the release versions of specific package
