
$(function () {
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

    getList(getUrl().pageid);
});
function getList(pageid){
    pageid=pageid||1;
    $.ajax({
        url:url+'api/getmoneyctrl',
        data:{
            pageid:pageid
        },
        success: function (data) {
            var listHtml=template('saveList',data);
            $('.rec-list').html(listHtml);
            var pageSize=data.pagesize;
            //console.log(pageSize);
            var total=data.totalCount;
            var page=Math.ceil(total/pageSize);
            var option='';
            for(var i=0;i<page;i++){
                if((i+1)==pageid){
                    option+=' <option value="'+(i+1)+'" selected>'+(i+1)+'/'+page+'</option>';
                }else{
                    option+=' <option value="'+(i+1)+'">'+(i+1)+'/'+page+'</option>';
                }
            }
            $('.select').html(option);
            $('.select').on('change',function(){
                //pageid=$(this).val();
                window.location.href='moneyctrl.html?pageid='+$(this).val();
            })
var pre='moneyctrl.html?pageid='+(+pageid-1);
            var next='moneyctrl.html?pageid='+(+pageid+1);
            if(pageid==1){
                pre='moneyctrl.html?&pageid=1';
            }
            if(pageid==page){
                next='moneyctrl.html?&pageid='+page;
            }

            $('.pre a').attr('href',pre);
            $('.next a').attr('href',next);
        }
    })
}