//loader
$(window).load(function() {

	$(".loader").fadeOut("slow");
})
//header
// $(document).ready(function(){
//     $(window).scroll(function(){
//         var scrollTop = 1
//         if($(window).scrollTop() >= scrollTop){
//             $('header').addClass('headerFix');
//         }
//         if($(window).scrollTop() < scrollTop){
//             $('header').removeClass('headerFix');
//         }
//     })
// })


//signUpBox

$(function(){
	$('.signUpBox').hide();
	$('.signUpOpen').click(function(){
		$('.signUpBox').slideToggle();
		});
	});
