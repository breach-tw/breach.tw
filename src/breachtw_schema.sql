-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2019 at 08:01 AM
-- Server version: 5.7.14-google-log
-- PHP Version: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `breachtw`
--

-- --------------------------------------------------------

--
-- Table structure for table `breach_item`
--

CREATE TABLE `breach_item` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `abbr` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `breach_item`
--

INSERT INTO `breach_item` (`id`, `name`, `abbr`) VALUES
(1, 'Facebook ID', 'fb_id'),
(2, '生日', 'birth'),
(3, '地址', 'address'),
(4, '電話', 'phone'),
(5, 'E-mail', 'email'),
(6, '姓名', 'name'),
(7, '身分證字號', 'social_id'),
(8, '服務單位', 'dep'),
(9, '職位', 'job'),
(10, '學校', 'school'),
(11, '系所', 'school_dep'),
(12, '密碼明碼', 'password'),
(13, '雜湊密碼', 'pw_hash');

-- --------------------------------------------------------

--
-- Table structure for table `breach_log`
--

CREATE TABLE `breach_log` (
  `id` int(11) NOT NULL,
  `hash` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `source` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `breach_source`
--

CREATE TABLE `breach_source` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `round_k` int(11) NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` date NOT NULL,
  `major` tinyint(1) NOT NULL DEFAULT '0',
  `file` tinyint(1) NOT NULL DEFAULT '0',
  `type` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `search_log`
--

CREATE TABLE `search_log` (
  `id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hash` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isbreach` tinyint(1) NOT NULL DEFAULT '0',
  `ip` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `source_item`
--

CREATE TABLE `source_item` (
  `id` int(11) NOT NULL,
  `source` int(11) NOT NULL,
  `item` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stat`
--

CREATE TABLE `stat` (
  `id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `unique_hash` int(11) NOT NULL,
  `total_pop` int(11) NOT NULL,
  `total_pop_month` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hit` int(11) NOT NULL,
  `no_hit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `hash` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verify` tinyint(1) NOT NULL DEFAULT '0',
  `email_verify_code` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verify_time` timestamp NULL DEFAULT NULL,
  `email_verify_ip` text COLLATE utf8mb4_unicode_ci,
  `sub_time` timestamp NULL DEFAULT NULL,
  `sub_ip` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `disabled` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `breach_item`
--
ALTER TABLE `breach_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `breach_log`
--
ALTER TABLE `breach_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `source` (`source`),
  ADD KEY `hash` (`hash`);

--
-- Indexes for table `breach_source`
--
ALTER TABLE `breach_source`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `search_log`
--
ALTER TABLE `search_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `source_item`
--
ALTER TABLE `source_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item` (`item`),
  ADD KEY `source` (`source`);

--
-- Indexes for table `stat`
--
ALTER TABLE `stat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hash` (`hash`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `breach_item`
--
ALTER TABLE `breach_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `breach_log`
--
ALTER TABLE `breach_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `breach_source`
--
ALTER TABLE `breach_source`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `search_log`
--
ALTER TABLE `search_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `source_item`
--
ALTER TABLE `source_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stat`
--
ALTER TABLE `stat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `breach_log`
--
ALTER TABLE `breach_log`
  ADD CONSTRAINT `breach_log_ibfk_1` FOREIGN KEY (`source`) REFERENCES `breach_source` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `source_item`
--
ALTER TABLE `source_item`
  ADD CONSTRAINT `source_item_ibfk_1` FOREIGN KEY (`item`) REFERENCES `breach_item` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `source_item_ibfk_2` FOREIGN KEY (`source`) REFERENCES `breach_source` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
