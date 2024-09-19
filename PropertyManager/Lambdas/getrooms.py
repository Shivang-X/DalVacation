import jsonimport boto3from decimal import Decimal# Custom encoder to handle Decimal objectsclass DecimalEncoder(json.JSONEncoder):    def default(self, obj):        if isinstance(obj, Decimal):            # Convert Decimal to float            return float(obj)        return super(DecimalEncoder, self).default(obj)def lambda_handler(event, context):    # Initialize DynamoDB client    dynamodb = boto3.resource('dynamodb')    table = dynamodb.Table('Rooms')    try:        response = table.scan()        rooms = response.get('Items', [])        return {            'statusCode': 200,            'body': json.dumps({'rooms': rooms}, cls=DecimalEncoder),            'headers': {                'Content-Type': 'application/json'            }        }    except Exception as e:        return {            'statusCode': 500,            'body': json.dumps({'error': str(e)}),            'headers': {                'Content-Type': 'application/json'            }        }