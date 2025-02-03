import { Geist, Geist_Mono, Titan_One } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./context/userContext";

export const metadata = {
  title: "Enigma",
  description : "A simple app to encrypt and decrypt messages"
}

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </UserProvider>
  );
}
