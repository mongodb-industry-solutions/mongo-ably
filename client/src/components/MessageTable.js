import React, { useState, useRef } from 'react'
import { Subtitle } from '@leafygreen-ui/typography';
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import {
    Cell,
    ExpandedContent,
    flexRender,
    HeaderCell,
    HeaderRow,
    Row,
    Table,
    TableBody,
    TableHead,
    useLeafyGreenTable
  } from "@leafygreen-ui/table";

const MessageTable = () => {
    const messages = [
        {dateCreated: new Date(), frequency: "hola"},
        {dateCreated: new Date(), frequency: "hola"},
        {dateCreated: new Date(), frequency: "hola"},
    
    ]
    const tableContainerRef = useRef(null);
    const [data] = useState(messages);
  
    const columns = [
        {
          accessorKey: "dateCreated",
          header: "Date Created",
          enableSorting: true,
        //   cell: (info) =>
        //     (info.getValue()).toLocaleDateString("en-us", {
        //       year: "numeric",
        //       month: "short",
        //       day: "numeric",
        //     }),
        },
        {
          accessorKey: "frequency",
          header: "Message",
        },
    ]
  
    const table = useLeafyGreenTable({
      containerRef: tableContainerRef,
      data,
      columns,
    });
  
    const { rows } = table.getRowModel();

    return (
        <div className='MessageTable'>
            <Subtitle>Messages history</Subtitle>
            <Table table={table} ref={tableContainerRef}>
                <TableHead isSticky>
                    {table?.getHeaderGroups().map(headerGroup => (
                        <HeaderRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <HeaderCell key={header.id} header={header}>
                                        {/* {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )} */}
                                    </HeaderCell>
                                );
                            })}
                        </HeaderRow>
                    ))}
                </TableHead>
                <TableBody>
                    {rows?.map((row) => {
                        return (
                            <Row key={row.id} row={row}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Cell key={cell.id}>
                                            {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                                        </Cell>
                                    );
                                })}
                                {row.subRows &&
                                    row.subRows.map((subRow) => (
                                        <Row key={subRow.id} row={subRow}>
                                            {subRow.getVisibleCells().map((cell) => {
                                                return (
                                                    <Cell key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </Cell>
                                                );
                                            })}
                                            {subRow.original.renderExpandedContent && (
                                                <ExpandedContent row={subRow} />
                                            )}
                                        </Row>
                                    ))}
                            </Row>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default MessageTable