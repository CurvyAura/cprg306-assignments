import { db } from "../../../utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";


// Retrieve all items for given user.
export async function getItems(userId) {
		const itemsList = [];
		const itemsCollectionRef = collection(db, "users", userId, "items");
		const itemsSnapshot = await getDocs(itemsCollectionRef);
		itemsSnapshot.forEach((docSnap) => {
				itemsList.push({ id: docSnap.id, ...docSnap.data() });
		});
		return itemsList;
}

// Add a new item for given user.
export async function addItem(userId, item) {
	const itemsCollectionRef = collection(db, "users", userId, "items");
	const addedDocRef = await addDoc(itemsCollectionRef, item);
	return addedDocRef.id;
}

