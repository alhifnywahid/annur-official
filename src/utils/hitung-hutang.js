function hitungHutang(dataBulanan) {
	let data = [];

	dataBulanan.forEach((v) => {
		const totalTagihan = v.pembayaran.reduce((a, b) => a + b.nominal, 0);
		v.user.forEach((user) => {
			const inclues = data.find((d) => d.nama === user.nama);
			const isNolDenda = user.denda.length === 0;
			const totalDenda = isNolDenda ? 0 : user.denda.length * 10000;
			const pembayaranPerBulan = totalTagihan - user.total_bayar;

			if (inclues) {
				inclues.nominal += pembayaranPerBulan + totalDenda;
			} else {
				data.push({
					nama: user.nama,
					nominal: pembayaranPerBulan + totalDenda,
				});
			}
		});
	});

	return data;
}

export default hitungHutang;
