import { IconButton } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../context/chatContext";
import {Text,IconButton} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import ProfileModal from "./miscellaneous/profileModal";
import { UpdateGroupChatModel } from "./miscellaneous/updateGroupChatModel";

export const SingleChat=({ fetchAgain, setFetchAgain })=>{
    const {selectedChat,setSelectedChat,user}=ChatState();
    return <>
        (selectedChat)?(
            <>
                <Text
                fontSize={{base:"28px",md:"30px"}}
                fontFamily="Work sans"
                pb={3}
                px={2}
                w="100%"
                display="flex"
                justifyContent={{base:"space-between"}}
                alignItems="center"
                >
                    <IconButton
                    icon={<ArrowBackIcon />}
                    onClick={() => setSelectedChat("")}
                    />
                    {selectedChat.isGroupChat?(
                        <>
                        {getSender(user,selectedChat.users)}
                        <ProfileModal user={getSenderFull(user,selectedChat.users)}/>
                        </>
                    ):(
                        <>
                        {selectedChat.chatName.toUpperCase()}
                        <UpdateGroupChatModel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                        </>
                    )}
                </Text>
                <Box
                display="flex"
                flexDir="column"
                justifyContent="flex-end"
                p={3}
                bg="#E8E8E8"
                w="100%"
                h="100%"
                overflowY="hidden"
                borderRadius="lg"
                >
                    {/* messages */}
                </Box>
            </>
        ):(
            <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            h="100%"
            >
                <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                    Click on a user to start chatting
                </Text>
            </Box>
        )
    </>
}