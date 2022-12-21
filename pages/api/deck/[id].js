import { firestore } from 'utils/firebase/clientApp';
import {
  doc,
  getDoc,
  collection,
  query,
  getDocs,
  where,
} from 'firebase/firestore';

const chunkArray = (list, chunk) => {
  const result = [];

  for (let i = 0; i < list.length; i += chunk) {
    result.push(list.slice(i, i + chunk));
  }

  return result;
};

const getDeck = async (req, res) => {
  const { id } = req.query;
  if (req.method === 'GET') {
    try {
      const { userUid } = req.query;
      const docRef = doc(firestore, `decks/${id}`);
      const document = await getDoc(docRef);

      console.log(userUid);

      console.log(document.data());

      const blockDocs = await getDocs(
        query(
          collection(firestore, 'blocks'),
          where('uid', 'in', document.data().blocks)
        )
      );

      const chunks = [];
      const blockData = [];

      blockDocs.forEach((doc) => {
        blockData.push(doc.data());
        chunks.push(...chunkArray(doc.data().words, 10));
      });

      const wordsData = [];

      const activeDeckDoc = await getDoc(
        query(doc(firestore, `users/${userUid}/activeDecks/${id}`))
      );

      let userDeckData = null;
      if (activeDeckDoc.exists()) {
        console.log('Active Deckdoc: ', activeDeckDoc);
        userDeckData = Object.keys(activeDeckDoc.data()).map((key) => {
          return { id: key, ...activeDeckDoc.data()[key] };
        });
      }

      console.log('Chunks: ', chunks);

      for (let i = 0; i < chunks.length; i++) {
        const chunkDocs = await getDocs(
          query(collection(firestore, 'words'), where('uid', 'in', chunks[i]))
        );
        wordsData.push(...chunkDocs.docs.map((doc) => doc.data()));
      }

      res.status(200).json({
        ...document.data(),
        words: wordsData,
        blocks: blockData,
        userDeckData: userDeckData,
      });
    } catch (e) {
      console.log(e);
      res.status(400).end();
    }
  }
};

export default getDeck;
