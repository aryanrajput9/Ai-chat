
import SideBar from "../components/SideBar";
import ChatPanel from "./ChatPanel";

function MainPage() {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#090B09]">

            {/* Sidebar */}
            <SideBar />

            {/* Chat Panel */}
            <ChatPanel />

        </div>
    );
}

export default MainPage;