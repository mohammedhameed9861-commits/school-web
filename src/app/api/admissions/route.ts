import { z } from "zod";

import { getServerEnv } from "@/env";
import { ApiError, handle } from "@/lib/api";

/**
 * Admissions / registration lead submission — used by the home-page
 * registration CTA and the full admissions application form.
 */
const admissionsSchema = z.object({
  studentName: z.string().min(1).max(150),
  parentName: z.string().min(1).max(150),
  phone: z.string().min(6).max(30),
  email: z.email().optional().or(z.literal("")),
  gradeLevel: z.string().min(1).max(60),
  message: z.string().max(2000).optional().or(z.literal("")),
});

export const POST = handle(async (req) => {
  const input = admissionsSchema.parse(await req.json());

  const { ADMISSIONS_ENDPOINT } = getServerEnv();

  if (ADMISSIONS_ENDPOINT) {
    const upstream = await fetch(ADMISSIONS_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!upstream.ok) {
      throw new ApiError(502, "upstream_error", "Failed to deliver the application.");
    }
  } else {
    console.log("[api/admissions] submission:", input);
  }

  return { received: true };
});
