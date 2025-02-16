import { create } from 'zustand';

interface WebSocketStore {
    socket: WebSocket | null;
    isConnected: boolean;
    connect: (url: string) => void;
    disconnect: () => void;
    reconnect: (url: string) => void; // Optional reconnect
}

const useWebSocketStore = create<WebSocketStore>((set, get) => ({
    socket: null,
    isConnected: false,

    connect: (url: string) => {
        const socket = new WebSocket(url);
        
        socket.onopen = () => {
            console.log('WebSocket connection established');
            set({ socket, isConnected: true }); // Store socket and set connected state
        };

        socket.onmessage = (event) => {
            console.log('Message from server:', event.data);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
            set({ socket: null, isConnected: false }); // Reset state when closed
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            set({ isConnected: false });
        };
    },

    disconnect: () => {
        const { socket } = get();
        if (socket) {
            socket.close();
            set({ socket: null, isConnected: false });
        }
    },

    reconnect: (url: string) => {
        const { isConnected } = get();
        if (!isConnected) {
            console.log('Attempting to reconnect...');
            get().connect(url); // Reconnect if not already connected
        }
    },
}));

export default useWebSocketStore;
