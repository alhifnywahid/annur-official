import CardUser from "@/components/card-user";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import moment from "moment";
import { Fragment } from "react";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data-bulanan`, {
    cache: "no-store",
  });
  const { dataBulanan } = await res.json();
  return (
    <main className="flex h-full w-full flex-col overflow-hidden">
      <div className="flex flex-col gap-3 h-full">
        <ScrollArea className="h-full w-full rounded-md">
          <div className="">
            <Accordion type="single" collapsible className="w-full">
              {dataBulanan.map((bulan, i) => (
                <Fragment key={i}>
                  <DataAccordion data={bulan} i={i} />
                </Fragment>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}

function DataAccordion({ data, i }) {
  const { user, pembayaran } = data;
  const perBulan = pembayaran.reduce((a, b) => a + b.nominal, 0) * user.length;
  const denda = user.reduce((a, b) => a + b.denda.length * 10000, 0);
  const totalBayar = user.reduce((a, b) => a + b.total_bayar, 0);
  const isHaveNotPaid = perBulan + denda != totalBayar;
  const monthNow = moment(data.tanggal, "MMYYYY").format("MMMM YYYY");

  return (
    <AccordionItem value={`item-${i + 1}`} className="w-full">
      <AccordionTrigger className={isHaveNotPaid && "text-red-500"}>
        {monthNow}
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-2">
          {user.map((u, i) => (
            <Fragment key={i}>
              <CardUser bulan={data} user={u} />
            </Fragment>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
