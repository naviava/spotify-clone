// Next.
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// External packages.
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

// Lib and utils.
import { stripe } from "@/lib/stripe";
import { getURL } from "@/lib/helpers";
import { createOrRetrieveCustomer } from "@/lib/supabaseAdmin";

export async function POST() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Could not find user!");

    const customer = await createOrRetrieveCustomer({
      uuid: user?.id || "",
      email: user?.email || "",
    });

    if (!customer) throw new Error("Could not find customer!");

    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${getURL}/account`,
    });

    return NextResponse.json({ url });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
