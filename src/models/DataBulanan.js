import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PembayaranSchema = new Schema({
	title: { type: String, required: true },
	nominal: { type: Number, required: true },
}); 

const UserSchema = new Schema(
	{
		nama: { type: String, required: true },
		total_bayar: { type: Number, required: true },
		denda: {
			type: [String],
			validate: {
				validator: function (value) {
					return Array.isArray(value) && new Set(value).size === value.length;
				},
				message: "Denda harus berupa array string unik",
			},
			default: [],
		},
	},
	{ _id: false }
);

const DataBulananSchema = new Schema(
	{
		tanggal: { type: String, required: true },
		pembayaran: [PembayaranSchema],
		user: [UserSchema],
	},
	{ versionKey: false }
);

const DataBulanan = mongoose.models.DataBulanan || mongoose.model("DataBulanan", DataBulananSchema);

export default DataBulanan;
