import {ReactDOM, StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, useNavigate} from "react-router-dom";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react"
import {ApolloProvider} from "@apollo/client";
import React from 'react';
import {MantineProvider} from "@mantine/core";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}

const RouterComponent = () => {
    const navigate = useNavigate()

    return(
        <ClerkProvider
            publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
            navigate={(to) => navigate(to)}
        >

        </ClerkProvider>
    )
}

let client;
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <MantineProvider>
        <BrowserRouter>
          <RouterComponent />
        </BrowserRouter>
      </MantineProvider>
    </ApolloProvider>
  </React.StrictMode>
)

export default RouterComponent;