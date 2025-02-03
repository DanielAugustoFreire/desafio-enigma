'use client'
import { useContext, useEffect, useState } from "react";
import InputChave from "./components/inputChave";
import InputTextoCriptografado from "./components/inputTextoCript";
import UserContext from "./context/userContext";
import LoadingSpinner from "./components/LoadingSpinner";

export default function Home() {
  let { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/")
      .then((res) => {
        let UserHeader = res.headers.get("x-authenticated-user");
        if (UserHeader) {
          UserHeader = JSON.parse(UserHeader);
          setUser(UserHeader);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <header className="bg-neutral-900 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Enigma</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">{user.nome}</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputChave />
        <InputTextoCriptografado />
      </main>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2025 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
}
