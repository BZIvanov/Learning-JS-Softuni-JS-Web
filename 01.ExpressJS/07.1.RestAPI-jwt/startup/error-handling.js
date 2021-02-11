module.exports = function () {
  process.on('uncaughtException', (err) => {
    console.log('===UNCAUGHT EXCEPTION error', err);
    process.exit(1);
  });

  process.on('unhandledRejection', (err) => {
    console.log('===UNHANDLED REJECTION error', err);
    process.exit(1);
  });
};
