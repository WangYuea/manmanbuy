$(function(){
$('.drop-down').on('click',function(){
    $(this).find('i').toggleClass('active');
    $(this).siblings().find('i').removeClass('active');
    var index=$(this).index();
    $('.gsSearch').find('i').removeClass('glyphicon-remove');
    $('.searchCon').hide();
   $('.gsContent>div').eq(index).toggle().siblings().hide();
})
$('.gsSearch').on('click',function(){
    $('.drop-down').find('i').removeClass('active');
    $('.gsContent>div').hide();
    $(this).find('i').toggleClass('glyphicon-remove');
    $('.searchCon').toggle();
});
    getShop();
    getShopArea();
    getPsProduct(1,1);
    //console.log(getShop())
});
function getShop(){
    $.ajax({
        url:url+'api/getgsshop',
        success:function(data){
        var str='';
            data.result.forEach(function(item,i){
                str+=' <li class="drop-down" data-shopid="'+item.shopId+'"><a href="javascript:;" class=" '+(i==0?"active":"")+'" >'+item.shopName+'<i></i></a></li>'
            })
            $('.shop ul').html(str);
    }
    })
}
function getShopArea(){
    $.ajax({
        url:url+'api/getgsshoparea',
        success:function(data){
            var str='';
            data.result.forEach(function(item,i){
                str+=' <li class="drop-down" data-areaid="'+item.areaId+'"><a href="javascript:;" class=" '+(i==0?"active":"")+'" >'+item.areaName+'<i></i></a></li>'
            })
            $('.gsCountry ul').html(str);
        }
    })
}
function getPsProduct(shopid,areaid ){
    shopid=shopid||1;
    areaid=areaid||1;
    $.ajax({
        url:url+'api/getgsproduct',
        data:{
            shopid:shopid,
            areaid:areaid
        },
        success:function(data){
        var getProcducts=template('gsProduct',data);
            $('.gsProduct .container .row').html(getProcducts);
        }
    })
}
