import React from 'react';
import { useDisclosure } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { LuEye } from "react-icons/lu";
import {
    DialogRoot,
    DialogContent,
    DialogHeader,
    DialogCloseTrigger,
    DialogBody,
    DialogFooter,
    DialogTitle,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Button, Text } from "@chakra-ui/react";

const ProfileModal = ({user,children}) => {
    const {open, onOpen, onClose} = useDisclosure();
    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton display={{base:"flex"}} onClick={onOpen}>
                    <LuEye />
                </IconButton>
            )}
            <DialogRoot size="lg" open={open} onOpenChange={(e) => e.open ? onOpen() : onClose()} placement="center">
                <DialogContent>
                    <DialogHeader
                    fontSize="40px"
                    fontFamily="Work sans"
                    display="flex"
                    justifyContent="center"
                    >
                        <DialogTitle>{user.name}</DialogTitle>
                    </DialogHeader>
                    <DialogCloseTrigger />
                    <DialogBody
                    display="flex"                    
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="space-between"
                    >
                       <Image
                       borderRadius="full"
                       boxSize="150px"
                        src={user.pic}
                        alt={user.name}
                        />
                        <Text fontSize={{base:"28px",md:"30px"}} fontFamily="Work sans" >
                            Email: {user.email}
                        </Text>
                    </DialogBody>

                    <DialogFooter>
                        <Button colorPalette='blue' mr={3} onClick={onClose}>
                        Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>
        </>
    )
}
export default ProfileModal;