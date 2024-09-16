import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/server/db";
import Link from "next/link";

export async function UserArticales(props: {siteId: string}) {
    const articles = await db.articles.findMany({
        where: { siteId: props.siteId },
    });
    return (
        <>
            {articles.length !== 0 ? (
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 m-2 ">
                    {articles.map((article) => (
                        <Card key={article.id}>
                            <CardHeader>
                                <CardTitle>{article.title}</CardTitle>
                            </CardHeader>
                            <CardFooter className="flex flex-wrap gap-2">
                                {new Date(article.createdAt).toLocaleDateString()}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="border-2 border-dashed rounded-lg ">
                    <div className="flex flex-col justify-center items-center gap-2.5 py-12 h-[80vh]">
                        <h2 className="text-2xl font-semibold">
                            You have no published articles
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Create a document and publish it to get started
                        </p>
                        <Button asChild>
                            <Link href={`/dashboard/${props.siteId}/documents`}>
                                Go to Documents
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}