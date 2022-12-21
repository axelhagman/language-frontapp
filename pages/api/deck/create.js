import { firestore } from 'utils/firebase/clientApp';
import {
  doc,
  addDoc,
  collection,
  writeBatch,
  setDoc,
} from 'firebase/firestore';

const createDeck = async (req, res) => {
  if (req.method === 'POST') {
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

      batch.commit();

      const newBlockRef = doc(collection(firestore, 'blocks'));

      await setDoc(newBlockRef, {
        title: blockTitle,
        creator: author.uid,
        language01,
        language02,
        uid: newBlockRef.id,
        words: [...wordsIds],
      });

      const newDeckRef = await addDoc(collection(firestore, 'decks'), {
        title: title,
        language01,
        language02,
        creator: author.uid,
        displayName: author.displayName,
        blocks: [newBlockRef.id],
      });

      res.status(200).json({ ID: newDeckRef.id });
    } catch (e) {
      console.log(e);
      res.status(400).end();
    }
  }
};

export default createDeck;
