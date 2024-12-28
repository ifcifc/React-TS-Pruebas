import { useState } from 'react';
import './FollowCard.css'

interface FollowCardProps {
    name: string,
    userName: string,
    isFollowing?: boolean
}

export default function FollowCard(props: FollowCardProps): JSX.Element {
    const imgSrc = `avatars/${props.userName}.png`
    const [isFollowing, setIsFollowing] = useState(props.isFollowing??false);
    
    return (
        <article className="fc-card">
            <header className="fc-header">
                <img className="fc-img" src={imgSrc} alt="Avatar de usuario" onError={(e) => { e.currentTarget.src = 'avatars/default.png' }}/>
                <div className="fc-section">
                    <strong>{props.name}</strong>
                    <span>@{props.userName}</span>
                </div>
            </header>
            <aside className="fc-aside">
                <button className='fc-btn' onClick={()=>setIsFollowing(!isFollowing)} data-isfollowing={(isFollowing ?? false)}>{isFollowing ? 'Siguiendo' : 'Seguir'}</button>
            </aside>
        </article>
    )
};
