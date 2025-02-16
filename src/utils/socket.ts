import { io } from 'socket.io-client';

const socket = io('http://localhost:6001', {
  transports: ['websocket'], // Use WebSocket transport only
});

export default socket;