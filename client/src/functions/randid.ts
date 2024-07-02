"use server"

import { randomUUID } from "crypto";

export async function randID(){
    return btoa(randomUUID());
}