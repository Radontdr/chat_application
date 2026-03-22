import { Avatar, Box } from "@chakra-ui/react";
import react from "react";

const UserListItem = ({user,handleFunction}) => {
    
    return(
    <>
        <Box
            display="flex"
            bg="#E8E8E8"
            _hover={{background:"#38B2AC",color:"white",cursor:"pointer"}}
            onClick={handleFunction}
            w="100%"
            alignItems="center"
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
        >
            <Avatar
            mr={2}
            size="sm"
            cursor="pointer"
            name={user.name}
            src={user.pic}
            />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize="xs">
                    <b>Email : </b>
                    {user.email}
                </Text>
            </Box>
        </Box>
    </>
    )
}
export default UserListItem;