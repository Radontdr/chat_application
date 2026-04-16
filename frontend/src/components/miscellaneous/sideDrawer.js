import React from "react";
import { useState } from "react";
import { Box, Tooltip, Button, Text, Input } from "@chakra-ui/react";
import {
    DrawerRoot,
    DrawerBody,
    DrawerOverlay,
    DrawerHeader,
    DrawerContent,
    DrawerBackdrop,
} from "@chakra-ui/react";
import {
    MenuRoot,
    MenuTrigger,
    MenuContent,
    MenuItem,
} from "@chakra-ui/react";
import { LuBell, LuChevronDown } from "react-icons/lu";
import { Avatar } from "@chakra-ui/react";
import { Separator } from "@chakra-ui/react";
import { ChatState } from "../../context/chatContext";
import ProfileModal from "./profileModal";
import { useHistory } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { toaster } from "../ui/toaster.jsx";
import ChatLoading from "../chatLoading";
import axios from "axios";
import { Spinner } from '@chakra-ui/react';
import UserListItem from "../userAvatar/UserListItem.js";

const SideDrawer = () => {
    const [search,setSearch]=useState("");
    const [searchResult,setSearchResult]=useState([]);
    const [loading,setLoading]=useState(false);
    const [loadingChat,setLoadingChat]=useState(false);
    const {user,selectedChat,setSelectedChat,chats,setChats}=ChatState();
    const {open, onOpen, onClose} = useDisclosure();
    const history=useHistory();

    const logoutHandler=()=>{
        localStorage.removeItem("userInfo");
        history.push("/");
    }

    const handleSearch=async()=>{
        if(!search){
            toaster.create({
                title: "Please enter something in search",
                type: "warning",
                duration: 5000,
                position: "top-left",
            });
            return;
        }

        const config={
            headers:{
                Authorization: `Bearer ${user.token}`,
            },
        };
        setLoading(true);
        try {
            const {data}=await axios.get(`/api/user?search=${search}`,config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toaster.create({
                title: "Error occurred while searching users",
                type: "error",
                duration: 5000,
                position: "top-left",
            });
        } 
    };

    const accessChat=async(userId)=>{
        try {
            setLoadingChat(true);
            const config={
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data}=await axios.post("/api/chat",{userId},config);
         
            if(!chats.find((c)=>c._id===data._id)) setChats([data,...chats]);
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toaster.create({
                title: "Error occurred while accessing chat",
                type: "error",
                duration: 5000,
                position: "top-left",
            });
        }
    }

    return (
        <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
        >
            <Tooltip content="Search Users to chat" placement="bottom-end">
                <Button variant="ghost" onClick={onOpen}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <Text display={{base:"none",md:"flex"}} px={4}>Search User</Text>
                </Button>
            </Tooltip>
            <Text fontSize="2xl" fontFamily="Work sans">
                Talk-A-Tive
            </Text>
            <div>
                <MenuRoot>
                    <MenuTrigger asChild>
                        <Button variant="ghost" p={1}>
                            <LuBell fontSize="2xl" m={1}/>
                        </Button>
                    </MenuTrigger>
                </MenuRoot>
                <MenuRoot>
                    <MenuTrigger asChild>
                        <Button variant="ghost">
                            <Avatar size="sm" cursor="pointer" name={user?.name} src={user?.pic}/>
                            <LuChevronDown/>
                        </Button>
                    </MenuTrigger>
                    <MenuContent>
                        <ProfileModal user={user}>
                            <MenuItem value="profile">My Profile</MenuItem>
                        </ProfileModal>
                        <Separator/>
                        <MenuItem value="logout" onClick={logoutHandler}>Logout</MenuItem>
                    </MenuContent>
                </MenuRoot>
                <DrawerRoot open={open} placement="start" onOpenChange={(e) => e.open ? onOpen() : onClose()}>
                    <DrawerBackdrop />
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                        <DrawerBody>
                            <Box display="flex" pb={2}>
                                <Input 
                                placeholder="Search by name or email" 
                                mr={2} value={search} 
                                onChange={(e)=>setSearch(e.target.value)}/>
                                <Button onClick={handleSearch}>Go</Button>
                            </Box>
                            {loading ? (
                                <ChatLoading/>
                            ) : (
                                searchResult?.map((user)=>(
                                    <UserListItem 
                                    key={user._id} 
                                    user={user}
                                    handleFunction={()=>accessChat(user._id)}/>
                                ))
                            )}
                            {loadingChat && <Spinner ml="auto" display="flex"/>}
                        </DrawerBody>
                    </DrawerContent>
                </DrawerRoot>
            </div>
        </Box>
    )
}
export default SideDrawer;