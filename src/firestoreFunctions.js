import { getFirestore, collection, getDocs, doc } from "firebase/firestore"; 

// Initialize Firestore
const db = getFirestore();

export const fetchBranches = async () => {
  const branchesCol = collection(db, 'branches');
  const branchesSnapshot = await getDocs(branchesCol);
  return branchesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchSemesters = async (branchId) => {
  const semestersCol = collection(db, `branches/${branchId}/semesters`);
  const semestersSnapshot = await getDocs(semestersCol);
  return semestersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchSubjects = async (branchId, semesterId) => {
  const subjectsCol = collection(db, `branches/${branchId}/semesters/${semesterId}/subjects`);
  const subjectsSnapshot = await getDocs(subjectsCol);
  return subjectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
