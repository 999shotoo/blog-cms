import { db as prisma } from "@/server/db";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  console.log("eventType", eventType);

  switch (eventType) {
    case "user.created":
      try {
        await prisma.user.create({
          data: {
            clerkUserId:  payload?.data?.id,
            firstName:  payload?.data?.first_name ,
            lastName:  payload?.data?.last_name,
            email:  payload?.data?.email_address ?? payload?.data?.email_addresses[0].email_address,
            client_ip:  payload?.event_attributes.http_request.client_ip ?? payload?.event_attributes.https_request.client_ip,
            username:  payload?.data?.username,
            avatarUrl:  payload?.data?.image_url,
          },
        })
        return NextResponse.json({
          status: 200,
          message: "User info inserted",
        });
      } catch (error: any) {
        console.log("error", error);
        return NextResponse.json({
          status: 400,
          message: error.message,
        });
      }
      break;

    case "user.updated":
      try {
        await prisma.user.update({
          where: {
            id: payload?.data?.id,
          },
          data: {
            clerkUserId:  payload?.data?.id,
            firstName:  payload?.data?.first_name ,
            lastName:  payload?.data?.last_name,
            email:  payload?.data?.email_address ?? payload?.data?.email_addresses[0].email_address,
            client_ip:  payload?.event_attributes.http_request.client_ip ?? payload?.event_attributes.https_request.client_ip,
            username:  payload?.data?.username,
            avatarUrl:  payload?.data?.image_url,
          },
        })
        return NextResponse.json({
          status: 200,
          message: "User info updated",
        });
      } catch (error: any) {
        return NextResponse.json({
          status: 400,
          message: error.message,
        });
      }
      break;

      case "user.deleted":
        try {
          await prisma.user.delete({
            where: {
              clerkUserId: payload?.data?.id,
            },
          });
          return NextResponse.json({
            status: 200,
            message: "User info deleted",
          });
        } catch (error: any) {
          return NextResponse.json({
            status: 400,
            message: error.message,
          });
        }
        break;

    default:
      return new Response("Error occured -- unhandeled event type", {
        status: 400,
      });
  }

  return new Response("", { status: 201 });
}
