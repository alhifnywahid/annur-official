import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Fragment } from "react";
import FormTambahUser from "../components-admin/formTambahUser";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data-user`, {
    cache: "no-store",
  });
  const user = await res.json();
  console.log(user);
  return (
    <div className="flex flex-col gap-2 h-full my-3">
      <ScrollArea className="h-full w-full rounded-md">
        <div className="">
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-2"
          >
            {user.map((v, i) => (
              <Fragment key={i}>{<Card name={v.nama} />}</Fragment>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
      <FormTambahUser />
    </div>
  );
}

const Card = (props) => {
  return (
    <div
      className={`flex items-center justify-between rounded-md p-4 w-full hover:bg-gray-900 cursor-pointer transition-all border`}
    >
      <h1 className="text-lg font-semibold">{props.name}</h1>
    </div>
  );
};
