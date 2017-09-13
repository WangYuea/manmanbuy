$(function(){
 getDiscount();
});
function getDiscount(){
    $.ajax({
        url:url+'api/getinlanddiscount',
        success:function(data){
            var getdiscountHtml=template('inlanddiscount',data);
            $('.discountList .container .row').html(getdiscountHtml);
        }
    })
}