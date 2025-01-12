import { useRef } from 'react';
import { IContext } from '../context/Context';
import './Settings.css';
import MovieService from '../../services/MovieService';

interface ISettingsProp{
    setData: (ctx:IContext)=>void
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
            })
            .catch(()=>{
                alert('Ha habido un problema al validar el apikey');
            });
    };

    return (
        <main className='sgs-container'>
            <h1>Configuracion</h1>
            <label>
                Omdbapi Apikey  <small>87a0a105</small>
                <input ref={apikeyInput} className='sgs-input' type='text' placeholder='Apikey'/>
            </label>
            <button onClick={handleClick}>Aceptar</button>
        </main>
    )
}