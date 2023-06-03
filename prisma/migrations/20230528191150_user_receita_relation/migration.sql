/*
  Warnings:

  - You are about to drop the column `descrica` on the `receitas` table. All the data in the column will be lost.
  - Added the required column `descricao` to the `Receitas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `receitas` DROP COLUMN `descrica`,
    ADD COLUMN `descricao` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `UserReceita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usersId` INTEGER NOT NULL,
    `receitasId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserReceita` ADD CONSTRAINT `UserReceita_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserReceita` ADD CONSTRAINT `UserReceita_receitasId_fkey` FOREIGN KEY (`receitasId`) REFERENCES `Receitas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
