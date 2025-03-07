import {
    JSX,
    createContext,
    useContext,
    useState,
} from 'react';
interface IProps {
    children: JSX.Element;
}
const rotateContext = createContext<{
    rotate?: boolean;
    setRotate: (rotate: boolean) => void;
} | null>(null);

export default function RotateProveder({ children }: IProps) {
    const [rotate, setRotate] = useState(false)
    return (
        <rotateContext.Provider value={{ rotate, setRotate }}>
            {children}
        </rotateContext.Provider>
    );
}

export function useRotate() {
    const rotate = useContext(rotateContext);
    if (!rotate) {
        throw new Error('useSocket must be used within a RotateProveder');
    }
    return rotate;
}
