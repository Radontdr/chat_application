import react from "react";
import { Skeleton, Stack } from "@chakra-ui/react";
const ChatLoading = () => {
    return (
        <Stack>
            <Skeleton height="40px" width="100%"/>
            <Skeleton height="40px" width="100%"/>
            <Skeleton height="40px" width="100%"/>
            <Skeleton height="40px" width="100%"/>
            <Skeleton height="40px" width="100%"/>
            <Skeleton height="40px" width="100%"/>
            <Skeleton height="40px" width="100%"/>
        </Stack>
    )
}
export default ChatLoading;