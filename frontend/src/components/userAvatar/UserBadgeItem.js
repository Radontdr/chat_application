import {Box} from "@chakra-ui/react"
export const UserBadgeItem=({user, handleFunction})=>{
    return 
    <Box
    px={2}
    py={1}
    borderRadius="lg"
    m={1}
    mb={2}
    variant="solid"
    fontSize={12}
    backgroundColor="purple"
    color="white"
    display="flex"
    cursor="pointer"
    onClick={handleFunction}
    >
        {user.name}
        <CloseIcon pl={1}/>
    </Box>
}