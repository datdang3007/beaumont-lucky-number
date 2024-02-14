import { Grid, Typography } from "@mui/material";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}

interface MainLuckyNumberContextProps {
  isMaximum: boolean;
  isRunning: boolean;
  luckyNumber: string;
  listLuckyNumber: string[];
  onClickButtonStart: () => void;
  onClickButtonReset: () => void;
  renderListLuckyNumberComponent: () => void;
}

const MainLuckyNumberContext =
  createContext<MainLuckyNumberContextProps | null>(null);

export const useMainLuckyNumberContext = () => {
  const ctx = useContext(MainLuckyNumberContext);

  if (!ctx) {
    throw new Error(
      "useMainLuckyNumberContext must be used within a MainLuckyNumberProvider"
    );
  }
  return ctx;
};

const startNumber = 68000;
const count = 50;
const speed = 50;

export const MainLuckyNumberProvider = ({ children }: Props) => {
  const [listLuckyNumber, setListLuckyNumber] = useState<string[]>([]);
  const [luckyNumber, setLuckyNumber] = useState(`${startNumber}`);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalIds, setIntervalIds] = useState<number[]>([]);

  const isMaximum = useMemo(
    () => listLuckyNumber.length === count + 1,
    [listLuckyNumber]
  );

  const getRandomNumberInRange = () => {
    return Math.floor(Math.random() * (count + 1)) + startNumber;
  };

  const updateNumber = useCallback(() => {
    let newNumber = getRandomNumberInRange().toString().padStart(5, "0");
    while (listLuckyNumber.includes(newNumber)) {
      newNumber = getRandomNumberInRange().toString().padStart(5, "0");
    }
    setLuckyNumber(newNumber);
  }, [listLuckyNumber]);

  const renderListLuckyNumberComponent = useCallback(() => {
    return (
      <Grid>
        <Typography>{listLuckyNumber.join(",")}</Typography>
      </Grid>
    );
  }, [listLuckyNumber]);

  const onClickButtonStart = useCallback(() => {
    if (isMaximum) return;

    if (!isRunning) {
      setIsRunning(true);
      updateNumber();
      const intervalId = setInterval(updateNumber, speed);
      setIntervalIds((prevIntervalIds) => [
        ...prevIntervalIds,
        intervalId as unknown as number,
      ]);
      return;
    }

    setIsRunning(false);
    intervalIds.forEach(clearInterval);
    setIntervalIds([]);

    const newListLuckyNumber = [...listLuckyNumber];
    newListLuckyNumber.push(luckyNumber);
    setListLuckyNumber(newListLuckyNumber);
  }, [
    isMaximum,
    isRunning,
    intervalIds,
    luckyNumber,
    updateNumber,
    listLuckyNumber,
  ]);

  const onClickButtonReset = useCallback(() => {
    setListLuckyNumber([]);
  }, []);

  const provideProps = useMemo(
    () => ({
      isMaximum,
      isRunning,
      luckyNumber,
      listLuckyNumber,
      onClickButtonStart,
      onClickButtonReset,
      renderListLuckyNumberComponent,
    }),
    [
      isMaximum,
      isRunning,
      luckyNumber,
      listLuckyNumber,
      onClickButtonStart,
      onClickButtonReset,
      renderListLuckyNumberComponent,
    ]
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
