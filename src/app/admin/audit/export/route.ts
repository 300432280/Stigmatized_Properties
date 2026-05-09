import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { readStore } from "@/lib/store";

export async function GET() {
  const user = await getCurrentUser();
  if (user?.role !== "admin") return new NextResponse("Unauthorized", { status: 401 });
  const store = await readStore();
  const csv = [
    "id,createdAt,action,entityType,entityId,userId",
    ...store.auditLogs.map((log) => [log.id, log.createdAt, log.action, log.entityType, log.entityId || "", log.userId || ""].map(csvCell).join(","))
  ].join("\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=\"property-chronicle-audit.csv\""
    }
  });
}

function csvCell(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}
