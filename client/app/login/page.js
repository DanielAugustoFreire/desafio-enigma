'use client'
import { useRef } from "react"
import httpClient from "../utils/httpclient"
import { useRouter } from "next/navigation"


export default function Login(){

    let emailRef = useRef();
    let senhaRef = useRef();

    const router = useRouter();

    function login(){
        if(!(emailRef.current.value === "" && senhaRef.current.value === "")){
            let data = {
                email: emailRef.current.value,
                senha: senhaRef.current.value
            }
            httpClient.post("/auth", data)
            .then(res => {
                if(res.status === 200){
                    return res.json();
                }else{
                    return false;
                }
            })
            .then(data => {
                if(data){
                    router.push("/");
                }
            })
        }
    }

    return(

    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 rounded-lg shadow-lg dark:bg-gray-900 bor">
        <h1 className="mb-3 text-3xl font-semibold text-gray-900 dark:text-white">Login</h1>
        <div className="max-w-sm mx-auto w-full space-y-5">
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input ref={emailRef} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="fulano@hotmail.comm" required />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input ref={senhaRef} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="flex items-start mb-5">
                <a htmlFor="remember" type="" className="underline text-sm font-medium text-blue-900 dark:text-blue-300">Cadastre-se!</a>
            </div>
            <button onClick={() => login()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
    </div>
    )
}