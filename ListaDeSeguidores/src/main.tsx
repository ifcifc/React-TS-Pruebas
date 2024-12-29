import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FollowCard from './components/followCard/FollowCard'
import UserList from './components/userList/UserList'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserList>
      <FollowCard name="John Doe" userName="jose" isFollowing/>
      <FollowCard name="Antonio Algo" userName="antonio" isFollowing />
      <FollowCard name="Julieta Alguien" userName="julieta"/>
      <FollowCard name="Maria Roth" userName="maria" isFollowing/>
    </UserList>
  </StrictMode>,
)
