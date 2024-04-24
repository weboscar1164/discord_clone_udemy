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
	orderBy,
	query,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import useSubCollection from "../../hooks/useSubCollection";

const Chat = () => {
	const [inputText, setInputText] = useState<string>("");
	const channelName = useAppSelector((state) => state.channel.channelName);
	const channelId = useAppSelector((state) => state.channel.channelId);
	const user = useAppSelector((state) => state.user.user);
	const { subDocuments: messages } = useSubCollection("channels", "messages");

	const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		// channelsコレクションの中にあるmessageコレクションの中にメッセージを入れる
		const collectionRef: CollectionReference<DocumentData> = collection(
			db,
			"channels",
			String(channelId),
			"messages"
		);

		await addDoc(collectionRef, {
			message: inputText,
			timestamp: serverTimestamp(),
			user: user,
		});
		setInputText("");
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
						value={inputText}
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
