const net = require('net');
const client = new net.Socket();

const PORT = process.env.PORT || 3001;

client.connect(PORT, 'localhost', () => {
  console.log(`Connected on ${PORT}`);
});

let eventsToLog = ['connected', 'save', 'error'];
client.on('data', data => {
  try {
    let event = JSON.parse(data.toString());
    if (eventsToLog.includes(event.eventType)) {
      console.log('LOG', data.toString());
    }
  } catch (err) {

  }
});

client.on('close', () => {
  console.log('Connection closed');
});
