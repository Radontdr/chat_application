import React from "react";
import { ChatState } from "../context/chatContext";
import { useState ,useEffect} from "react";
import { Stack, Toaster } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";  
import ChatLoading from "./chatLoading";   
import { getSender } from "../config/chatsLogic";   
import { GroupChatModel } from "./miscellaneous/groupChatModel";      
const MyChats = ({ fetchAgain }) => {
    const {user,selectedChat,setSelectedChat,chats,setChats}=ChatState();
    const [loggedUser,setLoggedUser]=useState();
    const toaster = Toaster();

    const fetchChats=async()=>{
        try {
            const config={
                headers:{
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data}=await axios.get("/api/chat",config);
            setChats(data);
        } catch (error) {
            toaster({
                title: "Error fetching chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                positon:"bottom-left",
            });
        }
    }

        useEffect(()=>{
            setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
            fetchChats();
        },[fetchAgain]);


    return <Box
        d={{base:selectedChat?"none":"flex",md:"flex"}}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"        
        w={{base:"100%",md:"31%"}}
        borderRadius="lg"
        borderWidth="1px"
        >
            <Box
            pb={3}
            px={3}
            fontSize={{base:"28px",md:"30px"}}
            fontFamily="Work sans"
            display="flex"
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            >
                My Chats
                <GroupChatModel>
                    <Button
                    display="flex"
                    fontSize={{base:"17px",md:"10px",lg:"17px"}}
                    rightIcon={<FaPlus/>}
                    >
                        New Group Chat       
                    </Button>
                </GroupChatModel>
            </Box>
            <Box
            display="flex"
            flexDir="column"
            p={3}
            bg="#F8F8F8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
            >
                {chats?(
                    <Stack overflowY="scroll">
                        {chats.map((chat)=>(
                            <Box
                            onClick={()=>setSelectedChat(chat)}
                            cursor="pointer"
                            bg={selectedChat===chat?"#38B2AC":"#E8E8E8"}
                            color={selectedChat===chat?"white":"black"}
                            px={3}
                            py={2}
                            borderRadius="lg">
                                <Text>
                                    {!chat.isGroupChat?getSender(loggedUser,chat.users):chat.chatName}
                                </Text>
                            </Box>
                        ))}
                    </Stack>
                ):(
                    <ChatLoading/>
                )}
            </Box>
    </Box>
}
export default MyChats;