$(function(){
$('.category').on('click',' ul li a',function(){
    $(this).siblings('ul').toggle();
    $(this).parent().siblings('li').find('ul').css('display','none');
    var titleid=$(this).attr('data-title-id');
    console.log(titleid);
    getList(titleid,$(this));
})
    getTitle();

});

function getTitle(){
    $.ajax({
        url:url+'api/getcategorytitle',
        success:function(data){
            var titleHtml=template('categoryTitle',data);
            $('.category ul').html(titleHtml);
        }
    })
}
function getList(titleid,ele){
    if(ele.siblings('ul').children().length==0) {
        $.ajax({
            url: url + 'api/getcategory',
            data: {
                titleid: titleid
            },
            success: function (data) {
                var listHtml = template('categoryList', data);
                ele.siblings('ul').html(listHtml);
                var num = ele.siblings('ul').children().length % 3 || 3;
                ele.siblings('ul').children('li:nth-last-child(-n' + num + ')').css('border-bottom', 'none');
            }
        })
    }
}
