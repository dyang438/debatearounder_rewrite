import { Routes, Route } from "react-router-dom";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import PersonalFormRoom from "./Form/PersonalFormRoom.jsx";
import RoomParent from "./Room/RoomParent.jsx";
import './css/app.css';

function Root() {
  const navigate = useNavigate();

  const createRoom = async () => {
    try {
      const response = await fetch('/api/room/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create room');
      }

      const data = await response.json();
      const roomCode = data.roomCode;

      navigate(`/room/${roomCode}`);
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Failed to create room');
    }
  };


  const goToForm = () => {
    navigate('/form');
  }


  return (
      <>
          <div id={'landingPage'}>
            <div>
              <h1> Welcome to DebateARounder! </h1>
            </div>
            <Button id={'roomButton'} onClick={createRoom}> Create a Room </Button>
            <Button id={'formButton'} onClick={goToForm}> Go to Form </Button>

            <Routes>
              <Route path="/room/:roomCode" element={<RoomParent />} />
              <Route path="/form" element={<PersonalFormRoom />} />
            </Routes>
          </div>
      </>

  )
}


export default Root;