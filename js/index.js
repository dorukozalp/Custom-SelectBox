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
		
		$('#single-selecbox').customSelectBox('update');
	});
	
	$('#removeCustomSelectBox').click(function(e){
		e.preventDefault();
		
		$('#single-selecbox').customSelectBox('remove');
	});
	
	$('#addCustomSelectBox').click(function(e){
		e.preventDefault();
		
		$('#single-selecbox').customSelectBox('add');
	});
	
	$('#multipleUpdateCustomSelectBox').click(function(e){
		e.preventDefault();
		
		$('#multiple-selecbox').customSelectBox('update');
	});
	
	$('#multipleRemoveCustomSelectBox').click(function(e){
		e.preventDefault();
		
		$('#multiple-selecbox').customSelectBox('remove');
	});
	
	$('#multipleAddCustomSelectBox').click(function(e){
		e.preventDefault();
		
		$('#multiple-selecbox').customSelectBox('add');
	});
	
	$('#getMultipleValue').click(function(e){
		e.preventDefault();
		
		alert($('#multiple-selecbox').customSelectBox('value'));
	});
	
	$('#getSingleValue').click(function(e){
		e.preventDefault();
		
		alert($('#single-selecbox').customSelectBox('value'));
	});

    $('.uiSelectBox').customSelectBox(options);
});