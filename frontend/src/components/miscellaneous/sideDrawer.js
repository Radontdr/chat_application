import React from "react";
import { useState } from "react";
import { Box,Tooltip,Button,Text, Drawer, DrawerBody,Input} from "@chakra-ui/react";
import { Menu,MenuButton,Divider,MenuList,MenuItem} from "@chakra-ui/react";
import { Drawer,DrawerOverlay,DrawerHeader,DrawerContent } from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/react";
import { ChatState } from "../../context/chatContext";
import ProfileModal from "./profileModal";
import { useHistory } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";
import { Toaster } from "@chakra-ui/react";
import {ChatLoading} from "../chatLoading";
import axios from "axios";
import {Spinner} from 'chakra-ui/spinner';


import { set } from "mongoose";
const SideDrawer = () => {
    const [search,setSearch]=useState("");
    const [searchResult,setSearchResult]=useState([]);
    const [loading,setLoading]=useState(false);
    const [loadingChat,setLoadingChat]=useState(false);
    const {user,selectedChat,setSelectedChat,chats,setChats}=ChatState();
    const toaster = Toaster();
    const {isOpen,onOpen,onClose}=useDisclosure();
    const history=useHistory();
    const logoutHandler=()=>{
        localStorage.removeItem("userInfo");
        history.push("/");
    }

    const handleSearch=async()=>{
        if(!search){
            toaster({
                title: "Please enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
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
            toaster({
                title: "Error occurred while searching users",
                status: "error",
                duration: 5000,
                isClosable: true,
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
            onClose(); // close the drawer after accessing the chat
        } catch (error) {
            toaster({
                title: "Error occurred while accessing chat",
                status: "error",
                duration: 5000,
                isClosable: true,
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
            <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
                <Button variant="ghost" onClick={onOpen}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <Text display={{base:"none",md:"flex"}} px={4}>Search User</Text>
                </Button>
            </Tooltip>
            <Text fontSize="2xl" fontFamily="Work sans">
                Talk-A-Tive
            </Text>
            <div>
                <Menu>
                    <MenuButton p={1}>
                        <BellIcon fontSize="2xl" m={1}/>
                    </MenuButton>
                </Menu>
                {/*<MenuList></MenuList>*/}
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                        <Avatar size="sm" cursor="pointer" name={user?.name} src={user?.pic}/>
                    </MenuButton>
                    <MenuList>
                        <ProfileModal user={user}>
                            <MenuItem>My Profile</MenuItem>
                        </ProfileModal>
                        <Divider/>
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                </Menu>
                <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                        <DrawerBody>
                            <Box display="flex" pb={2}>
                                <Input 
                                placeholder="Search by name or email" 
                                mr={2} value={search} 
                                onChange={(e)=>setSearch(e.target.value)}/>
                                <Button onClick={handleSearch} >Go</Button>
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
                            {loadingChat  && <Spinner ml="auto" display="flex"/>}
                        </DrawerBody>
                    </DrawerContent>
                    
                </Drawer>
            </div>
        </Box>
    )
}
export default SideDrawer;