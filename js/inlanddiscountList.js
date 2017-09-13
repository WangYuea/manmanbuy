$(function () {
    function getUrl() {
        var obj = {};
        var currentLink = window.location.href;
        var current = currentLink.indexOf('?');
        var category = currentLink.substr(current + 1);
        var str = category.split('&');
        for (var i = 0; i < str.length; i++) {
            var item = str[i];
            var items = str[i].split('=');
            obj[items[0]] = items[1];
        }
        return obj;
    }

    inlanddiscountList(getUrl().productid)
});
function inlanddiscountList(productid) {
    $.ajax({
        url:url+'api/getdiscountproduct',
        data:{productid:productid},
        success:function(data){
            var getIdHtml=template('discountId',data);
       $('.proDomestic').html(getIdHtml);
            var getCountryHtml=template('discountCountry',data);
            $('.dom-coun').html(getCountryHtml);
        var getCommentHtml=template('discountComment',data);
            $('.comment').html(getCommentHtml);
        }
    })
}
