import { firestore } from 'utils/firebase/clientApp';
import { doc, collection, setDoc, writeBatch } from 'firebase/firestore';

const addBlock = async (req, res) => {
  const { id } = req.query;
  if (req.method === 'POST') {
    try {
      const {
        author,
        blockTitle,
        wordsData,
        practiceSetData,
        language01,
        language02,
      } = req.body;
      const docRef = doc(firestore, `practiceSets/${id}`);

      console.log(author, blockTitle, wordsData);

      // Create new word documents in words collection
      const batch = writeBatch(firestore, 'words');

      const wordsIds = [];

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

      // Create new block document in blocks collection
      const newBlockRef = doc(collection(firestore, 'blocks'));

      await setDoc(newBlockRef, {
        blockTitle,
        creator: author.uid,
        language01,
        language02,
        uid: newBlockRef.id,
        words: [...wordsIds],
      });

      // Add block id to setDocument blocks references array
      await setDoc(
        docRef,
        { sets: [...practiceSetData.sets, newBlockRef.id] },
        { merge: true }
      );

      res.status(200).json({ ID: docRef.id });
    } catch (e) {
      console.log(e);
      res.status(400).end();
    }
  }
};

export default addBlock;
