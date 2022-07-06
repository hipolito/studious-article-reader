CREATE DATABASE IF NOT EXISTS studious_article_reader_db;

USE studious_article_reader_db

DROP TABLE IF EXISTS `Articles`;
CREATE TABLE `Articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `externalId` varchar(255) DEFAULT NULL,
  `importDate` datetime DEFAULT NULL,
  `title` text,
  `description` text,
  `publicationDate` datetime DEFAULT NULL,
  `link` text,
  `mainPicture` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `externalId` (`externalId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `Imports`;
CREATE TABLE `Imports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `importDate` datetime DEFAULT NULL,
  `rawContent` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;