import {
  JSX,
  RefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Socket, io} from 'socket.io-client';
import {Config} from '../../config/config';
import {Channels, UserChannels} from '../../constant/game';
import {useUser} from '../store/user';
import {useFreind} from '../store/freind';
interface IProps {
  children: JSX.Element;
}
const socketContext = createContext<{
  socketref?: RefObject<Socket<any> | null>;
}>({});

export default function SocketProvider({children}: IProps) {
  const socketref = useRef<Socket>(null);
  const {user, acceptUser, pendingUser} = useUser(state => state);
  const {setChallenge, setRequestFreind} = useFreind(state => state);
  const [flag, setFlag] = useState('');
  const [socketId, setSocketId] = useState('');
  useEffect(() => {
    if (socketId && user && flag !== socketId) {
      const msg = JSON.stringify({
        id: user?._id,
        socketId: socketref?.current?.id,
      });
      socketref?.current?.emit(Channels.ON_CONNECT, msg);
      setFlag(socketId);
    }
  }, [user, socketId]);
  useEffect(() => {
    socketref.current = io(Config.SOKCET_URL);
    const socket = socketref.current;
    socketref.current.on('connect', () => {
      setSocketId(socketref.current?.id ?? '');
      console.log('socket connected successfully');
    });
    socket.on(UserChannels.ON_USER_FREIND_REQUEST, msg => {
      const user = JSON.parse(msg);
      pendingUser(user);
      setRequestFreind(user);
    });
    socket.on(UserChannels.ON_USER_CHALLENGE, msg => {
      const user = JSON.parse(msg);
      setChallenge(user);
    });
    setSocketId(socketref.current?.id ?? '');
    return () => {
      if (socketref.current) {
        socketref.current.disconnect();
      }
    };
  }, []);
  return (
    <socketContext.Provider value={{socketref}}>
      {children}
    </socketContext.Provider>
  );
}

export function useSocket() {
  const socket = useContext(socketContext);
  if (!socket) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return socket;
}
