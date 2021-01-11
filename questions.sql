-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 29, 2020 at 04:28 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quizil`
--

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `question` varchar(225) COLLATE utf8_unicode_ci NOT NULL,
  `option_a` varchar(225) COLLATE utf8_unicode_ci NOT NULL,
  `option_b` varchar(225) COLLATE utf8_unicode_ci NOT NULL,
  `option_c` varchar(225) COLLATE utf8_unicode_ci NOT NULL,
  `option_d` varchar(225) COLLATE utf8_unicode_ci NOT NULL,
  `answer` varchar(225) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `question`, `option_a`, `option_b`, `option_c`, `option_d`, `answer`) VALUES
(1, 'Ngôn ngữ nào sau đây là ngôn ngữ bất đồng bộ?', 'html', 'php', 'python', 'javascript', 'D'),
(2, 'Ngôn ngữ javascipt có bao nhiêu kiểu dữ liệu nguyên thủy?', '3', '4', '5', '6', 'C'),
(3, 'Trong Javascript sự kiện Onclick xảy ra khi nào?', 'Sự kiện xảy ra khi người dùng click chuột vào phần tử', 'Sự kiện xảy ra khi người dùng click kép chuột vào phần tử', 'Sự kiện xảy ra khi người dùng di chuyển con trỏ ra khỏi phần tử', 'Sự kiện xảy ra khi người dùng di chuyển con trỏ vào phần tử', 'A'),
(4, 'JavaScript là ngôn ngữ xử lý ở đâu?', 'Không ở dạng nào', 'Server', 'Server và Client', 'Client', 'C'),
(5, 'JavaScript là ngôn ngữ dịch mã nguồn theo kiểu nào?', 'Biên dịch', 'Thông dịch', 'Thông dịch và biên dịch', 'Không có dạng nào ở trên', 'B'),
(6, 'Làm cách nào để gọi một hàm myFunction trong JavaScript?', 'Không ở dạng nào', 'myFunction();', 'call myFunction', 'call funtion myFunction();', 'B'),
(7, 'Trong JavaScript hàm parseInt() dùng để làm gì?', 'Chuyển một chuỗi thành số nguyên', 'Chuyển một chuỗi thành số thực', 'Chuyển số nguyên thành chuỗi', 'Chuyển một chuỗi thành số', 'A'),
(8, 'Trong JavaScript sự kiện Onload xảy ra khi nào?', 'Khi bắt đầu chạy chương trình', 'Khi click chuột', 'Khi di chuyển chuột qua', 'Khi kết thúc một chương trình', 'A'),
(9, 'Trong JavaScript sự kiện OnUnload xảy ra khi nào?', 'Khi bắt đầu chạy chương trình', 'Khi kết thúc một chương trình', 'Khi kích chuột', 'Khi di chuyển chuột qua', 'B'),
(10, 'JavaScript các các biến dạng nào?', 'Number, Interger, char', 'Number, String, Boolean', 'Number, String, Boolean, Null', 'Tất cả các loại trên', 'D'),
(11, 'Thẻ input type=”Submit” dùng để làm gì?', 'Tạo một ô text để nhập dữ liệu', 'Tạo một nút lệnh dùng để gửi tin trong form đi', 'Tạo một nút lệnh dùng để xóa thông tin trong form', 'Tất cả các ý trên', 'B'),
(12, 'Trong JavaScript sự kiện OnMouseOver xảy ra khi nào?', 'Khi một đối tượng trong form mất focus', 'Khi di chuyển con chuột qua một đối tượng trong form', 'Khi kích chuột vào nút lệnh', 'Khi một đối tượng trong form nhận focus', 'B'),
(13, 'Có những cách nào viết code JavaScript để chạy trong trang web?', 'Cả hai dạng viết tệp riêng hoặc viết trong trang HTML', 'Viết chung với HTML', 'Viết trên một tệp riêng', 'Không thuộc dạng nào', 'A'),
(14, 'Thực hiện kiểm tra nếu biến “i” không bằng 5, câu lệnh nào là đúng?', 'if (i != 5)', 'if i <> 5', 'if i =! 5 then', 'if (i <> 5)', 'A'),
(15, 'Hàm prompt(…) trong JavaScript dùng để làm gì?', 'Hiển thị thông báo nhập thông tin', 'Hiển thị một thông báo Yes, No', 'Không phương án nào đúng', 'Cả hai dạng trên', 'A');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
