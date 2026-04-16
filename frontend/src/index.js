import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider,defaultSystem } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import ChatProvider from './context/chatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChatProvider> 
    <BrowserRouter>
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
    </ChatProvider>

  
);

