import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { numberToIdr } from "@/utils/toIDR";
import moment from "moment";
import { Fragment } from "react";
import FormTambahPembayaran from "../components-admin/formTambahPembayaran";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data-bulanan`, {
    cache: "no-store",
  });
  const { dataBulanan } = await res.json();
  const getNowMonths = getUnpaidMonths(dataBulanan);

  return (
    <div className="flex flex-col gap-2 h-full my-3">
      <ScrollArea className="h-full w-full rounded-md">
        <div className="p-4">
          <Accordion type="single" collapsible={true} className="w-full">
            {getNowMonths.map((bulan, i) => (
              <Fragment key={i}>
                <AccordionItem value={`item-${i + 1}`} className="w-full">
                  <AccordionTrigger>
                    {moment(bulan.tanggal, "MMYYYY").format("MMMM YYYY")}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      {bulan.unpaidUsers.map((user, i) => (
                        <Fragment key={i}>
                          <FormTambahPembayaran
                            max={
                              bulan.pembayaran.reduce(
                                (a, b) => a + b.nominal,
                                0
                              ) +
                              user.denda.length * 10000 -
                              user.total_bayar
                            }
                            name={user.nama}
                            tanggal={bulan.tanggal}
                            price={
                              bulan.pembayaran.reduce(
                                (a, b) => a + b.nominal,
                                0
                              ) === user.total_bayar
                                ? "Lunas"
                                : `- ${numberToIdr(
                                    bulan.pembayaran.reduce(
                                      (a, b) => a + b.nominal,
                                      0
                                    ) +
                                      user.denda.length * 10000 -
                                      user.total_bayar
                                  )}`
                            }
                          />
                        </Fragment>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Fragment>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
}

const getUnpaidMonths = (data) => {
  return data
    .map((month) => {
      const totalPayment = month.pembayaran.reduce(
        (sum, payment) => sum + payment.nominal,
        0
      );
      const unpaidUsers = month.user.filter(
        (user) => user.total_bayar < totalPayment
      );
      if (unpaidUsers.length > 0) {
        return {
          tanggal: month.tanggal,
          pembayaran: month.pembayaran,
          unpaidUsers: unpaidUsers,
        };
      }

      return null;
    })
    .filter(Boolean);
};
