import React, { useState } from 'react';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import '../css/roomParent.css';
import generateRoom from './roomGeneration.js';
import RoomDetailPage from './RoomDetailPage.jsx';

const fetcher = (url) => fetch(url).then((res) => res.json());

const RoomParent = () => {
  const { roomCode } = useParams();
  const { data, error, mutate } = useSWR(`/api/room/all/${roomCode}`, fetcher);
  const [generatedRoomData, setGeneratedRoomData] = useState(null);4
  const [roomMain, setRoomMain] = useState([]);

  const handleDeletePlayer = async (name) => {
    try {
      const response = await fetch(`/api/player/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomCode, name }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete player');
      }

      // Revalidate the data
      await mutate();
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  if (error) return <div>Failed to load players</div>;
  if (!data) return <div>Loading...</div>;

  const players = data;

  const generationWrapper = () => {
    const generatedData = generateRoom(roomCode, players)
    setGeneratedRoomData(generatedData);
    setRoomMain(generatedData.roomMain); // Ensure roomMain is updated
  };

  return (
    <>
      <div className={'pageContainer'}>
        <div className={'playerContainer'}>
          <h1>Room Code: {roomCode}</h1>
          <h2>Players:</h2>
          <div className={'playerList'}>
            {players.map((player) => (
              <button onClick={() => handleDeletePlayer(player.name)} className={'playerButton'} key={player._id}>
                {player.name}
              </button>
            ))}
          </div>
        </div>

        <div className={'roomHandling'}>
          <div>
            <button onClick={generationWrapper} id="generateRoomButton">Generate Room</button>
          </div>
          <div className={'rooms'}>
            {generatedRoomData && (
              <div>
                <h2>Room Data</h2>
                <RoomDetailPage data={generatedRoomData} roomMain={roomMain} setRoomMain={setRoomMain} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomParent;
