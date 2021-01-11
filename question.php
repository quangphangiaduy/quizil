<?php
include "config.php";

$sql = mysqli_query($conn, "SELECT * FROM questions ORDER BY RAND() LIMIT 10");//lấy ngẫu nhiên 5 câu hỏi từ database
$rows = array();
while($result = mysqli_fetch_assoc($sql)) {
    $rows[] = $result;
}
// echo json_encode($rows);
echo json_encode($rows,JSON_UNESCAPED_UNICODE);

?>

