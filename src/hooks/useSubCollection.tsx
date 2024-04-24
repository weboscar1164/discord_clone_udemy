import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
	Timestamp,
	collection,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";
import { useAppSelector } from "../app/hooks";

interface Messages {
	timestamp: Timestamp;
	message: string;
	user: {
		uid: string;
		photo: string;
		email: string;
		displayName: string;
	};
}
const useSubCollection = (
	collectionName: string,
	subCollectionName: string
) => {
	const channelId = useAppSelector((state) => state.channel.channelId);
	const [subDocuments, setSubDocuments] = useState<Messages[]>([]);

	useEffect(() => {
		let collectionRef = collection(
			db,
			collectionName,
			String(channelId),
			subCollectionName
		);

		const collectionDreOrderBy = query(
			collectionRef,
			orderBy("timestamp", "desc")
		);

		onSnapshot(collectionDreOrderBy, (snapshot) => {
			let results: Messages[] = [];
			snapshot.docs.forEach((doc) => {
				results.push({
					timestamp: doc.data().timestamp,
					message: doc.data().message,
					user: doc.data().user,
				});
			});
			setSubDocuments(results);
		});
	}, [channelId]);

	return { subDocuments };
};
export default useSubCollection;
