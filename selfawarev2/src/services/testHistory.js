import { db, auth } from './firebase';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';


export async function saveTestResult(result) {
  const user = auth.currentUser;
  if (!user) return;
  await addDoc(collection(db, 'testHistory'), {
    uid: user.uid, 
    contexto: result.contexto,
    data: result.data,
    respostas: result.respostas,
    pontuacao: result.pontuacao,
    feedback: result.feedback,
  });
}


export async function getTestHistory() {
  const user = auth.currentUser;
  if (!user) return [];
  const q = query(
    collection(db, 'testHistory'),
    where('uid', '==', user.uid),
    orderBy('data', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
