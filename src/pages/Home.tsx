import {useHistory} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'

import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import googleIconImg from '../assets/google-icon.svg'

import { Button } from '../components/Button'

import '../styles/auth.scss'

export function Home(){
  const { user, signInWithGoogle } = useAuth();
  const history = useHistory();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom(){

    if(!user){
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault();

    if(roomCode.trim() === ''){
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()){
      alert('Room doesnt exists');
      return;
    }

    if(roomRef.val().endedAt){
      alert('Room already closed')
      return;
    }

    history.push(`/rooms/${roomCode}`)
  }

  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A para sua aula</strong>
        <p>Tire as dúvidas dos seus alunos de uma forma mais simples</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder="Digite o código da sala"
              value={roomCode}
              onChange={event => setRoomCode(event.target.value)}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}