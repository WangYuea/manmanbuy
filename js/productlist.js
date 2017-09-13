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
 getName(getUrl().categoryid);
    getList(getUrl().categoryid,getUrl().pageid)
});
function getName(categoryid){
    $.ajax({
        url:url+'api/getcategorybyid',
        data:{
            categoryid:categoryid
        },
        success:function(data){
            console.log(categoryid);
            var hrefs='<a href="productlist.html?categoryid='+categoryid+'">'+data.result[0].category+'</a> ';
            $('.title-name').html(hrefs);
        }
    })
}
function getList(categoryid,pageid){
    $.ajax({
        url:url+'api/getproductlist',
        data:{
            categoryid:categoryid,
            pageid:pageid
        },
        success:function(data){
            var productList=template('productList',data);
            $('.recommend').html(productList);
            var pageSize=data.pagesize;
            var total=data.totalCount;
            var page=Math.ceil(total/pageSize);
            var str='';
            for(var i=0;i<page;i++){
                if((i+1)==pageid){
                    str+=' <option value="'+(i+1)+'" selected>'+(i+1)+'/'+page+'</option>'
                }else{
                    str+=' <option value="'+(i+1)+'">'+(i+1)+'/'+page+'</option>'
                }
            }
            $('.select').html(str);
            $('.select').on('change',function(){
                window.location.href='productlist.html?categoryid='+categoryid+'&pageid='+$(this).val();
            });
            var pre='productlist.html?categoryid='+categoryid+'&pageid='+(+pageid-1);
            var next='productlist.html?categoryid='+categoryid+'&pageid='+(+pageid+1);
            if(pageid==1){
                 pre='productlist.html?categoryid='+categoryid+'&pageid=1';
            }
            if(pageid==page){
                 next='productlist.html?categoryid='+categoryid+'&pageid='+page;
            }
            $('.pre a').attr('href',pre);
            $('.next a').attr('href',next);
        }
    })
}