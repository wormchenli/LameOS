import "server-only";

import { AppDataSource } from "@/models";
import { Folders } from "@/models/folders";
import { IsNull } from "typeorm";

const folderRepository = AppDataSource.getRepository(Folders);

const getAllFolders = async () => {
    const folders = await folderRepository.find({
        where: {
            isdeleted: false,
        },
    });
    return folders;
};

const getRootFolder = async () => {
    const folder = await folderRepository.findOne({
        where: {
            parentid: IsNull(),
        },
    });
    return folder;
};

const getAllDeletedFolders = async () => {
    const folders = await folderRepository.find({
        where: {
            isdeleted: true,
        },
    });
    return folders;
};

const getSubFolders = async (parentId: string) => {
    const folders = await folderRepository.find({
        where: {
            parentid: parentId,
            isdeleted: false,
        },
    });
    return folders;
};

export const FolderController = {
    getAllFolders,
    getRootFolder,
    getAllDeletedFolders,
    getSubFolders,
};
