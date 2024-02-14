import { Box, Button, Grid, Typography, styled } from "@mui/material";
import { BackGround, ListLuckyNumber, Name } from "../../components";
import { ColorPalette } from "../../constants";
import { useMainLuckyNumberContext } from "../../providers";

export const MainLuckyNumber = () => {
  const {
    isMaximum,
    isRunning,
    luckyNumber,
    listLuckyNumber,
    onClickButtonStart,
    onClickButtonReset,
  } = useMainLuckyNumberContext();

  return (
    <BackGround>
      <Name />
      <ListLuckyNumber list={listLuckyNumber} />
      <NumberContainer>
        <NumberTypography>{luckyNumber}</NumberTypography>
      </NumberContainer>
      <GroupButton>
        <ButtonStart
          onClick={onClickButtonStart}
          sx={{
            cursor: isMaximum ? "not-allowed" : undefined,
            opacity: isMaximum ? 0.6 : undefined,
          }}
        >
          {isRunning ? "Dừng" : "Bắt Đầu"}
        </ButtonStart>
        <ButtonReset onClick={onClickButtonReset}>Reset</ButtonReset>
      </GroupButton>
    </BackGround>
  );
};

const NumberContainer = styled(Grid)({
  position: "absolute",
  top: "46%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const NumberTypography = styled(Typography)({
  color: "#FEFEFE",
  fontFamily: `'Fraunces', serif`,
  fontSize: "120px",
});

const GroupButton = styled(Box)({
  position: "absolute",
  display: "flex",
  left: "50%",
  bottom: "100px",
  columnGap: "12px",
  transform: "translateX(-50%)",
});

const ButtonReset = styled(Button)({
  width: "200px",
  fontSize: "20px",
  borderRadius: "8px",
  color: ColorPalette.White,
  background: `${ColorPalette.Black} !important`,
});

const ButtonStart = styled(Button)({
  width: "200px",
  fontSize: "20px",
  borderRadius: "8px",
  color: ColorPalette.White,
  background: `${ColorPalette.Black} !important`,
});
