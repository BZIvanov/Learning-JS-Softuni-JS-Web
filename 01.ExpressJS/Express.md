# Node JS

Node JS is single threaded.

## Streams

There are 4 type of streams

- Readable
- Writable
- Duplex - it is both readable and writeable. Recommended to use _pipe_ in case reading is faster/slower than writing
- Transform - example is zipping

# Express

## Installing MongoDB on Windows

After you install MongoDB create the following folder _C:\data\db_ Without this folder MongoDB will not work.
To start your mongo server go to installation folder _C:\Program Files\MongoDB\Server\4.2\bin_ and open the terminal there and run **mongod**

## Installing MongoDB on Ubuntu

1. Open a terminal and run the following command:

```bash
sudo apt-get install mongodb
sudo apt-get update
```

2. To start the MongoDB run:

```bash
sudo service mongodb start
mongo
```

3. And to check if everything is ok, in the same terminal where we have our **mongo** running, type:

```bash
show dbs;
```

The expected result is to see names of the databases we have and space in GBs they take.

## Export/Import mongo database

Note: use the normal terminal on the root level, not the mongodb terminal.

1. Export - to export run the following command in the terminal

```bash
mongoexport --db project-one --collection movies --out resultExport.json
```

2. Import - to import run the following command in the terminal

```bash
mongoimport --db project-one --collection movies --file resultExport.json
```

## Code quality

To use ESLint and Prettier install all the dependencies and create config files for both es-lint and prettier.

## Debugging

For debugging use npm module **ndb** which makes debugging using Node.js very easy.

In the package.json for scripts we need to specify, that we will start our app with ndb.

#### Other Hints

- If we want to read file just once, not on every request, we can put the reading piece of code outside the createServer method, because outside that method the code is read only once.
