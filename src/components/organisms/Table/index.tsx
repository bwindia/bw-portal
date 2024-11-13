"use client";

import { useCallback, useMemo, useState } from "react";

import {
  Table as NextUiTable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  SortDescriptor,
  getKeyValue,
  Selection,
} from "@nextui-org/react";
import { SearchIcon } from "../../../utils/icons";
import Input from "@/components/atoms/Input";
import { ITableColumn } from "@/utils/types";

interface Props {
  data: Record<string, any>[];
  columns: ITableColumn[];
  searchable?: boolean;
  searchPlaceholder?: string;
  initialRowsPerPage?: 5 | 10 | 20 | 50 | 100;
  headerContent?: JSX.Element;
  itemsKey?: string;
  renderCell?: (
    row: Record<string, any> | any,
    columnKey: React.Key
  ) => JSX.Element;
  selectionMode?: "single" | "multiple" | "none";
  onSelectionChange?: (keys: Selection) => void;
  selectedKeys?: Selection;
}

const Table = ({
  searchable = false,
  searchPlaceholder = "Search by name",
  data,
  columns,
  itemsKey = "user_id",
  initialRowsPerPage = 10,
  selectionMode = "none",
  onSelectionChange,
  selectedKeys,
  ...props
}: Props) => {
  const [filterValue, setFilterValue] = useState("");
  const hasSearchFilter = Boolean(filterValue);
  const searchableKeys = useMemo(
    () =>
      searchable
        ? columns
            .filter((column) => column.isSearchable)
            .map((column) => column.key)
        : [],
    [columns, searchable]
  );

  const filteredItems = useMemo(() => {
    let filteredData = [...data];

    if (hasSearchFilter && searchable) {
      filteredData = filteredData.filter((row: Record<string, any>) =>
        searchableKeys.some((key) =>
          row[key]?.toLowerCase().includes(filterValue.toLowerCase())
        )
      );
    }

    return filteredData;
  }, [data, hasSearchFilter, searchable, searchableKeys, filterValue]);

  const [rowsPerPage, setRowsPerPage] = useState<number>(initialRowsPerPage);
  const [page, setPage] = useState(1);
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    // column: "firstName",
    // direction: "ascending",
  });

  const sortedFilteredItems = useMemo(() => {
    if (!sortDescriptor.column) return filteredItems;

    return [...filteredItems].sort((a, b) => {
      const first = a[
        sortDescriptor.column as keyof Record<string, any>
      ] as string;
      const second = b[
        sortDescriptor.column as keyof Record<string, any>
      ] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedFilteredItems.slice(start, end);
  }, [page, rowsPerPage, sortedFilteredItems]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          {searchable && (
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder={searchPlaceholder}
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          )}
          {props.headerContent}
        </div>
      </div>
    );
  }, [
    searchable,
    searchPlaceholder,
    filterValue,
    onSearchChange,
    props.headerContent,
    onClear,
  ]);

  return (
    <NextUiTable
      aria-label="Users table"
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-between items-center">
            <span className="text-default-400 text-small">
              Total {data.length} entries
            </span>
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
                value={rowsPerPage}
              >
                {[5, 10, 20, 50, 100].map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ) : null
      }
      bottomContentPlacement="outside"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      classNames={{
        wrapper: "min-h-[222px]",
      }}
      selectionMode={selectionMode}
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn 
            key={column.key} 
            allowsSorting={column.isSortable}
            align={column.key === "actions" ? "center" : "start"}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items} emptyContent={"No users to display."}>
        {(item) => (
          <TableRow key={item[itemsKey]}>
            {(columnKey) => (
              <TableCell>
                {props.renderCell
                  ? props.renderCell(item, columnKey)
                  : getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </NextUiTable>
  );
};

export default Table;
