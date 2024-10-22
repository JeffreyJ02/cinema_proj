'use client'

import { userProvider } from "../context/UserContext"

export default function ClientWrapper({ children }) {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}