import { firestore } from 'utils/firebase/clientApp';
import {
  doc,
  getDoc,
  collection,
  query,
  getDocs,
  where,
} from 'firebase/firestore';

const testRequest = async (req, res) => {
  const { id } = req.query;
  if (req.method === 'GET') {
    try {
      const docRef = doc(firestore, `basicCards/${id}`);
      const document = await getDoc(docRef);

      const wordDocs = await getDocs(
        query(
          collection(firestore, 'words'),
          where('uid', 'in', document.data().words)
        )
      );

      const wordsData = wordDocs.docs.map((doc) => {
        return doc.data();
      });

      res.status(200).json({ ...document.data(), words: wordsData });
    } catch (e) {
      console.log(e);
      res.status(400).end();
    }
  }
};

export default testRequest;
