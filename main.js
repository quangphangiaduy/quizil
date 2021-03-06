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
        //$('#finish').hide(); //ẩn nút nộp bài
        $('#finish').remove(); //xóa nút nộp bài
    }

    //bắt đầu kiểm tra
    $('#start').click(function() {
        timeStart(); //bắt đầu đếm giờ
        $('.start-wrapper').hide(600); //ẩn nút bắt đầu
        //$('.start-wrapper').remove(); //xóa nút bắt đầu
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
                         <h6 class="mb-3" id="${value['id']}"><span class="correctanswer" style="display: none;"><i class="far fa-check-circle fa-sm"></i>&nbsp;</span><span class="wrongquestion" style="display: none;"><i class="far fa-times-circle fa-sm"></i>&nbsp;</span> <span style="font-weight:bold; text-decoration:underline; font-family: Orbitron">Câu ${serial}:</span> ${value['question']}</h6>
                         
                         <fieldset>
                         <div class="radio col-md-12 ">
                          <label class="A "><input type="radio" class="A" name="${value['id']}">&nbsp;<span style="font-weight:bold;">A. </span>${value['option_a']}<span class="check" style="display: none;">&nbsp;<i class="fas fa-check fa-sm"></i></span><span class="false" style="display: none;">&nbsp;<i class="fas fa-times fa-sm"></i></span></label>
                         </div>

                        <div class="radio col-md-12">
                           <label class="B "><input type="radio" class="B" name="${value['id']}">&nbsp;<span style="font-weight:bold;">B. </span>${value['option_b']}<span class="check" style="display: none;">&nbsp;<i class="fas fa-check fa-sm"></i></span><span class="false" style="display: none;">&nbsp;<i class="fas fa-times fa-sm"></i></span></label>
                         </div>

                         <div class="radio  col-md-12">
                           <label class="C "><input type="radio" class="C" name="${value['id']}">&nbsp;<span style="font-weight:bold;">C. </span>${value['option_c']}<span class="check" style="display: none;">&nbsp;<i class="fas fa-check fa-sm"></i></span><span class="false" style="display: none;">&nbsp;<i class="fas fa-times fa-sm"></i></span></label>
                         </div>

                         <div class="radio col-md-12">
                           <label class="D "><input type="radio" class="D" name="${value['id']}">&nbsp;<span style="font-weight:bold;">D. </span>${value['option_d']}<span class="check" style="display: none;">&nbsp;<i class="fas fa-check fa-sm"></i></span><span class="false" style="display: none;">&nbsp;<i class="fas fa-times fa-sm"></i></span></label>
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

        let img = '' //biến chứa src ảnh
        let rate = '' //đánh giá
        let scores = 0; //đếm điểm
        let result = ''; //kết quả tổng thể
        let percent = ''; //tỉ lệ trả lời đúng
        let trueResults = 0; //đếm câu trả lời đúng
        let falseResults = 0; //đếm câu trẩ lời sai
        let ignoredQuestion = 0; //đếm câu hỏi bị bỏ qua

        $('input[type="radio"]').prop('disabled', true); //disabled chọn đáp án

        $('#question_content div.result').each(function(index, value) {
            //console.log(index, value);
            let id = $(value).find('h6').attr('id'); //lấy id câu hỏi
            //console.log(id);
            let question = questions.find(x => x.id == id); //tìm câu hỏi trong mảng questions dựa vào id đã có ở trên
            // console.log(question);
            let answer = question['answer']; //lấy đáp án đúng của câu hỏi
            //console.log(answer);
            let choice = $(value).find('fieldset input[type="radio"]:checked').attr('class'); //lấy đáp án được chọn
            // console.log(choice);
            if (choice == answer) { //điều kiện đáp án đúng
                scores += 1; //mỗi câu đúng được cộng 1 điểm
                trueResults++ //tăng số câu trả lời đúng
                $('#question_' + id + '> h6 > span.correctanswer').css({ "display": "inline-block", "color": "green" }).addClass("animate__animated animate__wobble animate__slower animate__infinite"); //hiển thị câu hỏi trả lời đúng
            } else if (typeof choice === 'undefined' && choice !== answer) { //điều kiện câu hỏi bị bỏ qua
                ignoredQuestion++ //tắng số câu hỏi bị bỏ qua
                $('#question_' + id + ' > h6 > span.wrongquestion').css({ "display": "inline-block", "color": "red" }); //hiển thị câu hỏi bị bỏ qua
            } else if (choice !== answer) { //điều kiện đáp án sai  
                falseResults++ //tăng số câu trả lời sai
                $('#question_' + id + ' > h6 > span.wrongquestion').css({ "display": "inline-block", "color": "red" }); //hiển thị câu hỏi trả lời sai
                $('#question_' + id + ' > fieldset > div > label.' + choice + ' > span.false').css({ "display": "inline-block", "color": "red" }); //hiển thị đáp án sai
            }
            $('#question_' + id + ' > fieldset > div > label.' + answer + ' > span.check').css({ "display": "inline-block", "color": "green" }).addClass("animate__animated animate__tada animate__slow animate__infinite"); //hiển thị đáp án đúng

        });
        result += `
        <table class="mt-2">
            <tbody>
                <tr>
                    <td class="text-left"><i class="fas fa-square-root-alt"></i></td>
                    <td class="text-left">&nbsp;Số câu hỏi đã trả lời</td>
                    <td>:&nbsp;</td>
                    <td class="font_number">${trueResults+falseResults}</td>
                    <td>/</td>
                    <td class="font_number">${trueResults+falseResults+ignoredQuestion}</td>
                </tr>
                <tr>
                    <td class="text-left"></td>
                    <td class="text-left fontsize_14"><i class="fas fa-check"></i>&nbsp;Số đáp án chọn đúng</td>
                    <td>:&nbsp;</td>
                    <td class="font_number">${trueResults}</td>
                    <td>/</td>
                    <td class="font_number">${trueResults+falseResults}</td>
                </tr>
                <tr>
                    <td class="text-left"></td>
                    <td class="text-left fontsize_14 "><i class="fas fa-times"></i>&nbsp;&nbsp;Số đáp án chọn sai</td>
                    <td>:&nbsp;</td>
                    <td class="font_number">${falseResults}</td>
                    <td>/</td>
                    <td class="font_number">${trueResults+falseResults}</td>
                </tr>
                <tr>
                    <td class="text-left"><i class="far fa-times-circle"></i></td>
                    <td class="text-left">&nbsp;Số câu hỏi bị bỏ qua</td>
                    <td>:&nbsp;</td>
                    <td class="font_number">${ignoredQuestion}</td>
                    <td>/</td>
                    <td class="font_number">${trueResults+falseResults+ignoredQuestion}</td>
                </tr>
                <tr>
                    <td class="text-left"><i class="far fa-check-circle"></i></td>
                    <td class="text-left">&nbsp;Điểm của bạn là</td>
                    <td>:&nbsp;</td>
                    <td class="animate__animated animate__bounce animate__slower animate__infinite"><b class="font_red">${scores}</b></td>
                </tr>
            </tbody>
        </table>
        `
        $('#scores').html(result); //trả thẻ html về div chứa


        let scorePerCent = Math.round((trueResults / (trueResults + falseResults + ignoredQuestion)) * 100); //tính phần trăm câu đúng
        //console.log(scorePerCent);
        //console.log(trueResults);

        //lấy ảnh theo phần trăm câu đúng
        switch (scorePerCent) {
            case 100:
                img += "img/5.png";
                rate += "Làm tốt lắm!";
                break;
            case 90:
            case 80:
                img += "img/4.png";
                rate += "Làm tốt"
                break;
            case 70:
            case 60:
            case 50:
                img += "img/3.png";
                rate += "Tạm được"
                break;
            case 40:
            case 30:
            case 20:
                img += "img/2.png";
                rate += "Sai nhiều quá!"
                break;
            default:
                img += "img/1.png";
                rate += "Quá tệ!"
                break;
        }

        percent +=
            `<img class="mt-4" src=${img}>
            <p class="mb-0">Tỉ lệ đúng:<span class="score_PerCent font_number animate__animated animate__flash animate__infinite"> ${scorePerCent} </span>%</p>
            <p>${rate}</p> `;

        $('#percent').html(percent); //trả thẻ html về div chứa

        //sweet alert
        Swal.fire({
            imageUrl: `${img}`,
            title: `Điểm của bạn là&nbsp;<b class="font_number" style="color:red">${scores}</b>`,
            text: `${rate}`,
            confirmButtonText: 'Xem chi tiết',
            footer: '<a href="index.html">Không hài lòng với kết quả? Thử lại?</a>',
            backdrop: `rgba(0,0,0,0.95)`,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showClass: {
                popup: 'animate__animated animate__backInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__backOutDown'
            }
        })
    };

    //var scrollTop = $(window).scrollTop();
    //console.log(scrollTop);

    //HIỆU ỨNG
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
    //animate
    $('#finish').hover(function() {
        $(this).addClass("animate__animated animate__heartBeat");

    }, function() {
        $(this).removeClass("animate__animated animate__heartBeat");
    });

});