$(function(){
getBCJtitle();

});
//获取导航文字开始
function getBCJtitle(){
    $.ajax({
        url:url+'api/getbaicaijiatitle',
        success:function(data){
            var str='';
            for(var i=0;i<data.result.length;i++){
                //console.log(data.result[i].title)
                //i=0?'active':'';
                if(i==0){
                    str+=' <a href="javascript:;" data-titleid='+i+' class="active" >'+data.result[i].title+'</a>';
                }else{
                    str+=' <a href="javascript:;" data-titleid='+i+'>'+data.result[i].title+'</a>';
                }
            }
            $('.navCon').html(str);
            var arr=$('.navCon').children();
            arr.mouseenter(function(){
                $(this).addClass('active').siblings().removeClass('active');
                console.log($(this).attr('data-titleid'));
                getProductList($(this).attr('data-titleid'));
            });
            getProductList(0);
        }
    })
}
//获取导航文字结束
//获取产品开始
function getProductList(titleid ){
    titleid=titleid||0;
    $.ajax({
        url:url+'api/getbaicaijiaproduct',
        data:{titleid:titleid },
        success:function(data){
            var getProductHmtl=template('bcjId',data);
            $('.rec-list').html(getProductHmtl);
        }
    })
}
//获取产品结束
