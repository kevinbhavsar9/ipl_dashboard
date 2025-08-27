import { MatchLinks, Team } from "@/pages/api/schedule";

const formatter = Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export const formatNumber = (value: number) => formatter.format(value);

export const getPaginationLabel = (
  data: Array<{
    [key: string]: string | MatchLinks | Team | null | number | undefined;
  }>,
  page: number,
  rowsPerPage: number
) => {
  const length = data.length;
  const totalPages = Math.ceil(length / 5);
  return `Showing ${
    page === null || totalPages === null
      ? 0
      : page === totalPages - 1
      ? length - rowsPerPage * page
      : rowsPerPage
  }
 / ${formatNumber(length)}`;
};
