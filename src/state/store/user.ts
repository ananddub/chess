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

interface User {
  _id: string;
  name: string;
  rating: number;
  email: string;
  accepted: Userteam[];
  rejected: Userteam[];
  block: Userteam[];
  pending: Userteam[];
  socketId: null | string;
  isOnline: boolean;
  status: GameStatus;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  acceptUser: (user: Userteam) => void;
  rejectUser: (user: Userteam) => void;
  blockUser: (user: Userteam) => void;
  unBlockUser: (user: Userteam) => void;
  pendingUser: (user: Userteam) => void;
  unPendingUser: (user: Userteam) => void;
}

export const useUser = create<UserState>()(
  persist(
    set => ({
      user: null,
      setUser: (user: User) => set({user}),
      acceptUser: (userTeam: Userteam) =>
        set(state =>
          state.user
            ? {
                user: {
                  ...state.user,
                  accepted: [...state.user.accepted, userTeam],
                },
              }
            : {},
        ),
      rejectUser: (userTeam: Userteam) =>
        set(state =>
          state.user
            ? {
                user: {
                  ...state.user,
                  rejected: [...state.user.rejected, userTeam],
                },
              }
            : {},
        ),
      blockUser: (userTeam: Userteam) =>
        set(state =>
          state.user
            ? {
                user: {
                  ...state.user,
                  block: [...state.user.block, userTeam],
                  accepted: state.user.accepted.filter(
                    u => u.email !== userTeam.email,
                  ),
                  rejected: state.user.rejected.filter(
                    u => u.email !== userTeam.email,
                  ),
                  pending: state.user.pending.filter(
                    u => u.email !== userTeam.email,
                  ),
                },
              }
            : {},
        ),
      unBlockUser: (userTeam: Userteam) =>
        set(state =>
          state.user
            ? {
                user: {
                  ...state.user,
                  block: state.user.block.filter(
                    u => u.email !== userTeam.email,
                  ),
                },
              }
            : {},
        ),
      pendingUser: (userTeam: Userteam) =>
        set(state =>
          state.user
            ? {
                user: {
                  ...state.user,
                  pending: [...state.user.pending, userTeam],
                },
              }
            : {},
        ),
      unPendingUser: (userTeam: Userteam) =>
        set(state =>
          state.user
            ? {
                user: {
                  ...state.user,
                  pending: state.user.pending.filter(
                    u => u.email !== userTeam.email,
                  ),
                },
              }
            : {},
        ),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
