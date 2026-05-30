import { FC } from "react";
// import { useSearchParams } from "next/navigation";
import {
  Box,
  // IconButton,
  styled,
  Typography,
} from "@mui/material";

// import Icon from "../icon";
// import changeQueryParams from "@/helpers/changeQueryParams";
// import { rowCounts } from "@/const/table";

interface IProps {
  maxPage?: number;
}

const TablePagination: FC<IProps> = () => {
  // const searchParams = useSearchParams();

  // const page: string = searchParams.get("page") ?? "1";
  // const perPage: string =
  //   searchParams.get("perPage") ?? rowCounts[0].toString();

  // useEffect(() => {
  //   if (!rowCounts.includes(Number(perPage)))
  //     changeQueryParams([{ name: "perPage", value: rowCounts[0] }]);
  // }, [perPage]);

  // const perPageHandleChange = (event: SelectChangeEvent) => {
  //   const perPageNew = event.target.value;
  //   changeQueryParams([
  //     { name: "page", value: 1 },
  //     { name: "perPage", value: perPageNew },
  //   ]);
  // };

  // const previousPage = () => {
  //   let pageNew = Number(page) - 1;
  //   changeQueryParams([{ name: "page", value: pageNew }]);
  // };

  // const nextPage = () => {
  //   let pageNew = Number(page) + 1;
  //   changeQueryParams([{ name: "page", value: pageNew }]);
  // };

  return (
    <MainBox>
      <RightBox>
        <CountBox>
          <Typography
            variant="medium14"
            color="textColor.muted"
            sx={{ whiteSpace: "pre", mr: 2 }}
          >
            تعداد ردیف‌ها در هر صفحه:
          </Typography>

          {/* <Select
            variant="outlined"
            value={perPage}
            onChange={perPageHandleChange}
          >
            {rowCounts.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select> */}
        </CountBox>
      </RightBox>

      <LeftBox>
        {/* <ArrowButtons disabled={page === "1"} onClick={previousPage}>
          <Icon icon="Chevron-Right-MD" size={20} />
        </ArrowButtons> */}

        {/* <Typography
          variant="regular14"
          color="textColor.muted"
          sx={{ mx: 3, mt: 0.5 }}
        >
          {page} از {maxPage}
        </Typography> */}

        {/* <ArrowButtons disabled={Number(page) >= maxPage} onClick={nextPage}>
          <Icon icon="Chevron-Left-MD" size={20} />
        </ArrowButtons> */}
      </LeftBox>
    </MainBox>
  );
};

const MainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(6),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const RightBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const CountBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const LeftBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(2),
  },
}));

// const ArrowButtons = styled(IconButton)(({ theme }) => ({
//   border: `1px solid ${theme.palette.stroke.active}`,
//   borderRadius: theme.spacing(2),
//   padding: theme.spacing(1.5),
// }));

export default TablePagination;
