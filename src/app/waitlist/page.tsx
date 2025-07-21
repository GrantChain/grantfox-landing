"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Card } from "@/components/ui/card";
import { http } from "@/lib/axios";
import MainTemplate from "@/components/templates/main-template";

interface Waitlist {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
}

export default function WaitlistPage() {
  const [data, setData] = useState<Waitlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWaitlist() {
      setLoading(true);
      setError(null);
      try {
        const res = await http.get("/waitlist");
        setData(res.data.data || []);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else if (typeof err === "object" && err && "message" in err) {
          setError(String((err as { message: unknown }).message));
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchWaitlist();
  }, []);

  const columns = useMemo<ColumnDef<Waitlist>[]>(
    () => [
      {
        header: "Full Name",
        accessorKey: "full_name",
        cell: (info) => info.getValue(),
      },
      {
        header: "Email",
        accessorKey: "email",
        cell: (info) => info.getValue(),
      },
      {
        header: "Phone",
        accessorKey: "phone",
        cell: (info) => info.getValue(),
      },
      {
        header: "Registered At",
        accessorKey: "created_at",
        cell: (info) => new Date(info.getValue() as string).toLocaleString(),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center py-12">
      <Card className="w-full max-w-5xl mx-auto p-8 shadow-lg border border-neutral-800 bg-neutral-950">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Waitlist for our Services
        </h1>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-2 border-b border-neutral-800 bg-neutral-900 text-left text-sm font-semibold"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="text-center py-8 text-gray-400"
                    >
                      No records found.
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-neutral-800 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-2 border-b border-neutral-800 text-sm"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </main>
  );
}
