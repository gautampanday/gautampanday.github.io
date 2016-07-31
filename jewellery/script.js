
  // $(function() {
  //   // $( "#draggable" ).draggable({ axis: "y" });
  //   // $( "#draggable2" ).draggable({ axis: "x" });
 
  //  // $( "#pic" ).draggable({ containment: "#img_pos", scroll: false });
  //   // $( "#draggable4" ).draggable({ containment: "parent" });
  // } );


$(document).ready(function() {
  /*$("img.dropme").click(function(){
    var img_src =$(this).attr("src");

    $("#pic").attr("src",img_src);
     $("#pic").css("display","block");
     $(".zoomRanges").css("display","block");
  });*/


 $("#menu").click(function(){
        $('#sideBars').toggle('slide',{ direction: 'left'},'500');
        
  });
   $(".item img").click(function(){
    //alert("hi");
    //window.location.href = '';
     var img_src =$(this).attr("src");
    $("#foremark-tag").hide();
    $("#containment-wrapper1").show();
    $("#pic").attr("src",img_src);
     $("#pic").css("display","block");
     var back=window.location.href;
     $("#back-btns").attr("href",back);
     $(".zoomRanges").css("display","block");
   });




$("#pic").panzoom({
  $zoomRange: $(".zoom-range"),
  eventNamespace: '.panzoom',
  cursor: 'move',
   draggable  : true,
   contain: false
 // $zoomIn: $(".zoom-in"),
  //$zoomOut: $(".zoom-out"),
   //$reset: $(".reset")
});


});
