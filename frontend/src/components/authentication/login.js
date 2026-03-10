import React from "react";
import { useState } from "react";
import {VStack,Field,Input,InputGroup,Button} from "@chakra-ui/react";
import { toaster } from "../ui/toaster.jsx"
import axios from "axios";
import {useHistory} from "react-router-dom";

const Login = () => {
    const [show,setShow]=useState(false);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const history=useHistory();
    
    const handleClick=()=>{
        setShow(!show);
    }

    const submitHandler=async()=>{
        setLoading(true);
        if(!email || !password){
            toaster.create({
                title:"Please Fill all the Fields",
                description:"",
                type:"error",
                position:"top-right",
            });
            setLoading(false);
            return;
        }
        try {
            const config={
                headers:{
                    "Content-Type":"application/json",
                }
            };
            const {data} = await axios.post("/api/user/login", {email, password}, config);
            console.log(data);
            toaster.create({
                title:"Login Successful",
                description:"",
                type:"success",
                position:"top-right",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");
        } catch (error) {
            toaster.create({
                title:"Login Failed",
                description:"An error occurred while logging in. Please try again.",
                type:"error",
                position:"top-right",
            });
            setLoading(false);
        }
    };

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
        
        <Button colorScheme='blue' width='100%' style={{marginTop:15}} onClick={submitHandler} loading={loading}>
            Log In
        </Button>

        <Button variant='solid' colorScheme='red' width='100%' onClick={()=>{setEmail("guest@example.com"); setPassword("guest123")}}>
            Get Guest User Credentials
        </Button>

    </VStack>   

};

export default Login;