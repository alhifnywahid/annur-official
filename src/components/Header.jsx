"use client";

import { getDate } from "@/utils/date";
import moment from "moment";



const Header = () => {
  return (
    <div className="gap-3 items-center justify-between p-5 w-full rounded left-0 bottom-0 bg-gray-900 flex">
      <h1 className="font-semibold text-lg">Annur Official</h1>
      <h1 className="font-semibold text-lg">{moment().format('L')}</h1>
    </div>
  );
};

export default Header;