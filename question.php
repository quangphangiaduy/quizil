<?php
include "config.php";
//   $sql_question = "SELECT * FROM questions";
//   $question = mysqli_query($conn, $sql_question);
//   $question_data = array();
// while ($row_question = mysqli_fetch_object($question)) {
//     array_push($question_data, $row_question);
// }
// $sql_anwser ="SELECT id,content FROM anwser";
// $anwser = mysqli_query($conn, $sql_anwser);
// $anwser_data = array();
// while ($row_anwser = mysqli_fetch_object($anwser)) {
//   array_push($anwser_data, $row_anwser);
// }
$sql = mysqli_query($conn, "SELECT * FROM questions ORDER BY RAND() LIMIT 10");//lấy ngẫu nhiên 5 câu hỏi từ database
$rows = array();
while($result = mysqli_fetch_assoc($sql)) {
    $rows[] = $result;
}
// echo json_encode($rows);
echo json_encode($rows,JSON_UNESCAPED_UNICODE);
// echo json_encode($question_data,JSON_UNESCAPED_UNICODE);
// echo json_encode($question_data);
?>

