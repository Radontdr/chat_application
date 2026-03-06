import React from "react";
import { useState } from "react";
import {VStack,Field,Input,InputGroup,InputElement,Button} from "@chakra-ui/react";

const SignUp=()=>{
    const [show,setShow]=useState(false);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [pic,setPic]=useState("");

    const handleClick=()=>{
        setShow(!show);
    }

    const postDetails=(pics)=>{};
    const submitHandler=()=>{};

    return <VStack spacing='5px'>
        <Field.Root id='first-name' required>
            <Field.Label>Name</Field.Label>
            <Input 
            type='text' placeholder='Enter Your Name' 
            value={name} onChange={(e)=>setName(e.target.value)}/>  
        </Field.Root>


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

        <Field.Root id='confirm-password' required>
            <Field.Label>Confirm Password</Field.Label>
            <InputGroup
                endElement={
                <Button size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                </Button>
                }
            >
                <Input
                    type={show ? "text" : "password"}
                    placeholder="Confirm Your Password"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                />
            </InputGroup>           
        </Field.Root>

        <Field.Root id='pic'>
            <Field.Label>Upload Your Picture</Field.Label>
            <Input 
            type='file' accept='image/*' 
            onChange={(e)=>postDetails(e.target.files[0])}/>  
        </Field.Root>

        <Button colorScheme='blue' width='100%' style={{marginTop:15}} onClick={submitHandler}>
            Sign Up
        </Button>

    </VStack>
} 
export default SignUp;