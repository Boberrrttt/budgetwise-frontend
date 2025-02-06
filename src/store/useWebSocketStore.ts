import Pusher from 'pusher-js'
import { create } from 'zustand';

interface WebSocketTypes {
    data: Record<string, any>;
    subscribe: (channelName: string, eventName: string) => void;
    unsubscribe: (channelName: string, eventName: string) => void;
}

const useWebSocketStore = create<WebSocketTypes>(( set, get) => {

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        wsHost: '127.0.0.1',
        wsPort: 6001,
        forceTLS: false,
        disableStats: true,
    })

    return {
        data: {},
        subscribe: (channelName: string, eventName: string) => {
            const channel = pusher.subscribe(channelName)

            channel.bind(eventName, (newData: any) => {
                set((state) => ({
                    data: {
                        ...state.data,
                        [`${channelName}_${eventName}`]: newData
                    }
                }))
            })
        },
        unsubscribe: (channelName: string, eventName: string) => {
            const channel = pusher.channels.channels[channelName]
            if (channel) {
                channel.unbind(eventName)
                pusher.unsubscribe(channelName)
            }
        }
    }
})

export default useWebSocketStore