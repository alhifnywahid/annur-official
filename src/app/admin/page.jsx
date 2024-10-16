import { ScrollArea } from "@/components/ui/scroll-area";
import { numberToIdr } from "@/utils/toIDR";
import moment from "moment";
import { Fragment } from "react";
import ActionTambahPengeluaran from "./components-admin/actionTambahPengeluaran";
import DialogForm from "./components-admin/formTambahPengeluaran";
export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data-bulanan`, {
    cache: "no-store",
  });
  const { dataPengeluaran } = await res.json();
  const sort = dataPengeluaran.sort((a, b) => b._id - a._id);
  return (
    <div className="flex flex-col gap-3 h-full mb-3">
      <h1 className="text-lg font-semibold mt-2">
        Riwayat Pemasukan & Pengeluaran
      </h1>
      <ScrollArea className="h-full w-full rounded-md border">
        <div className="p-4">
          <table className="w-full">
            <tbody>
              {sort.map((data, i) => (
                <Fragment key={i}>
                  <tr className="*:py-1 border-b">
                    <td className="text-center">{i + 1}.</td>
                    <td>{data.title}</td>
                    <td className="text-center">
                      {numberToIdr(data.nominal).replace(",00", "")}
                    </td>
                    <td className="text-center">
                      {moment(data.tanggal, "DDMMYYYY").format("DD/MM/YY")}
                    </td>
                    <td>
                      <ActionTambahPengeluaran
                        data={{
                          id: data._id,
                          title: data.title,
                          nominal: data.nominal,
                          tanggal: moment(data.tanggal, "DDMMYYYY").format(
                            "YYYY-MM-DD"
                          ),
                        }}
                      />
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollArea>
      <DialogForm />
    </div>
  );
}
