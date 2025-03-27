"use server";
import { prisma } from "./db";

export async function handleSubmission(){
 
    const data =await prisma.hashgen.create({
        
    })

}