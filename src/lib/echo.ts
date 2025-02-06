import Echo from "laravel-echo"

export const echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    wsHost: process.env.NEXT_PUBLIC_PUSHER_HOST,
    wsPort: process.env.NEXT_PUBLIC_PUSHER_PORT,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER
})