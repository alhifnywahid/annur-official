"use client";

import { numberToIdr } from "@/utils/toIDR";
import moment from "moment";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";

export default function CardUser({ bulan, user }) {
  const { nama, total_bayar, denda } = user;
  const { tanggal, pembayaran } = bulan;

  const [open, setOpen] = useState(false);
  const price = pembayaran.reduce((a, b) => a + b.nominal, 0);
  const totalPembayaran = price + denda.length * 10000;
  const ifSome = totalPembayaran === total_bayar;
  const date = moment(tanggal, "MMYYYY").format("MMMM YYYY");
  const isLate = user.denda.length > 0;

  return (
    <Dialog open={!ifSome && open}>
      <div
        onClick={() => setOpen(true)}
        className={`flex items-center justify-between rounded-md p-4 w-full hover:bg-gray-900 cursor-pointer transition-all border ${
          ifSome ? "border-green-700" : "border-red-700"
        }`}
      >
        <h1 className="text-lg font-semibold">{nama}</h1>
        <div className="flex flex-col items-end justify-center">
          <p className="text-lg font-semibold">
            {ifSome
              ? "Lunas"
              : `- ${numberToIdr(totalPembayaran - total_bayar)}`}
          </p>
          {isLate && (
            <p className="text-sm text-red-500">
              Terlambat {user.denda.length} Bulan
            </p>
          )}
          {/* <p className="text-lg font-semibold">
            Terlambat {JSON.stringify(isLate)}
          </p> */}
        </div>
      </div>
      <DialogContent className="max-w-[400px] sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            {nama} - {date}
          </DialogTitle>
        </DialogHeader>
        <DataTable
          nowMonth={price}
          price={totalPembayaran}
          bayar={total_bayar}
          denda={denda}
        />
        <DialogFooter>
          <Button onClick={() => setOpen(false)} className="w-full">
            Kembali
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DataTable({ price, denda, bayar, nowMonth }) {
  return (
    <Table className="w-full">
      <TableBody>
        <TRow cell1="Pembayaran" cell2={numberToIdr(nowMonth)} isBold={false} />
        {denda.map((d, i) => (
          <TRow
            key={i}
            cell1={`Denda ${moment(d, "MMYYYY").format("MMMM")}`}
            cell2={numberToIdr(10000)}
            isBold={false}
          />
        ))}
        <TRow cell1="Total Tagihan" cell2={numberToIdr(price)} />
        <TRow cell1="Telah dibayar" color="green" cell2={numberToIdr(bayar)} />
        <TRow
          cell1="Pembayaran Kurang"
          color="red"
          cell2={numberToIdr(price - bayar)}
        />
      </TableBody>
    </Table>
  );
}

function TRow({ cell1, cell2, color = "red", isBold = true }) {
  return (
    <TableRow className={`${isBold && "font-bold"} text-${color}-500`}>
      <TableCell>{cell1}</TableCell>
      <TableCell className="text-right">{cell2}</TableCell>
    </TableRow>
  );
}
