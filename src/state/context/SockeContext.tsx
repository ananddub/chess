import {
    JSX,
    RefObject,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
} from 'react';
import { Socket, io } from 'socket.io-client';
interface IProps {
    children: JSX.Element;
}
const socketContext = createContext<{
    socketref?: RefObject<Socket<any> | null>;
}>({});

export default function SocketProvider({ children }: IProps) {
    const socketref = useRef<Socket>(null);
    useEffect(() => {
        socketref.current = io('http://localhost:3000');
        socketref.current.on('connect', () => {

        })
        socketref.current.on('disconnect', (data) => {
            console.log(data);
        })
        return () => {
            if (socketref.current)
                socketref.current.disconnect();
        };
    }, []);
    return (
        <socketContext.Provider value={{ socketref }}>
            {children}
        </socketContext.Provider>
    );
}

export function useSocket() {
    const socket = useContext(socketContext);
    if (!socket) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return socket
}
