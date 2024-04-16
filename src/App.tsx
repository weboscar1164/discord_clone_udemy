import "./App.scss";
import Sidebar from "./components/Sidebar";
import Chat from "./components/chat/Chat";

function App() {
	return (
		<div className="App">
			{/* Sidebar */}
			<Sidebar />

			{/* Chat */}
			<Chat />
		</div>
	);
}

export default App;
