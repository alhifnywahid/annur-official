import { revalidateTag } from "next/cache";

export async function GET() {
	revalidateTag("data-bulanan");
	return new Response(JSON.stringify({ message: "Cache cleared" }), {
		headers: { "Content-Type": "application/json" },
		status: 200,
	});
}
