import React from 'react';
import '../css/roomDetailPage.css';

const RoomDisplay = ({ data, roomMain, setRoomMain }) => {
  const { eight_person_rooms, four_person_rooms } = data;

  let two_to_switch = [];

  // Function to create rooms
  const createRooms = (people, roomSize) => {
    const rooms = [];
    for (let i = 0; i < people.length; i += roomSize) {
      rooms.push(people.slice(i, i + roomSize));
    }
    return rooms;
  };

  // Function to get partnership label
  const getPartnershipLabel = (index) => {
    const pairIndex = Math.floor(index / 2);
    const labels = ['OG', 'CG', 'OO', 'CO'];
    return labels[pairIndex % 4];
  };

  const pairPeople = (room) => {
    const pairs = [];
    for (let i = 0; i < room.length; i += 2) {
      pairs.push(room.slice(i, i + 2));
    }
    return pairs;
  };

  // Divide people into eight-person rooms
  const eightPersonRooms = createRooms(roomMain.slice(0, eight_person_rooms * 8), 8);

  // Next, take four-person rooms
  const startIndexForFourPersonRooms = eight_person_rooms * 8;
  const fourPersonRooms = createRooms(roomMain.slice(startIndexForFourPersonRooms, startIndexForFourPersonRooms + four_person_rooms * 4), 4);

  // Remaining people are judges
  const judges = roomMain.slice(startIndexForFourPersonRooms + four_person_rooms * 4);

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  };

  const switchLogic = (person) => {
    const i = roomMain.indexOf(person);
    if (two_to_switch.length === 0) {
      two_to_switch.push(i);
    } else {
      if (two_to_switch[0] === i) {
        two_to_switch = [];
        return;
      }
      const newRoomMain = [...roomMain];
      let temp = newRoomMain[two_to_switch[0]];
      newRoomMain[two_to_switch[0]] = newRoomMain[i];
      newRoomMain[i] = temp;
      two_to_switch = [];
      setRoomMain(newRoomMain);
    }
  };

  return (
    <div>
      {(eight_person_rooms !== 0) && <h2>Eight-Person Rooms</h2>}
      {eightPersonRooms.map((room, roomIndex) => (
        <div key={roomIndex} className="eight-person-room">
          <h3>Room {roomIndex + 1}</h3>
          {pairPeople(room).map((pair, pairIndex) => (
            <div key={pairIndex} className="pair">
              {pair.map((person, index) => (
                <button onClick={() => switchLogic(person)} key={person._id} className="person-button">
                  {getPartnershipLabel(pairIndex * 2 + index)}: {toTitleCase(person.name)}
                </button>
              ))}
            </div>
          ))}
        </div>
      ))}

      {(four_person_rooms !== 0) && <h2>Four-Person Rooms</h2>}
      {fourPersonRooms.map((room, roomIndex) => (
        <div key={roomIndex} className="four-person-room">
          <h3>Room {roomIndex + 1}</h3>
          {pairPeople(room).map((pair, pairIndex) => (
            <div key={pairIndex} className="pair">
              {pair.map((person, index) => (
                <button onClick={() => switchLogic(person)} key={person._id} className="person-button">
                  {getPartnershipLabel(pairIndex * 2 + index)}: {toTitleCase(person.name)}
                </button>
              ))}
            </div>
          ))}
        </div>
      ))}

      <h2>Judges</h2>
      <div className="judges">
        {judges.map(person => (
          <button onClick={() => switchLogic(person)} key={person._id} className="person-button">{toTitleCase(person.name)}</button>
        ))}
      </div>
    </div>
  );
};

export default RoomDisplay;
