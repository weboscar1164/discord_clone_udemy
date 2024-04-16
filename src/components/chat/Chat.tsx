import React from "react";
import "./Chat.scss";
import ChatHeader from "./ChatHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const Chat = () => {
	return (
		<div className="chat">
			{/* shatHeader */}
			<ChatHeader />
			{/* shatMessage */}
			<div className="chatName"></div>
			{/* shatImput */}
			<div className="chatInput">
				<AddCircleOutlineIcon />
				<form action="">
					<input type="text" placeholder="#Udemyへメッセージを送信" />
					<button type="submit" className="chatInputButton">
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
