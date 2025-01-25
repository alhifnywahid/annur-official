import { getDataBulananNew } from "@/data";
import dbConnect from "@/lib/mongoose";
import DataBulanan from "@/models/DataBulanan";
import moment from "moment";
import { updateDenda } from "./update-denda";

export const dynamic = "force-dynamic";

export async function checkNowMonth() {
	try { 
    await updateDenda();
		const monthsNow = moment().format("MMYYYY");
		const findDataBulananNow = await DataBulanan.findOne({ tanggal: monthsNow });
		if (!findDataBulananNow) new DataBulanan(await getDataBulananNew()).save(); 
	} catch (error) {
		console.log(error);
	}
}
