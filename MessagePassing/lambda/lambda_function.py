# PUBLISHER
# POST: {"clientId": 123, "complaint": "The AC of room 123 is not working!"}
import json
import os
from google.cloud import pubsub_v1

# Set the environment variable within the Lambda function
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./path-to-service-account-key.json"

project_id = 'serverless-426417'
topic_id = 'complaint-topic'

publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path(project_id, topic_id)

def lambda_handler(event, context):
    """Lambda function to publish message to Pub/Sub."""
    if 'body' in event:
        event_body = event['body']
        if isinstance(event_body, str):
            message = json.loads(event_body).get('body')
        elif isinstance(event_body, dict):
            message = event_body
        else:
            return {
                'statusCode': 400,
                'body': json.dumps('Invalid message format.')
            }
    else:
        return {
            'statusCode': 400,
            'body': json.dumps('Message body not found.')
        }

    if not message:
        return {
            'statusCode': 400,
            'body': json.dumps('Message not provided.')
        }

    data = json.dumps(message).encode('utf-8')

    try:
        future = publisher.publish(topic_path, data)
        message_id = future.result()
        return {
            'statusCode': 200,
            'body': json.dumps(f'Message {message_id} published.')
        }
    except Exception as e:
        print(f'Error publishing message: {e}')
        return {
            'statusCode': 500,
            'body': json.dumps('Error publishing message.')
        }
