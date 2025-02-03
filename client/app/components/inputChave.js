import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import httpClient from "../utils/httpclient";

export default function InputChave(){

    const [chave, setChave] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        httpClient.get('/current-key')
        .then(response => response.json())
        .then(data => {
          if(data.sucess){
            setChave(data.key)
            setLoading(false)
          }else{
            setChave('nula')
          }
        })
    }, [])

    if(loading){
      return (
        <aside className="bg-stone-200 p-4 rounded shadow md:col-span-1 flex items-center justify-center">
            <LoadingSpinner className="items-center" />
        </aside>
      )
    }

    return (
      <aside className="bg-stone-200 p-4 rounded shadow md:col-span-1 items-center">
        <ul className="space-y-2">
          <label className="text-black">Chave Atual: <label className="text-amber-400 bg-stone-800 rounded p-1">{chave}</label></label>
          <input type="text" placeholder={chave} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </ul>
      </aside>
    )
}