import { firestore } from 'utils/firebase/clientApp';
import {
  doc,
  getDoc,
  collection,
  query,
  getDocs,
  where,
  addDoc,
  setDoc,
} from 'firebase/firestore';

const result = async (req, res) => {
  const { id } = req.query;
  if (req.method === 'POST') {
    try {
      const { gradedData, author } = req.body;
      console.log('user ID: ', author.uid);

      console.log('Set ID: ', id);

      console.log('Graded Data: ', gradedData);

      const document = doc(
        firestore,
        `users/${author.uid}/activeDecks`,
        `${id}`
      );
      await setDoc(document, {
        ...gradedData,
      });

      res.status(200);
    } catch (e) {
      console.log(e);
      res.status(400).end();
    }
  }
};

export default result;
