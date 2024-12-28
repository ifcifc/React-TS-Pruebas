import { useState } from 'react';
import './FollowCard.css'

interface FollowCardProps {
    name: string,
    userName: string,
    isFollowing?: boolean
}

const AVATAR_BASE_URL = 'avatars';
const DEFAULT_AVATAR = `${AVATAR_BASE_URL}/default.png`;

export default function FollowCard({name, userName, isFollowing:_isFollowing=false}: FollowCardProps): JSX.Element {
    const imgSrc = `${AVATAR_BASE_URL}/${userName}.png`
    const [isFollowing, setIsFollowing] = useState(_isFollowing);
    return (
        <article className="fc-card">
            <header className="fc-header">
                <img className="fc-img" src={imgSrc} alt="Avatar de usuario" onError={e => { e.currentTarget.src = DEFAULT_AVATAR }}/>
                <div className="fc-section">
                    <strong>{name}</strong>
                    <span>@{userName}</span>
                </div>
            </header>
            <aside className="fc-aside">
                <button className='fc-btn' onClick={()=>setIsFollowing(!isFollowing)} data-isfollowing={(isFollowing ?? false)}>{isFollowing ? 'Siguiendo' : 'Seguir'}</button>
            </aside>
        </article>
    )
};
