// "use client"
// import { useEffect, useState } from 'react';
// import { VideoProvider, Room } from '@videosdk.live/react-sdk';

// const MyVideoComponent = () => {
//   const [token, setToken] = useState('');

//   // Fetch the JWT token from your backend when the component mounts
//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/api/v1/admin/get-token');
//         const data = await response.json();
//         setToken(data.token);
//       } catch (error) {
//         console.error('Error fetching token:', error);
//       }
//     };

//     fetchToken();
//   }, []);

//   return (
//     <VideoProvider>
//       <Room
//         roomConfig={{
//           name: 'MyVideoRoom',
//           // Other configuration options
//         }}
//         onRoomJoined={(room) => {
//           console.log(`Joined room: ${room.name}`);
//         }}
//         jwtToken={token} // Pass the JWT token to the Video SDK
//       />
//     </VideoProvider>
//   );
// };

// export default MyVideoComponent;
