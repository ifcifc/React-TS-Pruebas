import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FollowCard from './components/FollowCard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FollowCard name="John Doe" userName="jose" isFollowing />
    <FollowCard name="Antonio Algo" userName="antonio" isFollowing />
    <FollowCard name="Julieta Alguien" userName="julieta"/>
    <FollowCard name="Maria Roth" userName="maria" isFollowing/>
  </StrictMode>,
)
