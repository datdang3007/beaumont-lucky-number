import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface Props {
  children: ReactNode;
}

interface MainLuckyNumberContextProps {
  isRunning: boolean;
  luckyNumber: string;
  onClickButtonStart: () => void;
}

const MainLuckyNumberContext = createContext<MainLuckyNumberContextProps | null>(null);

export const useMainLuckyNumberContext = () => {
  const ctx = useContext(MainLuckyNumberContext);

  if (!ctx) {
    throw new Error(
      "useMainLuckyNumberContext must be used within a MainLuckyNumberProvider"
    );
  }
  return ctx;
};

export const MainLuckyNumberProvider = ({ children }: Props) => {
  const [luckyNumber, setLuckyNumber] = useState("68000");
  const [isRunning, setIsRunning] = useState(false);
  const [intervalIds, setIntervalIds] = useState<number[]>([]);

  const getRandomNumberInRange = () => {
    return Math.floor(Math.random() * 51) + 68000;
  };

  const updateNumber = useCallback(() => {
    setLuckyNumber(getRandomNumberInRange().toString().padStart(5, "0"));
  }, []);

  const onClickButtonStart = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      updateNumber();
      const intervalId = setInterval(updateNumber, 50);
      setIntervalIds((prevIntervalIds) => ([
        ...prevIntervalIds,
        intervalId as unknown as number // Type assertion here
      ]));
      return;
    }

    setIsRunning(false);
    intervalIds.forEach(clearInterval); // Clear all intervals
    setIntervalIds([]); // Clear the intervalIds array
  }, [isRunning, intervalIds, updateNumber]);

  const provideProps = useMemo(
    () => ({
      isRunning,
      luckyNumber,
      onClickButtonStart,
    }),
    [isRunning, luckyNumber, onClickButtonStart]
  );

  useEffect(() => {
    return () => {
      intervalIds.forEach(clearInterval); // Cleanup function to clear all intervals on unmount
    };
  }, [intervalIds]);

  return (
    <MainLuckyNumberContext.Provider value={provideProps}>
      {children}
    </MainLuckyNumberContext.Provider>
  );
};
