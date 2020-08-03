import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';
// const url = 'http://checkip.amazonaws.com/';
let response;

exports.worker = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const result = await axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/todos/1',
    });
    const inboundMsg = JSON.parse(event?.body);
    console.log(
      `received message ===> ${inboundMsg?.name} said: ${inboundMsg?.message}`,
    );

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `Hi ${inboundMsg?.name ?? 'there'}, I am Peggy`,
        additionalData: result.data,
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
