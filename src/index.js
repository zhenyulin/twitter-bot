import { createServer } from 'http';

import app from './app';

/* eslint-disable no-console */
const { PORT = 3000 } = process.env;
const SERVER_START = `server started on port ${PORT}`;
console.time(SERVER_START);
const server = createServer(app);
server.listen(PORT, () => console.timeEnd(SERVER_START));
/* eslint-enable no-console */

if (process.env.NODE_ENV === 'development' && module.hot) {
  let currentApp = app;
  module.hot.accept('./app', () => {
    server.removeListener('request', currentApp);
    /* eslint-disable global-require */
    const hotApp = require('./app').default;
    /* eslint-enable global-require */
    server.on('request', hotApp);
    currentApp = hotApp;
  });
}
