import {
  connectDatabase,
  insertDocument,
  getAllDocument,
} from '../../../helpers/db-utils';

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: 'Connecting to the database failed' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim === '' ||
      !text ||
      text.trim === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      client.close();
      return;
    }

    const newComment = {
      eventId,
      email,
      name,
      text,
    };

    let result;

    try {
      result = await insertDocument('newsletter', 'comments', client, newComment);
      res.status(201).json({ message: 'Comment Added', comment: newComment });
    } catch (err) {
      res.status(500).json({ message: 'Inserting data failed' });
    }
    console.log(result);
    console.log(newComment);
  }

  if (req.method === 'GET') {
    try{
      const documents = await getAllDocument('newsletter', 'comments', client, {
        eventId: eventId,
      });
      res.status(200).json({ comments: documents });

    } catch(err) {
      res.status(500).json({message: 'Failed to fetch comments'});
    }
  }
  client.close();
}

export default handler;
