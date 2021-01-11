$(function() {
    //alert('ok');

    var TIME;
    var minute = 1;
    var seconds = 30;
    var questions; //biến toàn cục chứa json từ php

    $('#finish').hide(); //ẩn nút nộp bài

    //hàm đếm đếm giờ
    function timeStart() {

        //TIME = setTimeout(timeStart, 100);
        TIME = setTimeout(timeStart, 1000); //đặt thời gian thực hiện
        $('#time').html('<i class="fas fa-user-clock"></i>&nbsp;' + minute + ':' + seconds);
        $('#time2').html('<span id="user_time"><i id="user_time" class="fas fa-user-clock"></i></span>&nbsp;' + minute + ':' + seconds);
        seconds--;
        if (seconds == -1) {
            seconds = 60;
            minute--;
        }
        if (minute == -1) {
            timeStop();
        }
    }

    //hàm dừng đếm giờ
    function timeStop() {
        clearTimeout(TIME); //dừng đếm giờ
        checkResult(); //check đáp án
        $('#finish').hide(); //dừng đếm giờ
    }

    //bắt đầu kiểm tra
    $('#start').click(function() {
        timeStart(); //bắt đầu đếm giờ
        $('.start-wrapper').hide(600); //ẩn nút bắt đầu
        //$('.start-wrapper').remove(); //xóa nút bắt đầu
        // $('.content').show(200); //show nội dung
        loadQuestion(); //lấy câu hỏi
        $('#finish').show(1000); //show nút nộp bài
    });

    //nộp bài
    $('#finish').click(function() {
        checkResult(); //check đáp án
        timeStop(); //dừng đếm giờ
        //$(this).hide(); //ẩn nút nộp bài
        $(this).remove(); //xóa nút nộp bài
    });

    //hàm lấy câu hỏi
    function loadQuestion() {
        $.ajax({
            url: "question.php", //URL mà request được gửi đến
            method: "get", //phương thức gửi
            success: function(response) {
                questions = JSON.parse(response); //lấy json
                //console.log(questions);
                let serial = 1; //thứ tự câu hỏi
                let element = ""; //lấy câu hỏi và đáp án
                $.each(questions, function(index, value) {
                    // console.log(index, value);

                    // element += `
                    // <tr>
                    //     <td>${value['id']}</td>
                    //     <td>${value['option_a']}</td>
                    //     <td>${value['option_b']}</td>
                    //     <td>${value['option_c']}</td>
                    //     <td>${value['option_d']}</td>
                    //     <td>${value['answer']}</td>
                    // </tr>
                    //   `

                    element += `
                    <div class="result mt-4" id="question_${value['id']}">
                         <h6 id="${value['id']}"> <span style="font-weight:bold; text-decoration:underline">Câu ${serial}:</span> ${value['question']}</h6><br>
                         
                         <fieldset>
                         <div class="radio col-md-12 ">
                          <label class="A "><input type="radio" class="A" name="${value['id']}">&nbsp;<span style="font-weight:bold;">A. </span>${value['option_a']}<span class="check" style="display: none;">&nbsp;<i class="fas fa-check"></i></span><span class="false" style="display: none;">&nbsp;<i class="fas fa-times"></i></span></label>
                         </div>

                        <div class="radio col-md-12">
                           <label class="B "><input type="radio" class="B" name="${value['id']}">&nbsp;<span style="font-weight:bold;">B. </span>${value['option_b']}<span class="check" style="display: none;">&nbsp;<i class="fas fa-check"></i></span><span class="false" style="display: none;">&nbsp;<i class="fas fa-times"></i></span></label>
                         </div>

                         <div class="radio  col-md-12">
                           <label class="C "><input type="radio" class="C" name="${value['id']}">&nbsp;<span style="font-weight:bold;">C. </span>${value['option_c']}<span class="check" style="display: none;">&nbsp;<i class="fas fa-check"></i></span><span class="false" style="display: none;">&nbsp;<i class="fas fa-times"></i></span></label>
                         </div>

                         <div class="radio col-md-12">
                           <label class="D "><input type="radio" class="D" name="${value['id']}">&nbsp;<span style="font-weight:bold;">D. </span>${value['option_d']}<span class="check" style="display: none;">&nbsp;<i class="fas fa-check"></i></span><span class="false" style="display: none;">&nbsp;<i class="fas fa-times"></i></span></label>
                         </div>
                        </fieldset>
                    </div>
                    `
                    serial++; //tăng tự động số thứ tự của câu hỏi
                });

                $('#question_content').html(element); //trả thẻ html về div chứa
            }
        });
    };

    //hàm check đáp án
    function checkResult() {

        let scores = 0; //đếm điểm
        let result = ''; //kết quả tổng thể
        let percent = ''; //tỉ lệ trả lời đúng
        let trueResults = 0; //đếm câu trả lời đúng
        let falseResults = 0; //đếm câu trẩ lời sai

        $('#question_content div.result').each(function(i, v) {
            // console.log(i, v);
            let id = $(v).find('h6').attr('id'); //lấy id câu hỏi
            //console.log(id);
            let question = questions.find(x => x.id == id); //tìm câu hỏi trong mảng questions dựa vào id đã có ở trên
            // console.log(question);
            let answer = question['answer']; //lấy đáp án đúng của câu hỏi
            //console.log(answer);
            let choice = $(v).find('fieldset input[type="radio"]:checked').attr('class'); //lấy đáp án được chọn
            //console.log(choice);
            if (choice == answer) {
                scores += 1; //mỗi câu đúng được cộng 2 điểm
                trueResults++ //tăng số câu trả lời đúng
            } else {
                falseResults++ //tắng số câu trả lời sai
                $('#question_' + id + ' > fieldset > div > label.' + choice + ' > span.false').css({ "display": "inline-block", "color": "red" }); //hiển thị đáp án sai
            }
            $('#question_' + id + ' > fieldset > div > label.' + answer + ' > span.check').css({ "display": "inline-block", "color": "green" }); //hiển thị đáp án đúng
        });
        result += `
        <table class="mt-2">
            <tbody>
                <tr>
                    <td class="text-left"><i class="fas fa-check"></i></td>
                    <td class="text-left">&nbsp;Số đáp án chọn đúng</td>
                    <td>:&nbsp;${trueResults}</td>
                    <td>/${trueResults+falseResults}</td>
                </tr>
                <tr>
                    <td class="text-left"><i class="fas fa-times"></i></td>
                    <td class="text-left">&nbsp;Số đáp án chọn sai</td>
                    <td>:&nbsp;${falseResults}</td>
                    <td>/${trueResults+falseResults}</td>
                </tr>
                <tr>
                    <td class="text-left"><i class="far fa-check-circle"></i></td>
                    <td class="text-left">&nbsp;Điểm của bạn là</td>
                    <td>:&nbsp;${scores}</td>
                    <td>/${trueResults+falseResults}</td>
                </tr>
            </tbody>
        </table>
        `
        $('#scores').html(result); //trả thẻ html về div chứa


        let scorePerCent = Math.round((trueResults / 10) * 100); //tính phần trăm câu đúng
        //console.log(scorePerCent);
        //console.log(trueResults);
        //lấy ảnh theo phần trăm câu đúng
        let img = (scorePerCent >= 80) ? "img/5.png" :
            (scorePerCent >= 60) ? "img/4.png" :
            (scorePerCent >= 40) ? "img/3.png" :
            (scorePerCent >= 20) ? "img/2.png" :
            "img/1.png";

        percent +=
            `<img class="mt-2" src=${img}>
            <p class="mb-0">Tỉ lệ đúng: ${scorePerCent}%</p>`;

        $('#percent').html(percent); //trả thẻ html về div chứa

    };

    //var scrollTop = $(window).scrollTop();
    //console.log(scrollTop);
    //hiển thị đồng hồ theo vị trí scroll
    $(window).scroll(function(e) {
        if (e.currentTarget.pageYOffset > 150) {
            $('#time2').addClass('fixed_scroll');
            $('#time2').css('display', 'block');
        } else {
            $('#time2').removeClass('fixed_scroll');
            $('#time2').css('display', 'none');
        }
    });

    // $('#result').submit(function(event) {
    //     $.ajax({
    //         method: $(this).attr('method'),
    //         url: $(this).attr('action'),
    //         data: $(this).serialize(),
    //         // other AJAX settings goes here
    //         // ..
    //     }).done(function(data) {
    //         alert('aaaaaaaa')
    //     });
    //     event.preventDefault();
    // });
});