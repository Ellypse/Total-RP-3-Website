var images = ['stormwind.jpg', 'faol.jpg', 'lunarfall.jpg', 'ashran.jpg'];


$(function(){
	$('body').css({'background-image': 'url(images/backgrounds/' + images[Math.floor(Math.random() *      images.length)] + ')'});
});