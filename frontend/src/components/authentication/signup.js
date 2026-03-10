import React from "react";
import { useState } from "react";
import {VStack,Field,Input,InputGroup,Button} from "@chakra-ui/react";

import { toaster } from "../ui/toaster.jsx"
import axios from "axios";
import {useHistory} from "react-router-dom";

const SignUp=()=>{
    const [show,setShow]=useState(false);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [pics,setPics]=useState("");
    const [loading,setLoading]=useState(false);
    const history=useHistory();
    const postDetails=(pics)=>{
        setLoading(true);
        if(pics===undefined){
            toaster.create({
                title:"Please Select an Image",
                description:"",
                type:"error",
                position:"top-right",
            });
            setLoading(false);
            return;
        }
        if(pics.type==="image/jpeg" || pics.type==="image/png"){
            const data=new FormData();
            data.append("file",pics);
            data.append("upload_preset","chat_application");
            data.append("cloud_name","dqtfwcz7p");
            fetch("https://api.cloudinary.com/v1_1/dqtfwcz7p/image/upload",{
                method:"post",
                body:data,
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data.secure_url.toString());
                setPics(data.secure_url.toString());
                setLoading(false);
            }).catch(err=>{
                console.log(err);
                setLoading(false);
            });
        }else{
            toaster.create({
                title:"Please Select an Image",
                description:"Only jpeg and png images are allowed",
                type:"error",
                position:"top-right",
            });
            setLoading(false);
        }
    }


    const handleClick=()=>{
        setShow(!show);
    }

   
    const submitHandler=()=>{
        setLoading(true);
            if(!name || !email || !password || !confirmPassword){
                toaster.create({
                    title:"Please Fill All Fields",
                    description:"",
                    type:"error",
                    position:"top-right",
                });
                setLoading(false);
                return;
            }
            if(password!==confirmPassword){
                toaster.create({
                    title:"Passwords Do Not Match",
                    description:"",
                    type:"error",
                    position:"top-right",
                });
            }
            try {
                const config={
                    headers:{
                        "Content-Type":"application/json", 
                    }
                }
                const {data}=axios.post("/api/user",{name,email,password,pics},config);
                console.log(data);
                toaster.create({
                    title:"Registration Successful",
                    description:"",
                    type:"success",
                    position:"top-right",
                });
                localStorage.setItem("userInfo",JSON.stringify(data));
                setLoading(false);
                history.push("/chats");
                
            } catch (error) {
                toaster.create({
                    title:"Registration Failed",
                    description:"An error occurred while registering. Please try again.",
                    type:"error",
                    position:"top-right",
                });
                setLoading(false);
            }
            
    };

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

        <Button colorScheme='blue' width='100%' style={{marginTop:15}} onClick={submitHandler} loading={loading}>
            Sign Up
        </Button>

    </VStack>
} 
export default SignUp;