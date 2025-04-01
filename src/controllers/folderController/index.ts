import "server-only";
import "reflect-metadata";

import { AppDataSource } from "@/entities";
import { FolderEntity } from "@/entities/folders";
import { IsNull } from "typeorm";

const folderRepository = AppDataSource.getRepository(FolderEntity);

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

const getRootSubFolders = async () => {
    const rootSubFolders = await folderRepository
        .createQueryBuilder("folders")
        .where(
            "folders.parentid = (SELECT uuid FROM folders WHERE parentid IS NULL)"
        )
        .andWhere("folders.isdeleted = :isdeleted", { isdeleted: false })
        .getMany();

    return rootSubFolders;
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
    getRootSubFolders,
};
