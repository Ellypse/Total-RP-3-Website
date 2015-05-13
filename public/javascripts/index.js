$(function(){
	var background = backgrounds_images[Math.floor(Math.random() * backgrounds_images.length)];
	$('body').css({'background-image': 'url(images/backgrounds/' + background + ')'});
});