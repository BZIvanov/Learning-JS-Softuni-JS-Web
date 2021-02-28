module.exports = function (server) {
  process.on('uncaughtException', (err) => {
    console.log('===UNCAUGHT EXCEPTION error', err);

    server.close(() => process.exit(1));
  });

  process.on('unhandledRejection', (err) => {
    console.log('===UNHANDLED REJECTION error', err);

    server.close(() => process.exit(1));
  });
};
