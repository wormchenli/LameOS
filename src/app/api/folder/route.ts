import "server-only";

import { FolderController } from "@/controllers/folderController";
import { NextResponse } from "next/server";
export async function GET() {
    const folders = await FolderController.getAllFolders();
    return NextResponse.json(folders);
}
