// internal lib
const { initTelegram } = require("./lib/init");
const { longPoller } = require('./lib/long_poller');


(async () => {
  await initTelegram();  
  longPoller();
})();