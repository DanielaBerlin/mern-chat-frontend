import React, { useContext, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';

function Sidebar() {
  const user = useSelector((state) => state.user);
  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);


  function joinRoom(room, isPublic = true) {
    if(!user) {
      return alert ('Please login');
    }
    socket.emit("join-room", room);
    setCurrentRoom(room);

    if(isPublic){
      setPrivateMemberMsg(null)
    }
    //dispatch for notifications
  }

  useEffect(() => {
    if (user) {
      setCurrentRoom('Berlin');
      getRooms();
      socket.emit('join-room', 'Berlin');
      socket.emit('new-user');
    }
  }, []);

  socket.off('new-user').on('new-user', (payload) => {
    setMembers(payload);
  });

  function getRooms() {
    fetch('http://localhost:5001/rooms')
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }

  function handlePrivateMemberMsg(member){
    setPrivateMemberMsg(member);

  }

  if (!user) {
    return <></>;
  }

  return (
    <>
      <h2>Available rooms 💬</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroup.Item key={idx} onClick={()=> joinRoom(room)} active={room == currentRoom} style={{cursor: 'pointer', display: 'flex', justifyContent:'space-between'}}>
            {room} {currentRoom !== room && <span></span>}</ListGroup.Item>
        ))}
      </ListGroup>
      <h2>🧞‍♀️ Members 🧚🏽</h2>
      <ListGroup>
      {members.map((member) => (
        <ListGroup.Item key={member.id} style={{ cursor: 'pointer' }} active={privateMemberMsg?._id == member?._id} onClick={() => handlePrivateMemberMsg(member)} disabled={member._id === user._id}>
          {member.name}
        </ListGroup.Item>
      ))}
      </ListGroup>
    </>
  );
}

export default Sidebar;
