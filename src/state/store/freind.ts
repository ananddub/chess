import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {mmkvStorage} from '../spa/storage';
import {GameStatus} from '../../constant/game';

interface Userteam {
  name: string;
  rating: number;
  email: string;
  socketId: null | string;
  isOnline: boolean;
  status: GameStatus;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  requestFreind: Userteam[];
  challenge: Userteam[];
  setRequestFreind: (requestFreind: Userteam) => void;
  setChallenge: (challenge: Userteam) => void;
}

export const useFreind = create<UserState>()(
  persist(
    set => ({
      challenge: [],
      requestFreind: [],
      setChallenge: (user: Userteam) =>
        set(state => ({
          challenge: [...state.challenge, user],
        })),
      setRequestFreind: (user: Userteam) =>
        set(state => ({
          requestFreind: [...state.requestFreind, user],
        })),
    }),
    {
      name: 'freind-store',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
