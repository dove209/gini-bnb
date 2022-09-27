import React from 'react'
import { useRooms } from '../../../hooks/reactQuery/useRooms';
import { GetRoomListAPIQueries } from '../../../types/room';

interface IProps {
  queries: GetRoomListAPIQueries
}


const RoomMain:React.FC<IProps> = ({ queries }) => {
  const { data, isSuccess } = useRooms(queries);

  console.log(isSuccess)

  // if (isSuccess) {
  //   return (
  //     <div>RoomMain</div>
  //   )
  // }
  return <div>로딩중.........</div>
}

export default RoomMain