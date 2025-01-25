"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { numberToIdr } from "@/utils/toIDR";
import { useState } from "react";

export default function FormTambahPembayaran(props) {
  const [loading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const nominal = e.target[0].value;
    const MESSAGE = "Data gagal di tambahkan.";
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/add-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nominal,
            tanggal: props.tanggal,
            user: props.name,
          }),
        }
      );
      if (res.ok) return window.location.reload();
      alert(MESSAGE);
    } catch (e) {
      alert(MESSAGE);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`flex items-center justify-between rounded-md p-4 w-full hover:bg-gray-900 cursor-pointer transition-all border`}
        >
          <h1 className="text-lg font-semibold">{props.name}</h1>
          <p className="text-lg font-semibold">{props.price}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tambah Pembayaran {props.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              type="number"
              required
              placeholder={`Nominal Pembayaran Max ${numberToIdr(props.max)}`}
              min={0}
              max={props.max}
            />
          </div>
          <DialogFooter className={"flex-row gap-2"}>
            <DialogClose asChild>
              <Button className="w-full">Batal</Button>
            </DialogClose>
            <Button disabled={loading} className="w-full" type="submit">
              Tambah
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
