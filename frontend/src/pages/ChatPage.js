import React from "react";
import axios from "axios";
import { useEffect,useState } from "react";
import { ChatState } from "../context/chatContext";
import SideDrawer from "../components/miscellaneous/sideDrawer";
import MyChats from "../components/myChats";
import ChatBox from "../components/chatBox";
import { Box } from "@chakra-ui/react"

const ChatPage = () => {
    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);

    return <div width="100%" >
        {user && <SideDrawer/>}
        <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            height="91.5vh"
            padding="10px"
        >
            {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
        </Box>
    </div> 
}
export default ChatPage;