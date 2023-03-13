const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    const queue = "hello";
    channel.assertQueue(queue, {
      durable: false,
    });
    setInterval(function () {
        const random = Math.floor(Math.random() * 100);
        const msg = `Hello World! ${random}`;
        send(channel, queue, msg);
    }, 500);
  });
});

const send = (channel, queue, msg) => {
  channel.sendToQueue(queue, Buffer.from(msg));
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] Sent ${msg}`);
};
