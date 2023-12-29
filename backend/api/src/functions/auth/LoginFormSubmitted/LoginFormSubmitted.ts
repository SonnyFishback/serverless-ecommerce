import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const db = new DynamoDBClient({ region: 'us-east-1' });

export const handler = async (event) => {
  try {
    if (!event?.body) {
      throw new Error('No body in request');
    }

    const { email, password } = JSON.parse(event.body);
    console.log(`Login attempt for ${email}`);
    const user = await getUserByEmail(email);

    if (!user) {
      return { statusCode: 401, body: JSON.stringify({ message: `No user exists with the email ${email}` }) };
    }

    // Verify the password
    const passwordIsValid = bcrypt.compare(password, user?.password || '');
    if (!passwordIsValid) {
      return { statusCode: 401, body: JSON.stringify({ message: "Invalid password" }) };
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.PK }, 'your_jwt_secret', { expiresIn: '1h' });

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error logging in" }),
    };
  }
};

/**
 * Retrieves user data from DynamoDB based on the email.
 */
const getUserByEmail = async (email: string) => {
  const client = new DynamoDBClient({ region: "us-east-1" }); // Replace with your region

  const params = {
    TableName: "prod-snbx.link-table", // Replace with your table name
    KeyConditionExpression: "#pk = :pk AND #sk = :sk",
    ExpressionAttributeNames: {
      "#pk": "PK",
      "#sk": "SK",
    },
    ExpressionAttributeValues: {
      ":pk": { S: `USER#${email}` },
      ":sk": { S: email },
    },
  };

  try {
    const data = await client.send(new QueryCommand(params));
    const items = data.Items;

    if (items.length > 0) {
      console.log("Found item:", items[0]);
      return items[0];
    } else {
      console.log("No matching item found.");
      return null;
    }
  } catch (error) {
    console.error("Error querying DynamoDB:", error);
    throw error;
  }
};
