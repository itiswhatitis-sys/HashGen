"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEdgeStore } from "@/lib/edgestore";
import Link from "next/link";
import { useState } from "react";

interface ImageUrls {
    url: string;
}

export default function ImgUpld() {
    const [tweet, setTweet] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [urls, setUrls] = useState<ImageUrls | null>(null);
    const { edgestore } = useEdgeStore();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            setFile(selectedFile);
        } else {
            alert("Please upload a valid image file.");
        }
    };

    const handleSubmit = async () => {
        if (file) {
            const res = await edgestore.publicFiles.upload({ file });
            setUrls({ url: res.url });
            
            
        } else {
            // alert("Please select an image to upload.");
            
        }
    //   this function is to get the response
        const description =String(urls?.url);
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description }),
          });
      
          const result = await response.json();

          if (result.tweet) {
            setTweet(result.tweet);
          } else {
            console.error('Error:', result.error);
          }
    };

    

    return (
        <>
            <Card>
                <CardTitle className="text-center text-xl font-bold">Generate Caption and Hashtag</CardTitle>
                <CardContent className="items-center">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Label>Image</Label>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Input
                                required
                                id="picture"
                                className="mt-4"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <Button
                            className="mt-5 rounded-md"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
{/* for checking img url
            {urls?.url && (
                <div className="mt-4">
                    <p>Uploaded image URL:</p>
                    <Link href={urls.url} target="_blank">
                        View Image 
                    </Link>
                </div>
            )} */}
            {tweet &&  (
        <Card className="mt-10 flex justify-center">
           <CardContent > <div className="flex justify-center text-center text-black  ">
                     <p  className=" text-center text-lg font-medium">{tweet}</p>
             </div></CardContent>
        </Card>)}
        </>
    );
}
