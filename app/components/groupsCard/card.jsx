"use client";
import { useTable } from "react-table";
import { useMemo } from "react";

function Card({ data, tableActions, title }) {
  const columns = useMemo(() => tableActions, []);
  const { headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div className="w-full dark:bg-gradient-to-b from-[#2C303C] to-[#1D1E23]  overflow-x-auto border-[1.5px] rounded-2xl border-main dark:border-[#4A4E57] ">
      <table className="w-full ">
        <thead className="bg-[#3F8CAA] rounded-2xl font-[800] text-[#FFFFFF] md:text-[1rem] xl:text-xl text-[0.65rem]    border-[#3F8CAA] border-4   select-none ">
          {headerGroups?.map?.((headerGroup) => (
            <tr className="" key={Math.random() + Math.random()}>
              {headerGroup?.headers?.map?.((column, index) => (
                <th key={Math.random() + Math.random()} className="px-2 py-4">
                  {index == 0 ? title : column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className=" md:text-[1rem] xl:text-xl text-[0.65rem] font-[800] text-main dark:text-[#FFFFFF]">
          {rows?.map?.((row, i) => {
            prepareRow(row);
            return (
              <tr
                className="border-b border-main dark:border-[#4A4E57] last:border-b-0"
                key={Math.random() + Math.random()}
              >
                {row.cells.map((cell, index2) => (
                  <td
                    className={`px-2 py-2  ${
                      index2 % 2 != 0 ? "dark:bg-[#2b2d37]" : ""
                    }`}
                    key={Math.random() + Math.random()}
                  >
                    <span>{cell.render("Cell")}</span>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Card;
