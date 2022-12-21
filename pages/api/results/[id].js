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
      const { gradedData, user, nextPracticeDate } = req.body;
      console.log('user ID: ', user.uid);

      console.log('Set ID: ', id);

      console.log('Graded Data: ', gradedData);

      console.log('next practice date: ', nextPracticeDate);

      const document = doc(firestore, `users/${user.uid}/activeDecks`, `${id}`);
      await setDoc(
        document,
        {
          ...gradedData,
        },
        { merge: true }
      );

      const userDoc = doc(firestore, `users/${user.uid}`);
      await setDoc(
        userDoc,
        {
          nextDates: {
            [id]: nextPracticeDate,
          },
        },
        { merge: true }
      );

      res.status(200);
    } catch (e) {
      console.log(e);
      res.status(400).end();
    }
  }
};

export default result;
