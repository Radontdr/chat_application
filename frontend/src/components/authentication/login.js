import React from "react";
import { useState } from "react";
import {VStack,Field,Input,InputGroup,InputElement,Button} from "@chakra-ui/react";
const Login = () => {
    const [show,setShow]=useState(false);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    
    const handleClick=()=>{
        setShow(!show);
    }

    const submitHandler=()=>{};

    return <VStack spacing='5px'>
        <Field.Root id='email' required>
            <Field.Label>Email</Field.Label>
            <Input 
            type='email' placeholder='Enter Your Email Address' 
            value={email} onChange={(e)=>setEmail(e.target.value)}/>  
        </Field.Root>
        <Field.Root id='password' required>
            <Field.Label>Password</Field.Label>
            <InputGroup
                endElement={
                <Button size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                </Button>
                }
            >
                <Input
                    type={show ? "text" : "password"}
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </InputGroup>           
        </Field.Root>
        
        <Button colorScheme='blue' width='100%' style={{marginTop:15}} onClick={submitHandler}>
            Log In
        </Button>

        <Button variant='solid' colorScheme='red' width='100%' onClick={()=>{setEmail("guest@example.com"); setPassword("guest123")}}>
            Get Guest User Credentials
        </Button>

    </VStack>   

};

export default Login;