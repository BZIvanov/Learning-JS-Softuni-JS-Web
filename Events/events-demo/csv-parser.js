const fs = require('fs');
const parse = require('csv-parse');
const path = require('path');

const constants = {
  testData: {
    csvColumns: ['ruby', 'python', 'vuejs', 'angular', 'react', 'nodejs'],
  },
};

const configFileLocation = (name) => {
  return {
    filename: path.join(__dirname, `${name}technologies.csv`),
  };
};

const getData = (name) =>
  new Promise((resolve, reject) => {
    const fileLocation = configFileLocation(name).filename;

    const csvParser = parse({
      delimiter: ',',
    });

    if (!fs.existsSync(fileLocation)) {
      reject(new Error(`File ${fileLocation} is missing.`));
    }

    const csvFileStream = fs.createReadStream(fileLocation);

    csvFileStream.on('ready', () => {
      csvFileStream.pipe(csvParser);
    });

    csvFileStream.on('error', (error) => {
      reject(
        new Error({
          error,
          message: 'csvParseCards#csvFileStream on error',
        })
      );
    });

    csvParser.on('error', (error) => {
      reject(
        new Error({
          error,
          message: 'csvParseCards#csvParser on error',
        })
      );
    });

    const cards = [];

    csvParser.on('readable', () => {
      let record = '';

      while ((record = csvParser.read())) {
        const card = {};

        const columns = constants.testData.csvColumns;

        if (record.length !== columns.length) {
          console.warn('Column mismatch', record);
        }

        record.map((value, index) => {
          card[columns[index]] = value;
        });

        cards.push(card);
      }
    });

    csvParser.on('end', () => {
      cards.shift();

      resolve(cards);
    });
  });

module.exports = getData;
