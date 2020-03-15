

$('#avatar').on('change', function () {
    // console.log(this.files[0]);
    var formData = new FormData();

    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#preview').attr('src', response[0].avatar)
            // console.log(response);
            $('#hiddenAvatar').val(response[0].avatar)
        }
    })
})
$('#btnAdd').on('click', function () {
    var data = $('form').serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: data,
        success: function (res) {
           userArr.push(res);
           render();
            // 清空表单
        $('input[type="email"]').val('')
        $('input[name="nickName"]').val('')
        $('input[name="password"]').val('')
       $('#status1').prop('checked',false)
       $('#status2').prop('checked',false)
       $('#admin').prop('checked',false)
       $('#normal').prop('checked',false)
       $('#hiddenAvatar').val('')
       $('#preview').attr('src','../assets/img/default.png')
        },
        error: function () {
            alert('添加失败')
        }
    })

})

// 定义数组
let userArr = [];
$.ajax({
    url: '/users',
    type: 'get',
    sucess: function (res) {
        // console.log(res);
         let html = template('userTpl', {data: userArr})
        userArr = res;
        render();
       
    }
    
})
function render() {
    let html = template('userTpl', {data: userArr})
    // console.log(html);
    $('#userBox').html(html);  

}