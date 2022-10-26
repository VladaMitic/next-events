import { connectDatabase, insertDocument } from '../../helpers/db-utils';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: 'Connecting to the database failed' });
      return;
    }

    try {
      await insertDocument('newsletter','emails', client, {
        email: userEmail,
      });
      client.close();
    } catch (err) {
      res.status(500).json({ message: 'Inserting data failed' });
      return;
    }

    console.log(userEmail);
    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;
