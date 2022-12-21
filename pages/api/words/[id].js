import { firestore } from 'utils/firebase/clientApp';
import {
  doc,
  getDoc,
  collection,
  query,
  getDocs,
  where,
  documentId,
} from 'firebase/firestore';

const getUserWords = async (req, res) => {
  const { id } = req.query;
  if (req.method === 'GET') {
    try {
      const wordsDocuments = await getDocs(
        collection(firestore, `users/${id}/activeDecks`)
      );

      console.log(id);

      const documentsData = {};
      const decksIds = [];
      wordsDocuments.forEach((doc) => {
        const sortedArray = [];
        const entries = Object.entries(doc.data());

        entries.sort(
          (a, b) => new Date(a[1].nextDate) - new Date(b[1].nextDate)
        );

        for (const [key, value] of entries) {
          sortedArray.push({ ...value, wordId: key });
        }
        decksIds.push(doc.id);
        documentsData[doc.id] = sortedArray;
      });

      console.log(decksIds);

      const decksDocuments = await getDocs(
        collection(firestore, 'decks'),
        where(
          documentId(),
          'in',
          wordsDocuments.docs.forEach((doc) => {
            return doc.id;
          })
        )
      );

      console.log('decksDocuments', decksDocuments);

      decksDocuments.forEach((doc) => {
        console.log('doc data: ', doc.data());
      });

      res.status(200).json(documentsData);
    } catch (e) {
      console.log(e);
      res.status(400).end();
    }
  }
};

export default getUserWords;
