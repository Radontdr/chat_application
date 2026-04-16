import React from "react";
import { ChatState } from "../context/chatContext";
import {Box} from "@chakra-ui/react";
const ChatBox = ({ fetchAgain, setFetchAgain }) => {
    const {selectedChat}=ChatState();
    return 
    <Box    d={{base:selectedChat?"flex":"none",md:"flex"}}
    flexDir="column"
    alignItems="center"
    p={3}
    bg="white"
    w={{base:"100%",md:"69%"}}
    borderRadius="lg"
    borderWidth="1px"
    >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </Box>
}
export default ChatBox;