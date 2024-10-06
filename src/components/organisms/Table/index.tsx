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
} from "@nextui-org/react";
import { SearchIcon } from "../../../utils/icons";
import Input from "@/components/atoms/Input";
import { ITableColumn } from "@/utils/types";

interface Props {
  data: Record<string, any>[];
  columns: ITableColumn[];
  searchable?: boolean;
  searchPlaceholder?: string;
  renderCell?: (row: Record<string, any>, columnKey: React.Key) => JSX.Element;
}

const Table = ({
  searchable = false,
  searchPlaceholder = "Search by name",
  data,
  columns,
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

  const rowsPerPage = 8;
  const [page, setPage] = useState(1);
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    // column: "firstName",
    // direction: "ascending",
  });

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[
        sortDescriptor.column as keyof Record<string, any>
      ] as string;
      const second = b[
        sortDescriptor.column as keyof Record<string, any>
      ] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

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
        {searchable && (
          <div className="flex items-end justify-between gap-3">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder={searchPlaceholder}
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          </div>
        )}
      </div>
    );
  }, [searchable, searchPlaceholder, filterValue, onSearchChange, onClear]);

  return (
    <NextUiTable
      aria-label="Users table"
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
      bottomContentPlacement="outside"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} allowsSorting={column.isSortable}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={sortedItems} emptyContent={"No users to display."}>
        {(item) => (
          <TableRow key={item?.id}>
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
