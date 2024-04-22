import React, { useEffect, useState } from "react";
import "./Chat.scss";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useAppSelector } from "../../app/hooks";
import {
	CollectionReference,
	DocumentData,
	DocumentReference,
	Timestamp,
	addDoc,
	collection,
	onSnapshot,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";

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

const Chat = () => {
	const [inputText, setInputText] = useState<string>("");
	const [messages, setMessages] = useState<Messages[]>([]);
	const channelName = useAppSelector((state) => state.channel.channelName);
	const channelId = useAppSelector((state) => state.channel.channelId);
	const user = useAppSelector((state) => state.user.user);

	useEffect(() => {
		let collectionRef = collection(
			db,
			"channels",
			String(channelId),
			"messages"
		);

		onSnapshot(collectionRef, (snapshot) => {
			let results: Messages[] = [];
			snapshot.docs.forEach((doc) => {
				results.push({
					timestamp: doc.data().timestamp,
					message: doc.data().message,
					user: doc.data().user,
				});
			});
			setMessages(results);
			console.log(results);
		});
	}, [channelId]);

	// console.log(channelName);
	console.log(inputText);

	const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		// channelsコレクションの中にあるmessageコレクションの中にメッセージを入れる
		const collectionRef: CollectionReference<DocumentData> = collection(
			db,
			"channels",
			String(channelId),
			"messages"
		);

		const docRef: DocumentReference<DocumentData> = await addDoc(
			collectionRef,
			{
				message: inputText,
				timestamp: serverTimestamp(),
				user: user,
			}
		);

		console.log(docRef);
	};

	return (
		<div className="chat">
			{/* chatHeader */}
			<ChatHeader channelName={channelName} />
			{/* chatMessage */}
			<div className="chatMessage">
				{messages.map((message, index) => (
					<ChatMessage
						key={index}
						message={message.message}
						timestamp={message.timestamp}
						user={message.user}
					/>
				))}
			</div>
			{/* chatImput */}
			<div className="chatInput">
				<AddCircleOutlineIcon />
				<form action="">
					<input
						type="text"
						placeholder={`#${channelName}へメッセージを送信`}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setInputText(e.target.value)
						}
					/>
					<button
						type="submit"
						className="chatInputButton"
						onClick={(e: React.MouseEvent<HTMLButtonElement>) => sendMessage(e)}
					>
						送信
					</button>
				</form>

				<div className="chatInputIcons">
					<CardGiftcardIcon />
					<GifIcon />
					<EmojiEmotionsIcon />
				</div>
			</div>
		</div>
	);
};

export default Chat;
