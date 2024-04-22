import { DocumentData } from "firebase/firestore";
import "./sidebarChannel.scss";
import { useAppDispatch } from "../app/hooks";
import { setChannelInfo } from "../features/channelSlice";

type Props = {
	id: string;
	channel: DocumentData;
};
const SidebarChannel = (props: Props) => {
	const { id, channel } = props;
	const dispatch = useAppDispatch();

	console.log(id, channel);
	return (
		<div
			className="sidebarChannel"
			onClick={() =>
				dispatch(
					setChannelInfo({
						channelId: id,
						channelName: channel.channel.channelName,
					})
				)
			}
		>
			<h4>
				<span className="sidebarChannelhash">#</span>
				{channel.channel.channelName}
			</h4>
		</div>
	);
};

export default SidebarChannel;
