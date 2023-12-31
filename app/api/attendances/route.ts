import { z } from "zod";
import { deleteAttendances } from "@/app/lib/data";
import { revalidatePath } from "next/cache";
import { DASHBOARD_PATH } from "@/app/lib/routes";

export async function DELETE(request: Request) {
  const data = await request.json();
  const fields = z.array(z.string()).safeParse(data);

  if (!fields.success) {
    return Response.json({ ok: false });
  }

  try {
    await deleteAttendances(fields.data);
    revalidatePath(DASHBOARD_PATH, "layout");
  } catch (error) {
    return Response.json({ ok: false });
  }

  return Response.json({ ok: true });
}
