const functions = require('@google-cloud/functions-framework');
const {v1, PubSub} = require('@google-cloud/pubsub');

const topicName = 'chat-topic';
const formattedSubscription = 'projects/serverless-426417/subscriptions/chat-topic-pull';
const pubClient = new PubSub();
const subClient = new v1.SubscriberClient();

functions.http('chatFunction', async (req, res) => {
    if (req.method === 'POST') {

        const data = Buffer.from(JSON.stringify(req.body.message));

        try {
            const messageId = await pubClient.topic(topicName).publishMessage({data: data});
            res.status(200).send(`Message ${messageId} published.`);
        } catch (error) {
            res.status(500).send(`Error publishing message: ${error.message}`);
        }
    } else if (req.method === 'GET') {
        try {
            /* The maximum number of messages returned for this request.
            Pub/Sub may return fewer than the number specified. */
            const request = {
                subscription: formattedSubscription,
                maxMessages: 10,
            };

            /* The subscriber pulls a specified number of messages. */
            const [response] = await subClient.pull(request);

            /* Process the messages and then store them. */
            const ackIds = [];
            const messageData = [];
            for (const message of response.receivedMessages || []) {

                if (message.ackId) {
                    let parsedData = JSON.parse(message.message.data.toString());
                    messageData.push(parsedData);
                    ackIds.push(message.ackId);
                }
            }

            if (ackIds.length !== 0) {
                /* Acknowledge all of the messages. */
                const ackRequest = {
                    subscription: formattedSubscription,
                    ackIds: ackIds,
                };

                await subClient.acknowledge(ackRequest);
            }

            res.status(200).json({message: messageData.length === 0 ? ['No messages'] : messageData});
        } catch (error) {
            res.status(500).send(`Error pulling messages: ${error.message}`);
        }
    } else {
        res.status(405).send('Method not allowed');
    }
});
