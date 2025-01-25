export const numberToIdr = (number) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(number);
};

export const idrToNumber = (idr) => {
	const cleaned = idr.replace(/[^0-9,-]/g, ""); // Pertahankan angka dan tanda minus
	const normalized = cleaned.replace(",", "."); // Ubah koma menjadi titik untuk desimal
	const result = parseFloat(normalized); // Ubah menjadi angka desimal

	return Math.round(result);
};
