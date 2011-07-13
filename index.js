/**
 * 
 */

$(function(){
	
	var options = {
		autostart: true,
		debug: false
	};
	
	$('#updateCustomSelectBox').click(function(e){
		e.preventDefault();
		
		$('#single-selecbox').updateCustomSelectBox();
	});
	
	$('#removeCustomSelectBox').click(function(e){
		e.preventDefault();
		
		$('#single-selecbox').removeCustomSelectBox();
	});
	
	$('#addCustomSelectBox').click(function(e){
		e.preventDefault();
		
		$('#single-selecbox').addCustomSelectBox();
	});
	
	$('#multipleUpdateCustomSelectBox').click(function(e){
		e.preventDefault();
		
		$('#multiple-selecbox').updateCustomSelectBox();
	});
	
	$('#multipleRemoveCustomSelectBox').click(function(e){
		e.preventDefault();
		
		$('#multiple-selecbox').removeCustomSelectBox();
	});
	
	$('#multipleAddCustomSelectBox').click(function(e){
		e.preventDefault();
		
		$('#multiple-selecbox').addCustomSelectBox();
	});
	
   $('.uiSelectBox').customInputs(options);
});