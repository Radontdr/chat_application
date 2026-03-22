import React from "react";
import { ChatState } from "../context/chatContext";
import { useState ,useEffect} from "react";
import { Toaster } from "@chakra-ui/react";
import { set } from "mongoose";
const MyChats = () => {
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
                positon="bottom-left",
            });
        }
    }

        useEffect(()=>{
            setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
            fetchChats();
        },[]);


    return <div>
        MyChats
    </div>
}
export default MyChats;