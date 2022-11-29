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

      const entries = await getDocs(collection(firestore, 'practiceSets'));
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
      const { title, language01, language02, author, blockTitle, wordsData } =
        req.body;

      const batch = writeBatch(firestore, 'words');

      const wordsIds = [];

      console.log(wordsData);

      wordsData.forEach((word) => {
        const newWordRef = doc(collection(firestore, 'words'));

        wordsIds.push(newWordRef.id);

        batch.set(newWordRef, {
          ...word,
          uid: newWordRef.id,
          creator: author.uid,
        });
      });

      const newBlockRef = doc(collection(firestore, 'blocks'));

      batch.set(newBlockRef, {
        blockTitle,
        creator: author.uid,
        language01,
        language02,
        uid: newBlockRef.id,
        words: [...wordsIds],
      });

      const docRef = await addDoc(collection(firestore, 'practiceSets'), {
        title: title,
        language01,
        language02,
        creator: author.uid,
        displayName: author.displayName,
        sets: [newBlockRef.id],
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
