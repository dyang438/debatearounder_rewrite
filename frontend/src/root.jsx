import { Routes, Route } from "react-router-dom";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import PersonalFormRoom from "./Form/PersonalFormRoom.jsx";
import RoomParent from "./Room/RoomParent.jsx";
import './css/app.css';
// function Root() {
//   const { signedIn } = useAuth();
//   const navigate = useNavigate();
//
//   const returnHome = () => {
//     navigate('/');
//   }
//
//   const postCreation = () => {
//     navigate('/addPost');
//   }
//
//   const signup = () => {
//     navigate('/signup');
//   }
//
//
//   return (
//     <>
//       <nav>
//         <Button onClick={returnHome} style={
//           {position: 'fixed',
//           top: '10px',
//           left: '10px',
//           fontSize: '20px',
//           backgroundColor: 'green',}
//         } variant="contained"> Home </Button>
//
//         {signedIn && <Button variant="contained" onClick={postCreation} style={{
//           position: 'fixed',
//           top: '10px',
//           right: '10px',
//           backgroundColor: 'green',
//           fontSize: '20px',
//         }}> Create Post</Button>}
//         {!signedIn && <Button variant="contained" onClick={signup} style={
//           {
//             position: 'fixed',
//             top: '10px',
//             right: '10px',
//             fontSize: '20px',
//             backgroundColor: 'green',
//           }
//         }> Create an Account to Post </Button>}
//         < LogoutButton />
//       </nav>
//
//       <Routes>
//         <Route path="/" element={<PostListPage />} />
//         <Route path="/post/:postId" element={<PostDetailPage />} />
//         <Route path="/addPost" element={<NewPostPage />} />
//       </Routes>
//     </>
//   );
// }

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
              <h1> Welcome to DebateArounder! </h1>
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