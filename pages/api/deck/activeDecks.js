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
  documentId,
} from 'firebase/firestore';

const activeDecks = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { userUid } = req.query;
      console.log('user ID: ', userUid);

      const activeDecksDocs = await getDocs(
        query(collection(firestore, `users/${userUid}/activeDecks`))
      );

      const entries = await getDocs(
        collection(firestore, 'decks'),
        where('uid', '')
      );
      //   console.log(entries);
      const entriesData = {};
      entries.docs.forEach((entry) => {
        entriesData[entry.id] = { ...entry.data() };
      });

      const activeDecksData = {};

      activeDecksDocs.docs.forEach((entry) => {
        activeDecksData[entry.id] = {
          userDeckData: { ...entry.data() },
          basicDeckData: { ...entriesData[entry.id] },
        };
      });

      console.log(entriesData);

      res
        .status(200)
        .json({ activeDecks: activeDecksData, allDecks: entriesData });
    } catch (e) {
      console.log(e);
      res.status(400).end();
    }
  }
};

export default activeDecks;
