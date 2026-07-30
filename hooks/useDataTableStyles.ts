import { useMemo } from "react";
import { TableStyles } from "react-data-table-component";

export interface DataTableStyleOptions {
  isStickyFirstColumn?: boolean;
  headerBg?: string;
  headerTextColor?: string;
  fontSize?: string;
}


export const useDataTableStyles = (
  options: DataTableStyleOptions = {},
): TableStyles => {

  const {
    isStickyFirstColumn = true,
    headerBg = "var(--aise-table-heading, #1950A3)",
    headerTextColor = "var(--aise-table-heading-text, #ffffff)",
    fontSize = "var(--aise-table-content-text-size, 14px)",
  } = options;


  return useMemo<TableStyles>(
    () => ({

      table: {
        style: {
          borderCollapse: "separate",
          borderSpacing: 0,
        },
      },


      headRow: {
        style: {
          position: "sticky",
          top: 0,
          zIndex: 5,
          backgroundColor: headerBg,
        },
      },


      headCells: {
        style: {
          backgroundColor: headerBg,
          color: headerTextColor,
          borderRight: "1px solid #EBEBEB",
          borderBottom: "2px solid #EBEBEB",
          fontSize: "14px",
          fontWeight: "600",
          padding: "12px 8px",
        },
      },


      cells: {
        style: {
          borderRight: "1px solid #EBEBEB",
          borderBottom: "1px solid #f3f4f6",
          fontSize,
          padding: "12px 8px",
          backgroundColor: "#ffffff",
        },
      },


      rows: {
        style: {
          minHeight: "55px",
        },
        highlightOnHoverStyle: {
          backgroundColor: "#f8fafc",
          borderBottomColor: "#e5e7eb",
          outlineStyle: "none",
        },
      },


    }),
    [
      headerBg,
      headerTextColor,
      fontSize,
      isStickyFirstColumn,
    ],
  );
};



export const useDataTableForNonStickyTable = (
  options: Omit<DataTableStyleOptions, "isStickyFirstColumn"> = {},
): TableStyles => {

  return useDataTableStyles({
    ...options,
    isStickyFirstColumn: false,
  });

};