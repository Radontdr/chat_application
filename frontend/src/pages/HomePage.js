import React from "react";
import {Container,Box,Text
    ,Tabs
} from "@chakra-ui/react";
import Login from "../components/authentication/login";
import SignUp from "../components/authentication/signup";
import { useHistory } from "react-router-dom";
const HomePage=()=>{
    const user=JSON.parse(localStorage.getItem('userInfo'));
    const history=useHistory(); 
    if(user){
        history.push('/chats');
    }
    return <Container maxW='xl' centerContent>
        <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        p={3}
        bg='white'
        w='100%'
        m='40px 0 15px 0'
        borderRadius='lg'
        borderWidth='1px'
        >
            <Text fontSize='4xl' fontFamily='Work Sans' color='black'>Talksy</Text>
        </Box>
        <Box bg='white' w='100%' p={4}  borderRadius='lg' borderWidth='1px'>
            <Tabs.Root variant="enclosed" maxW="md" fitted defaultValue="Login">
                <Tabs.List mb="1em">
                    <Tabs.Trigger value="Login">LogIn</Tabs.Trigger>
                    <Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="Login">
                    <Login />
                </Tabs.Content>

                <Tabs.Content value="signup">
                    <SignUp />
                </Tabs.Content>
            </Tabs.Root>
        </Box>
    </Container>
}
export default HomePage;