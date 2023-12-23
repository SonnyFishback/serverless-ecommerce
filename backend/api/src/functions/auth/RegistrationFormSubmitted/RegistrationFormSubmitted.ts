export const handler = async (event) => {
  try {
    if (!event?.body) {
      throw new Error('No body in request');
    }

    const data = JSON.parse(event.body);

    if (!data.email || !data.password) {
      throw new Error('Missing email or password');
    }

    const { email, password } = data;

    
    return {
      statusCode: 200,
      body: true
    }

  } catch (error) {
    console.error(error);
  }
};
  