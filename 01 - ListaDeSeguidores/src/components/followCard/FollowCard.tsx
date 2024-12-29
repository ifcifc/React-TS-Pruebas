import { useState } from 'react';
import './FollowCard.css'
import { IChildren } from '../../common/IChildren';

const AVATAR_BASE_URL = 'avatars';
const DEFAULT_AVATAR = `${AVATAR_BASE_URL}/default.png`;

interface FollowCardProps{
    name: string, //Nombre completo del usuario
    userName: string,//Nick del usuario
    isFollowing?: boolean//Indica si el usuario está siguiendo a otro usuario
}

//Este componente sirve para mostrar un usuario y permitir seguirlo o dejar de seguirlo
export default function FollowCard({name, userName, isFollowing:_isFollowing=false}: FollowCardProps): JSX.Element {
    //Obtengo la url de la imagen del avatar
    const imgSrc = `${AVATAR_BASE_URL}/${userName}.png`
    //Estado para saber si el usuario está siguiendo a otro usuario
    const [isFollowing, setIsFollowing] = useState(_isFollowing);
    return (
        <article className="fc-card">
            <header className="fc-header">
                <img className="fc-img" src={imgSrc} alt="Avatar de usuario" onError={e => { e.currentTarget.src = DEFAULT_AVATAR }}/>
                <div className="fc-section">
                    <strong><a className='fc-section-user' onClick={()=>alert("Aqui deberia de redirigir la pagina a una pagina de usuario publica")}>{name}</a></strong>
                    <span>@{userName}</span>
                </div>
            </header>
            <aside className="fc-aside">
                <button className='fc-btn' onClick={()=>setIsFollowing(!isFollowing)} data-isfollowing={(isFollowing ?? false)}>{isFollowing ? 'Siguiendo' : 'Seguir'}</button>
            </aside>
        </article>
    )
}
