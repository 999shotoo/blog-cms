import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function RootLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: {
        id: string;
    };
}>) {
    const { userId } = auth();

    if (!userId) {
        notFound();
    }

    const site = await db.site.findUnique({
        where: {
            id: params.id,
            userId,
        },
    });

    if (!site) {
        notFound();
    }

    return (
        <>
            {children}
        </>
    );
}
