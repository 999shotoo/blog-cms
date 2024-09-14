
import { Button } from "../ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { UserProfile } from "@clerk/nextjs";
import { DotIcon } from "lucide-react";
import { SettingsModal } from "./settingsmodal";
import { db } from "@/server/db";

export async function Profile() {
    const user = await currentUser()
    return (
        <>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <Avatar>
                            <AvatarImage src={user?.imageUrl || "https://github.com/999shotoo.png"} />
                            <AvatarFallback>PX</AvatarFallback>
                        </Avatar>
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[60rem] max-h-[100vh] p-3 pt-10 " >
                    <SettingsModal apikey={`${user?.id}`} />
                </DialogContent>
            </Dialog>
        </>
    );
}