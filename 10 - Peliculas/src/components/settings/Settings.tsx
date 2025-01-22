import { useEffect, useRef } from 'react';
import { IContextData } from '../settingsContext/SettingsContext';
import './Settings.css';
import MovieService from '../../services/MovieService';

interface ISettingsProp{
    setData: (ctx:IContextData)=>void
}
//87a0a105
export function Settings({setData}:ISettingsProp) {
    const apikeyInput = useRef<HTMLInputElement>(null);
    const handleClick = ()=>{
        const apiKey = apikeyInput.current?.value??undefined;
        if(!apiKey)return;
        MovieService
            .new(apiKey)
            .isValidApiKey()
            .then(result=>{
                if(!result){
                    alert('Apikey invalido');
                    return;
                }
                setData({
                    apiKey:apiKey
                });
                localStorage.setItem('ApiKey', apiKey);
            })
            .catch(()=>{
                alert('Ha habido un problema al validar el apikey');
            });
    };

    useEffect(()=>{
        if(!apikeyInput.current)return;
        apikeyInput.current.value = localStorage.getItem('ApiKey')??'';
    },[]);

    return (
        <main className='sgs-container'>
            <h1>Configuracion</h1>
            <label>
                Omdbapi Apikey
                <input ref={apikeyInput} className='sgs-input' type='text' placeholder='Apikey'/>
            </label>
            <button onClick={handleClick}>Aceptar</button>
        </main>
    )
}