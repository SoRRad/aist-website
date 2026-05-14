import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  institution: z.string().optional(),
  inquiryType: z.enum([
    "general",
    "research-collaboration",
    "clinical-collaboration",
    "press",
    "position",
  ]),
  clinicalArea: z.string().optional(),
  datasetType: z.string().optional(),
  irbStatus: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.issues },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // TODO: Wire up real email delivery here.
  // Example with Resend: await resend.emails.send({ from: "...", to: "contact@aist-lab.org", ... })
  // Example with Mailgun: await mailgun.messages.create("...", { from: "...", to: "...", ... })
  console.log("[contact form submission]", JSON.stringify(data, null, 2));

  return NextResponse.json({ success: true });
}
