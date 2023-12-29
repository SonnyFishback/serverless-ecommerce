import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import bcrypt from 'bcryptjs';
// import { v4 as uuidv4 } from 'uuid';

const db = new DynamoDBClient({ region: "us-east-1" });

export const handler = async (event) => {
  try {
    if (!event?.body) {
      throw new Error("No body in request");
    }

    const data = JSON.parse(event.body);

    if (!data.email || !data.password) {
      throw new Error("Missing email or password");
    }

    const { email, password } = data;

    await createUser(email, password);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User created" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error creating user",
        error: error.message || error.toString() || "",
      }),
    };
  }
};

/**
 * Creates a new user record in the database.
 */
const createUser = async (email: string, password: string) => {
  // const uuid = uuidv4(); // Generate a unique UUID for the user and use that as the PK
  const encryptedPassword = await bcrypt.hash(password, 10);
  const data = {
    TableName: "prod-snbx.link-table",
    Item: {
      PK: { S: `USER#${email}` },
      SK: { S: email },
      Attributes: {
        M: {
          email: { S: email },
          password: { S: encryptedPassword },
        },
      },
    },
  };
  const command = new PutItemCommand(data);
  return await db.send(command);
};
