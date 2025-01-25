import { getDataBulananNew } from "@/data";
import DataBulanan from "@/models/DataBulanan";
import DataPemasukan from "@/models/DataPemasukan";
import DataPengeluaran from "@/models/DataPengeluaran";
import hitungHutang from "@/utils/hitung-hutang";
import moment from "moment";
import { checkNowMonth } from "./check-nowmonth";

export const dynamic = "force-dynamic";

export async function GET() {
	try {
		await checkNowMonth();
		const monthsNow = moment().format("MMYYYY");
		const findDataBulananNow = await DataBulanan.findOne({ tanggal: monthsNow });
		if (!findDataBulananNow) new DataBulanan(await getDataBulananNew()).save();

		const dataBulanan = await DataBulanan.find({});
		const dataPengeluaran = await DataPengeluaran.find({});
		const dataPemasukan = await DataPemasukan.find({});
		const uangMasuk = dataPemasukan
			.map((pengeluaran) => pengeluaran.nominal)
			.flat()
			.reduce((a, b) => a + b, 0);
		const uangKeluar = dataPengeluaran
			.map((pengeluaran) => pengeluaran.nominal)
			.flat()
			.reduce((a, b) => a + b, 0);
		const hitungDataBulan = dataBulanan
			.map((data) => data.user.map((user) => user.total_bayar))
			.flat()
			.reduce((a, b) => a + b, 0);

		const totalSaldo = hitungDataBulan + uangMasuk - uangKeluar;
		const listHutang = hitungHutang(dataBulanan);
		const listTagihan = dataBulanan.map((data) => data.pembayaran).flat();

		return Response.json({
			status: true,
			listTagihan,
			dataBulanan,
			dataPengeluaran,
			dataPemasukan,
			totalSaldo,
			listHutang,
		});
	} catch (error) {
		console.log(error.message);
		return Response.json({
			status: false,
			msg: error.message,
		});
	}
}
