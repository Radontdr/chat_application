import { Modal } from "@chakra-ui/react"
import { Toaster } from "../ui/toaster.jsx";
import { useDisclosure } from "@chakra-ui/react";
import {FormControl} from "@chakra-ui/react";
import { set } from "mongoose";
import { User } from "discord.js";
export const  GroupChatModel =({children})=>{
    const {isOpen,onOpen,onClose}=useDisclosure();
    const toaster=Toaster();
    const [groupChatName,setGroupChatName]=useState();
    const [selectedUsers,setSelectedUsers]=useState([]);
    const [search,setSearch]=useState("");
    const [searchResult,setSearchResult]=useState([]);
    const [loading,setLoading]=useState(false);
    const {user,chats,setChats}=ChatState();

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
    const handleSubmit=async()=>{
        if(!groupChatName || !selectedUsers){
            toaster({
                title:"Please fill all the fields",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom-left",
            });
            return;
        }
        try {
            const config={
                headers:{
                    Authorization: `Bearer ${user.token}`,
                }
            };
            const {data}=await axios.post("/api/chat/group",{
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map(u=>u._id)),
            },config);
            setChats([data,...chats]);
            onClose();
            toaster({
                title:"New Group Chat Created!",
                status:"success",
                duration:5000,
                isClosable:true,
                position:"bottom-left",
            });
        } catch (error) {
            toaster({
                title: "Error Occured",
                description:"Failed to Create the Group Chat",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom-left",
            });
        }
    }
    const handleGroup=(userToAdd)=>{
        if(selectedUsers.includes(userToAdd)){
            toaster({
                title:"User already added",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom-left",
            });
            return;
        }
        setSelectedUsers([...selectedUsers, userToAdd]);

    }
    const handleDelete=(userToDelete)=>{
        setSelectedUsers(selectedUsers.filter(u=>u._id!==userToDelete._id));
    }

    return (
        <>
        <span onClick={onOpen}>{children}</span>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center">
                Create Group Chat
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center" >
            <FormControl>
                <Input placeholder="Chat Name" mb={3} onChange={(e)=>setGroupChatName(e.target.value)}/>
            </FormControl>
            <FormControl>
                <Input placeholder="Add Users" mb={3} onChange={(e)=>handleSearch(e.target.value)}/>
            </FormControl>
            <Box>
                {selectedUsers.map(u=>(
                    <UserBadgeItem key={u._id} user={u} handleFunction={()=>handleDelete(u)}/>
                ))}
            </Box>
            {loading ? <div>Loading...</div> : (
                searchResult?.slice(0,4).map(user=>(
                    <UserListItem key={user._id} user={user} handleFunction={handleGroup(user)} />
                ))
            )}

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue'  onClick={handleSubmit}>
              Close
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
    )
}