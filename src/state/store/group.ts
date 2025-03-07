
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '../spa/storage';
import { GameStatus } from '../../constant/game';

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

interface Match {
    player1: Userteam | null;
    player2: Userteam | null;
    groupId: string | null;
    comment: any[];
    totalwatching: number;
    moves: any[];
    iswathcing: boolean;
    isMyTurn: boolean;
    setPlayer1: (player1: Userteam) => void;
    setPlayer2: (player2: Userteam) => void;
    setGroupId: (groupId: string) => void;
    setComment: (comment: any[]) => void;
    setMoves: (moves: any[]) => void;
    setTotalWatching: (totalwatching: number) => void;
    setIswathcing: (iswathcing: boolean) => void;
    setIsMyTurn: (isMyTurn: boolean) => void;
}

export const useMatch = create<Match>()(
    persist(
        set => ({
            player1: null,
            player2: null,
            groupId: '',
            comment: [],
            totalwatching: 0,
            moves: [],
            iswathcing: false,
            isMyTurn: false,
            setPlayer1: (player1: Userteam) => set({ player1 }),
            setPlayer2: (player2: Userteam) => set({ player2 }),
            setGroupId: (groupId: string) => set({ groupId }),
            setComment: (comment: any[]) => set({ comment }),
            setMoves: (moves: any[]) => set({ moves }),
            setTotalWatching: (totalwatching: number) => set({ totalwatching }),
            setIswathcing: (iswathcing: boolean) => set({ iswathcing }),
            setIsMyTurn: (isMyTurn: boolean) => set({ isMyTurn }),
        }),
        {
            name: 'match-store',
            storage: createJSONStorage(() => mmkvStorage),
        },
    ),
);

