"use client";
import { useClerk } from "@clerk/nextjs";
import { UserProfile } from "@clerk/nextjs";
import { ApiPage } from "./apipage";
import { LogOut, Webhook } from "lucide-react";
import { redirect } from "next/navigation";

const SignOutButton = () => {
    const clerk = useClerk();
    clerk.signOut();
    redirect("/");
};

export function SettingsModal(props: { apikey: string }) {
    return (
        <>
            <UserProfile routing="virtual">
                <UserProfile.Page label="API Key" labelIcon={<Webhook className="w-4 h-4" />} url="api_key">
                    <ApiPage apikey={`${props.apikey}`} />
                </UserProfile.Page>
                <UserProfile.Page label="Sign out" labelIcon={<LogOut className="w-4 h-4" />} url="sign_out">
                    <SignOutButton />
                </UserProfile.Page>
            </UserProfile>
        </>
    );
}