import React from "react";
import { ChatState } from "../context/chatContext";
import {useState} from "react";
import { ViewIcon } from "@chakra-ui/icons";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import {FormControl} from "@chakra-ui/react"
import { Toaster } from "../ui/Toaster";
import {UserListItem} from "../userAvatar/UserListItem";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter} from "@chakra-ui/react";
import { set } from "mongoose";
export const UpdateGroupChatModel = ({fetchAgain, setFetchAgain}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {selectedChat,selectedChat,user}=ChatState();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameloading, setRenameLoading] = useState(false);
    const toaster=Toaster();

    const handleAddUser=async(userToAdd)=>{
        if(selectedChat.users.find((u)=>u._id===userToAdd._id)){
            toaster({
                title:"User already in group",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
            return;
        }
        if(selectedChat.groupAdmin._id!==user._id){
            toaster({
                title:"Only admins can add someone",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
            return;
        }
        try {
            setLoading(true);
            const config={
                headers:{
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data}=await axios.put("/api/chat/groupadd",{
                chatId:selectedChat._id,
                userId:userToAdd._id,
            },config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toaster({
                title:"Error Occured",
                description:error.response.data.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
            setLoading(false);
        }
    }
    const handleRemove =async(userToRemove)=>{
        if(selectedChat.groupAdmin._id!==user._id){
            toaster({
                title:"Only admins can remove someone",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
            return;
        }
        try {
            setLoading(true);
            const config={
                headers:{
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data}=await axios.put("/api/chat/groupremove",{
                chatId:selectedChat._id,
                userId:userToRemove._id,
            },config);
            userToRemove._id===user._id?setSelectedChat():setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toaster({
                title:"Error Occured",
                description:error.response.data.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
        }
    };
    const handleRename=async()=>{
            if(!groupChatName) return;
            try {
                const config={
                    headers:{
                        Authorization: `Bearer ${user.token}`
                    },
                };                setRenameLoading(true);
                const {data}=await axios.put("/api/chat/rename",{
                    chatId:selectedChat._id,
                    chatName:groupChatName,
                },config);
                setSelectedChat(data);
                setFetchAgain(!fetchAgain);
                setRenameLoading(false);
            } catch (error) {
                toaster({
                    title:"Error Occured",
                    description:error.response.data.message,
                    status:"error",
                    duration:5000,
                    isClosable:true,
                    position:"bottom",
                });
                setRenameLoading(false);
            }
            setGroupChatName("");
    };
    const handleSearch=async(query)=>{
        setSearch(query);
        if(!query){
            return;
        }
        try {
            setLoading(true);
            const config={
                headers:{
                    Authorization: `Bearer ${user.token}`,
                },
            }

            const {data}=await axios.get(`/api/user?search=${search}`,config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toaster({
                title: "Error Occured",
                description:"Failed to Load the Search Results",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom-left",
            });
        }
    }

    return (
     <>
      <IconButton
        display={{base:"flex"}}
        icon={<ViewIcon/>}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChat?.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
            {selectedChat.users.map((u) => (
                <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={() => handleRemove(u)}/>
            ))}
           </Box>
           <FormControl>
                <Input
                    placeholder="Chat Name"
                    mb={3}
                    value={groupChatName}
                    onChange={(e) => setGroupChatName(e.target.value)}
                />
                <Button
                    variant="solid"
                    colorScheme="teal"
                    ml={1}
                    isLoading={renameloading}
                    onClick={handleRename}
                >
                    Update
                </Button>
           </FormControl>
           <FormControl>
                <Input
                    placeholder="Add User to group"
                    mb={1}
                    onChange={(e) => handleSearch(e.target.value)}
                />
           </FormControl>
           {loading ? 
           (<Spinner size="lg"/>) : (
            searchResult.map((user) => (
                <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleAddUser(user)}
                />
            )))}

          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={() => handleRemove(user)}>
              Leave Group
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    )}