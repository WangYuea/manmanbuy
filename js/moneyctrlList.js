$(function(){
    function getUrl(){
        var obj={};
        var currentLink=window.location.href;
        var current=currentLink.indexOf('?');
        var category=currentLink.substr(current+1);
        var str=category.split('&');
        for(var i=0;i<str.length;i++){
            var item=str[i];
            var items=str[i].split('=');
            obj[items[0]]=items[1];
        }
        return obj;
    }
    getDomestic(getUrl().productid);
});
function getDomestic(productid){
    $.ajax({
        url:url+'api/getmoneyctrlproduct',
        data:{
            productid:productid
        },
        success:function(data){
        var getDomHtml=template('commentId',data);
            $('.proDomestic').html(getDomHtml);
            var countryHtml=template('countryId',data);
            $('.dom-coun').html(countryHtml);
            var getCommentHtml=template('pinglun',data);
            $('.comment').html(getCommentHtml);
        }
    })
}