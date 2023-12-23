export const handler = async (event) => {
  try {
    if (!event?.body) {
      throw new Error('No body in request');
    }

    let { body } = event;
    body = JSON.parse(body);

    if (!body.email || !body.password) {
      throw new Error('Missing email or password');
    }

    const { email, password } = body;

  } catch (error) {
    console.error(error);
  }
};
  