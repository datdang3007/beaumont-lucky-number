import { Grid, Typography, styled } from "@mui/material";
import { ColorPalette } from "../../constants";
import { useCallback } from "react";

type Props = {
  list: string[];
};

export const ListLuckyNumber = (props: Props) => {
  const { list } = props;

  const renderListLuckyNumberComponent = useCallback(() => {
    return list.map((value) => {
      return (
        <Grid container justifyContent="center" key={value}>
          <LuckyNumberText>{value}</LuckyNumberText>
        </Grid>
      );
    });
  }, [list]);

  return (
    <ListLuckyNumberBox>
      <Title>Danh Sách Trúng Thưởng</Title>
      <ListLuckyNumberContainer container rowGap="8px">
        {renderListLuckyNumberComponent()}
      </ListLuckyNumberContainer>
    </ListLuckyNumberBox>
  );
};

const ListLuckyNumberBox = styled(Grid)({
  left: "100px",
  width: "265px",
  minHeight: "250px",
  padding: "20px 25px",
  position: "absolute",
  borderRadius: "12px",
  background: ColorPalette.Black,
});

const ListLuckyNumberContainer = styled(Grid)({
  marginTop: "24px",
});

const Title = styled(Typography)({
  fontSize: "18px",
  color: "white",
});

const LuckyNumberText = styled(Typography)({
  fontSize: "28px",
  color: "white",
});
