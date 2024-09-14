"use client";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Copy, EyeOff, Eye } from "lucide-react"

export function ApiPage(props: { apikey: string }) {
    const [showAPIKey, setShowAPIKey] = useState(false)

    const toggleAPIKeyVisibility = () => {
        setShowAPIKey(!showAPIKey)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(props.apikey).then(() => {
            //   toast({
            //     title: "API Key Copied",
            //     description: "The API key has been copied to your clipboard.",
            //   })
        })
    }

    return (
        <>
            <Card className="w-full bg-white text-black border-none">
                <CardHeader>
                    <CardTitle>API Key</CardTitle>
                    <CardDescription>
                        Keep your API key secret. Do not share it publicly. This key cannot be changed.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                        <Input
                            readOnly
                            type={showAPIKey ? "text" : "password"}
                            value={props.apikey}
                            className='bg-white text-black'
                        />
                        <Button variant="ghost" size="icon" onClick={toggleAPIKeyVisibility}>
                            {showAPIKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}