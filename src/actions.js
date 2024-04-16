"use server";
import * as db from "../server/db/band-api.js";

export async function addBand(formData) {
  const bandName = formData.get("name");
  await db.addBand(bandName);
  return { success: true };
}
