import dbConnect from "@/lib/mongoose";
import DataBulanan from "@/models/DataBulanan";
import moment from "moment";

export async function updateDenda() {
	try {
		await dbConnect();
		const nowMonth = moment();
		const dataBulanan = await DataBulanan.find({});
		const beforeNowMonth = dataBulanan.filter((v) => v.tanggal != nowMonth.format("MMYYYY"));

		const getListDenda = beforeNowMonth
			.map((v) => {
				let bulanTerlambat = [];
				const monthDifference = nowMonth.diff(moment(v.tanggal, "MMYYYY"), "months");
				const totalPembayaran = v.pembayaran.reduce((a, b) => a + b.nominal, 0);

				for (let i = 1; i <= monthDifference; i++) {
					const m = nowMonth.clone().subtract(i, "months").format("MMYYYY");
					bulanTerlambat.push(m);
				}

				const filterUser = v.user
					.map((user) => {
						return {
							nama: user.nama,
							total_bayar: user.total_bayar,
							denda: bulanTerlambat.reverse(),
						};
					})
					.filter((u) => u.total_bayar != totalPembayaran);

				return {
					...v._doc,
					user: filterUser,
				};
			})
			.filter((v) => v.user.length > 0);

		const bulkOps = [];

		getListDenda.forEach((item) => {
			const updates = item.user.map((user) => ({
				filter: { _id: item._id, "user.nama": user.nama },
				update: {
					$set: {
						"user.$.denda": user.denda,
					},
				},
			}));

			bulkOps.push(...updates);
		});

		if (bulkOps.length > 0) {
			const result = await DataBulanan.bulkWrite(
				bulkOps.map(({ filter, update }) => ({
					updateOne: { filter, update },
				}))
			);

			return {
				status: true,
				message: "Data berhasil diperbarui",
				result,
			};
		} else {
			return {
				status: false,
				message: "Tidak ada data yang perlu diperbarui",
			};
		}
	} catch (error) {
		return {
			status: false,
			message: error.message,
		};
	}
}
