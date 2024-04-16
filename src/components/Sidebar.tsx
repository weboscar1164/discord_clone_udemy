import React from "react";
import "./Sidebar.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SidebarChannel from "./SidebarChannel";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = () => {
	return (
		<div className="sidebar">
			{/* sidebarLeft */}
			<div className="sidebarLeft">
				<div className="serverIcon">
					<img src="./vite.svg" alt="" />
				</div>
				<div className="serverIcon">
					<img src="./vite.svg" alt="" />
				</div>
			</div>
			{/* sidebarRight */}
			<div className="sidebarRigt">
				<div className="sidebarTop">
					<h3>Discord</h3>
					<ExpandMoreIcon />
				</div>
				{/* sidebarChannels */}
				<div className="sidebarChannels">
					<div className="sidebarChannelsHeader">
						<div className="sidebarHeader">
							<ExpandMoreIcon />
							<h4>プログラミングチャンネル</h4>
						</div>
						<AddIcon className="sidebarAddIcon" />
					</div>

					<div className="sidebarChannelList">
						<SidebarChannel />
						<SidebarChannel />
						<SidebarChannel />
						<SidebarChannel />
					</div>
				</div>
				<div className="sidebarFooter">
					<div className="sidebarAccount">
						<img src="./icon.png" alt="" />
						<div className="accountName">
							<h4>ShinCode</h4>
							<span>#8162</span>
						</div>
					</div>

					<div className="sidevbarVoice">
						<KeyboardVoiceIcon />
						<HeadphonesIcon />
						<SettingsIcon />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;