import "server-only";

import { FolderController } from "@/controllers/folderController";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const folders = await FolderController.getAllFolders();
    return NextResponse.json(folders);
}
