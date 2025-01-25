import { ScrollArea } from "@/components/ui/scroll-area";
import web from "@/lib/config";
import { numberToIdr } from "@/utils/toIDR";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

const text = [
  "Jika sudah melakukan pembayaran harap konfirmasi ke whastapp di atas!",
  "Waktu liburan/tidak ada di asrama tetap wajib melakukan pembayaran!",
  "Pembayaran yang terlamat akan dikenakan dendan sebesar Rp. 10.000 perbulan.",
];

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data-bulanan`, {
    cache: "no-store",
  });
  const { dataBulanan } = await res.json();

  const filter = dataBulanan.filter((v) => {
    return v.tanggal == moment().format("MMYYYY");
  })[0];

  return (
    <ScrollArea className="h-full w-full rounded-md">
      <div>
        <div className="h-full flex flex-col gap-2 items-center justify-center p-6">
          <h1 className="text-xl text-center font-semibold">
            Tagihan yang harus dibayar bulan ini
          </h1>
          <table className="w-[80%] border-collapse mb-4">
            <tbody>
              {filter.pembayaran.map(({ title, nominal }, i) => (
                <tr key={i} className="*:border *:text-center *:py-1">
                  <td>{title}</td>
                  <td>{numberToIdr(nominal)}</td>
                </tr>
              ))}
              <tr className="*:border *:text-center *:py-1">
                <td>Total</td>
                <td>
                  {numberToIdr(
                    filter.pembayaran.reduce(
                      (sum, { nominal }) => sum + nominal,
                      0
                    )
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <h1 className="text-xl font-semibold">Untuk Pembayaran Online</h1>
          <Image
            src="/qris.png"
            width={200}
            height={200}
            className="w-[60%] mb-4"
            alt="QRIS"
          />
          <h1 className="text-xl font-semibold">Untuk Pembayaran Offline</h1>
          <div className="flex gap-2 mb-4 p-2 items-center justify-center w-full">
            <p>Hubungi No Berikut : </p>
            <Link
              href={`https://wa.me/${web.no_wa}`}
              target="_blank"
              className="text-lg font-semibold flex gap-2 items-center justify-center rounded-md bg-green-600 px-4 py-2"
            >
              <FaWhatsapp size={20} />
              <p>Whatsapp</p>
            </Link>
          </div>

          {text.map((v, i) => (
            <p key={i} className="border rounded-md p-2 text-center">
              {v}
            </p>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
