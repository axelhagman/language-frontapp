import { app, firestore } from 'utils/firebase/clientApp';
import {
  doc,
  addDoc,
  collection,
  setDoc,
  query,
  getDocs,
  where,
  writeBatch,
} from 'firebase/firestore';

const testRequest = async (req, res) => {
  console.log(req.method);
  if (req.method === 'GET') {
    try {
      const { userUid } = req.query;
      // const q = query(
      //   collection(firestore, 'test'),
      //   where('authorUid', '==', userUid)
      // );
      // const entries = await getDocs(q);

      const entries = await getDocs(collection(firestore, 'basicCards'));
      const entriesData = entries.docs.map((entry) => {
        return { ...entry.data(), id: entry.id };
      });

      res.status(200).json(entriesData);
    } catch (e) {
      console.log(e);
      res.status(400).end();
    }
  } else if (req.method === 'POST') {
    try {
      const { title, language01, language02, author, wordsData } = req.body;

      const batch = writeBatch(firestore, 'words');

      const wordsIds = [];

      wordsData.forEach((word) => {
        const newWordRef = doc(collection(firestore, 'words'));

        wordsIds.push(newWordRef.id);

        batch.set(newWordRef, { ...word, uid: newWordRef.id });
      });

      const docRef = await addDoc(collection(firestore, 'basicCards'), {
        title: title,
        language01,
        language02,
        authorUid: author.uid,
        displayName: author.displayName,
        words: [...wordsIds],
      });

      batch.commit();

      res.status(200).json({ ID: docRef.id });
    } catch (e) {
      console.log(e);
      res.status(400).end();
    }
  }
};

export default testRequest;
