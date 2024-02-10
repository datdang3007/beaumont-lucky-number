import { Button, Grid, Typography, styled } from "@mui/material";
import { BackGround, Name } from "../../components";
import { ColorPalette } from "../../constants";
import { useMainLuckyNumberContext } from "../../providers";

export const MainLuckyNumber = () => {
  const { isRunning, luckyNumber, onClickButtonStart } =
    useMainLuckyNumberContext();

  return (
    <BackGround>
      <Name />
      <NumberContainer>
        <NumberTypography>{luckyNumber}</NumberTypography>
      </NumberContainer>
      <ButtonStart onClick={onClickButtonStart}>
        {isRunning ? "Dừng" : "Bắt Đầu"}
      </ButtonStart>
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

const ButtonStart = styled(Button)({
  position: "absolute",
  left: "50%",
  bottom: "100px",
  width: "200px",
  fontSize: "20px",
  borderRadius: "8px",
  color: ColorPalette.White,
  transform: "translateX(-50%)",
  background: `${ColorPalette.Black} !important`,
});
