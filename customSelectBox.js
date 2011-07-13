/*
 *  
 *  Custom SelectBox Plugin v0.1
 *  
 *  @requires jQuery v1.6.1
 *   
 *  Apache License 2.0
 *  http://www.apache.org/licenses/LICENSE-2.0
 * 
 *  @author Doruk Ozalp
 *  @date 2011/07/13
 */

//Create Closure
(function($) {
	
  //Define Plugin
  $.fn.customInputs = function( options ) {
	  
	var PLUGIN_NAMESPACE = 'customSelectBox';  
	  
	
	var opts = $.extend({}, $.fn.customInputs.defaults, options),
		doc = $(document),
   	  	multipleSelectionType = opts.multipleSelectionType,
   	  	multipleItemsContainer = opts.multipleItemsContainer,
   	  	optionItem = opts.optionItem,
   	  	optionClass = opts.optionClass,
   	    activeOptionClass = opts.activeOptionClass,
   	  	optionContainerClass = opts.optionContainerClass,
   	  	optionContainerWidth = opts.optionContainerWidth,
   	  	optionContainerHeight = opts.optionContainerHeight,
   	  	optionSliderPosition = opts.optionSliderPosition,
   	  	showCustomSlider = opts.showCustomSlider,
   	  	wrapperItemClass = opts.wrapperItemClass,
   	  	wrapperValueContainer = opts.wrapperValueContainer,
   		debug = function($obj) {
  		  if(opts.debug){
  		 	  try{
  				  if (window.console && window.console.log){
  					  window.console.log($obj);
  				  }
  			  }
  			  catch(err){
  			 	  
  			  }
  		  }
		},
		debugTime = function($obj) {
	  		if(opts.debug){
	  			try{
	  				  if (window.console && window.console.time){
	  					  window.console.time($obj);
	  					  window.console.log($obj + ' Started!');
	  				  }
	  			  }
	  			  catch(err){
	  			 	  
	  			  }
	  		}
		},
		debugTimeEnd = function($obj) {
	  		if(opts.debug){
	  			try{
	  				  if (window.console && window.console.time){
	  					  window.console.timeEnd($obj);
	  					  window.console.log($obj + ' Finished!');
	  				  }
	  			  }
	  			  catch(err){
	  			 	  
	  			  }
	  		}
		};
 	 	  
 	 debug('STARTED!');
 	 debug(opts);
	 
	//this refers to jQuery Object!
   
	return this.each(function() {
		
	 debug($(this));
	
	 //Global Variables For Plugin
	 var $this = $(this),
	 	 containerItem,
	 	 elementWidth = (typeof(opts.containerWidth) === 'undefined')? $this.outerWidth() : opts.containerWidth,
	 	 elementHeight = (typeof(opts.containerHeight) === 'undefined')? $this.outerHeight() : opts.containerHeight,
	 	 elementId = $this.attr('id'),
	 	 multiple = ($this.attr('multiple') === 'multiple' || $this.attr('multiple') === true)? true : false,
		 optionSlideContainerItem,
	 	 optionSliderArrowItem,
		 optionsContainerItem,
		 wrapperItem,
		 wrapperHTML,	 	 
		 selectBoxOptions = $this.children(),
		 selectBoxOptionsLength = selectBoxOptions.length,
		 wrapperOption,
		 wrapperText,
		 wrapperValue;
	 	 
	 	 debug('Width: ' + elementWidth);
		 debug('Height: ' + elementHeight);
		 debug("Multiple : " + multiple);
	 	 
	 $this.bind({
		add: function(method) {
			
			 //If Item is already customized do Mothing.
			 //No Support For Multiple SelectBoxes Yet!
			 if($this.data('custom') === true){
				 debug('Already Customized!');
				 return false;
			 }
			
			 debugTime(method.type);
			 
			 //Hide Current Item
			 $this.data('custom', true).hide();
			 
			 containerItem = $('<' + opts.containerItem + ' />'),
			 customOptions = [], //An Array Containing Custom Options List
			 optionSlideContainerItem = $('<' + opts.optionSliderContainerItem  + ' />'),
		 	 optionSliderArrowItem = $('<' + opts.optionSliderArrowItem  + ' />'),
			 optionsContainerItem = $('<' + opts.optionContainerItem  + ' />'),
			 wrapperItem = $('<' + opts.wrapperItem  + ' />'),
			 wrapperHTML = $('<' + opts.wrapperValueContainer  + ' />'),
			 wrapperOption = selectBoxOptions.filter(':selected'),
			 wrapperText = wrapperOption.text(),
			 wrapperValue = $this.val();
		 	 
			 //Set Container Items Here Start => A Bit Complicated Ehueheuheuh :D
			 containerItem
			 	.addClass(opts.containerClass)
			 	.attr('id', opts.containerItemIdPrefix+ '-' + elementId)
			 	.css({
				 	'width': (multiple === false)? elementWidth : 'auto',
				 	'height': (multiple === false)? elementHeight : 'auto',
				 	'line-height': (multiple === false)? elementHeight + 'px' : 'normal'
				 })
				.insertAfter($this);
			 
			 wrapperHTML
			 	.attr('id', opts.wrapperValueIdPrefix + '-' + elementId)
			 	.data('value', wrapperText)
			 	.text(wrapperText);
			 	
			 if(multiple === false){
				 wrapperItem
				 	.addClass(wrapperItemClass)
				 	.append(wrapperHTML)
				 	.attr('id', opts.wrapperItemIdPrefix + '-' + elementId)
				 	.css({
				 		'width': elementWidth,
				 		'height': elementHeight,
				 		'line-height': elementHeight + 'px'
				 	})
				 	.data('state', false);
			 }
			 	
			 if(showCustomSlider === true && multiple === false){
				 
				debug("Show Slider :" + showCustomSlider);
				 
			    var optionSlideContainerItemClasses = [],
			    	optionSliderArrowItemClasses = [];
			    
			    optionSlideContainerItemClasses.push(opts.optionSliderClass);
			    optionSlideContainerItemClasses.push(optionSliderPosition);
			    
			    optionSliderArrowItemClasses.push(opts.optionSliderArrowClass);
			    optionSliderArrowItemClasses.push(optionSliderPosition);
			    optionSliderArrowItemClasses.push(opts.optionSliderArrowPosition);
				 
				optionSlideContainerItem.addClass(optionSlideContainerItemClasses.join(" "));
				optionSliderArrowItem.addClass(optionSliderArrowItemClasses.join(" "));
				
				optionSliderArrowItem.insertAfter(wrapperHTML);
				optionSlideContainerItem.insertAfter(wrapperHTML);
			 }
			 
			 //Add Wrapper Item To Main Container
			 if(multiple === false){
				 containerItem.html(wrapperItem);
			 }
			 
			 //Set Container Items Here End
			
			 //Set Custom Options Start
			 var i = 0;
			 
			 while(i < selectBoxOptionsLength){
			
				 var option = $(selectBoxOptions[i]),
				 	 value = option.val(),
				 	 text = option.text();
				 
				 if(multiple === true){
					 switch(multipleSelectionType){
		 				case 'checkBox':
		 					
		 					var checked = 'checked';
		 					
		 					if($.inArray(value, wrapperValue) !== -1){
		 						customOptions.push('<' + optionItem + ' tabIndex="'+i+'" data-selected="true" data-value="'+value+'" class="'+optionClass+'">');
		 					}else{
		 						customOptions.push('<' + optionItem + ' tabIndex="'+i+'" data-selected="false" data-value="'+value+'" class="'+optionClass+'">');
		 						checked = false;
		 					}
		 					
		 					customOptions.push('<'+multipleItemsContainer+'>');
		 					customOptions.push('<input type="checkbox" id="'+optionClass+'_'+value+'" name="'+optionClass+'[]" value="'+value+'"');
		 					if(checked !== false){
		 						customOptions.push(' checked="checked"')
		 					}
		 					customOptions.push(' />');
		 					customOptions.push('</'+multipleItemsContainer+'>');
		 					customOptions.push('<'+multipleItemsContainer+'>' + text + '</'+multipleItemsContainer+'>');
		 					customOptions.push('</'+optionItem+'>');
		 				break;
					 }
				 }else{
					 if(wrapperValue == value){
						 customOptions.push('<' + optionItem + ' tabIndex="'+i+'" data-selected="true" data-value="'+value+'" class="'+ activeOptionClass + ' ' + optionClass+'">'+text+'</'+optionItem+'>');
					 }else{
						 customOptions.push('<' + optionItem + ' tabIndex="'+i+'" data-selected="false" data-value="'+value+'" class="'+optionClass+'">'+text+'</'+optionItem+'>');
					 }
				 }
				 
				 i++;
			 }
			 
			 customOptions = customOptions.join('');
			 
			 //FIXME: Find a Solution ASAP!
			 if (optionItem === 'li'){
				 customOptions = '<ul>'+customOptions+'</ul>';
			 }
			 
			 //Append Custom Options to Custom Option Container
			 optionsContainerItem
			 	.addClass(optionContainerClass)
			 	.attr('id', opts.optionsItemIdPrefix + '-' + elementId)
			 	.css({
			 		'top': (multiple === false)? elementHeight : 0,
			 		'width': elementWidth + optionContainerWidth,
			 		'height': optionContainerHeight,
			 		'overflow-x': 'hidden',
			 		'overflow-y': 'auto'
			 	})
			 	.data('multiple', multiple)
			 	.html(customOptions);
			 
			 if(multiple === false){
				 optionsContainerItem.hide();
			 }
			 
			//Append Custom Option Container to Main Container Item
			 containerItem.append(optionsContainerItem);
			 
			 //Set Custom Options End
			 
			 //Click Event For Option Container
			 optionsContainerItem.bind('click.'+PLUGIN_NAMESPACE, function(e){
				 e.stopPropagation();
			 });
			 //Click Event For Option Container
			 
			 //Click Event For Wrapper
			 wrapperItem.bind('click.'+PLUGIN_NAMESPACE,function(e) {
				 e.stopPropagation();
				 
				 var currentState = wrapperItem.data('state');
				 
				 debug('Current State: ' + currentState);
				 
				 switch(currentState){
				 	case true: //open => close menu
				 		$this.closeCustomSelectBox();
				 	break;
				 	case false: //closed => open menu
				 		$this.openCustomSelectBox();
				 	break;
				 }
			 });
			 //Click Event For Wrapper
			 
			 function setSelectBoxValue(value) {
				$this.val(value);
			 	$this.trigger('change.'+PLUGIN_NAMESPACE);
			 	
			 	opts.onChange.call();
			 }
			 
			 //Click Events For Custom Options
			 optionsContainerItem.children().bind('click.'+PLUGIN_NAMESPACE, function(e) {
				 e.stopPropagation();
				 
				 var option = $(this),
				 	 optionValue = option.data('value');
				 
				 switch(multiple){
				 	case false:
				 		setSelectBoxValue(optionValue);
				 		wrapperHTML.text(optionValue);
				 		$this.closeCustomSelectBox();
				 	break;
				 	case true:
				 		
				 		var checkBox = $('#' + optionClass + '_' + optionValue);
				 		
				 		if(!checkBox.prop('checked')){
				 			checkBox.prop('checked', true);
				 		}else{
				 			checkBox.prop('checked', false);
				 		}
				 		
				 		optionValue = [];
				 		
				 		optionCheckBoxes.filter(':checked').each(function(){
				 			optionValue.push($(this).val());
				 		});
				 		
				 		setSelectBoxValue(optionValue);
				 	break;
				 }
			 });
			 
			 
			 if(multiple === true){
				 var optionCheckBoxes = optionsContainerItem.find("input[type='checkbox']");
			 
				 optionCheckBoxes.bind('change.'+PLUGIN_NAMESPACE, function(e){
					 e.stopPropagation();
					 
					 var checkBox = $(this),
					 	 optionValue = [];
			
					 //BUG? Something is wrong here..Have no idea...
			 		 if(checkBox.prop('checked')){
			 			checkBox.prop('checked', true);
			 		 }else{
			 			checkBox.prop('checked', false);
			 		 }
			 		
			 		optionCheckBoxes.filter(':checked').each(function(){
			 			optionValue.push($(this).val());
			 		});
			 		 
			 		setSelectBoxValue(optionValue);
				 });
				 
				 optionCheckBoxes.bind('click.'+PLUGIN_NAMESPACE, function(e){
					 e.stopPropagation();
				 });
			 }
			 
			 //Click Events For Custom Options
			 
			//Keyboard Events For Document (Not For Multiple Selects)
			 
			 //Document Click Event
			if(multiple === false){
				doc.bind('click.'+PLUGIN_NAMESPACE, function(e) {
					if(e.button == 0 && optionsContainerItem.is(':visible')){					
						$this.closeCustomSelectBox();
					}
				});
			}
			
			//TODO: Somehow Add Keyboard Support For Multiple Selects?
			if(opts.keyboardEvents === true && multiple === false){
				doc.bind('keydown.'+PLUGIN_NAMESPACE, function(e) {
					
					e.stopPropagation();
					
					if(optionsContainerItem.is(':visible') && wrapperItem.data('state') === true){
						
						var currentOption = optionsContainerItem.children("[data-selected='true']"),
							targetOption = null;
						
						//TODO: Add More Keyboard Codes
						debug("Keyboard Code: " + e.which);
						
						switch(e.which){
							case 40: //DOWN
								targetOption = currentOption.next(optionItem);
								
								if(targetOption.length === 0){
									targetOption = optionsContainerItem.children(':first');
								}
								break;
							case 38: //UP
								targetOption = currentOption.prev(optionItem);
								
								if(targetOption.length === 0){
									targetOption = optionsContainerItem.children(':last');
								}
								break;
							case 13: //ENTER / RETURN
							case 27: // ESC
								$this.closeCustomSelectBox();
								break;
						}
						
						if(targetOption !== null){
							currentOption.attr('data-selected', "false").removeClass('active');
							targetOption.attr('data-selected', "true").addClass('active');
						
							setSelectBoxValue(targetOption.data('value'));
							
							var topPosition = targetOption.attr('tabindex') * targetOption.outerHeight();
							
							if(topPosition >= optionContainerHeight){
								var scrollPosition = topPosition;
							}else{
								var scrollPosition = 0;
							}
							
							optionsContainerItem.animate({
								scrollTop: topPosition
							}, 10, function(){
								//Animate Complete!
							});
						}
					}
				});
			}
			
			//Keyboard Events For Document
			
			//CallBack
			opts.onAdd.call();
			
			 debug(optionsContainerItem);
			 debug(wrapperItem);
			 debug(containerItem);
			 debugTimeEnd(method.type);
		},//End Add
		open: function(method) {
			debugTime(method.type);
			
			wrapperItem.data('state', true);
	 		optionsContainerItem.show(opts.optionContainerOpenEffect, opts.optionContainerOpenEasingEffect, function(){
	 			//CallBack
	 			opts.onOpen.call();
	 		});
	 		
	 		debug('Opened!');
	 		debugTimeEnd(method.type);
		},//End Open
		close: function(method) {
			debugTime(method.type);
			
			wrapperItem.data('state', false);
	 		optionsContainerItem.hide(opts.optionContainerCloseEffect, opts.optionContainerCloseEasingEffect, function(){
	 			//CallBack
	 			opts.onClose.call();
	 		});
	 		
	 		debug('Closed!');
	 		debugTimeEnd(method.type);
		},//End Close
		remove: function(method) {
			 debugTime(method.type);
			 
			 //Remove Container
			 containerItem.remove();
			 $this.data('custom', false).show();
			 
			 //Remove Document Events As Well!
			 doc.unbind('click.'+PLUGIN_NAMESPACE);
			 doc.unbind('keydown.'+PLUGIN_NAMESPACE);
			 
			 //CallBack
			 opts.onRemove.call();
			 
			 debug('Removed!');
			 debugTimeEnd(method.type);
		},//End Remove
		//TODO: add Update Method
		update: function(method) {
			 debugTime(method.type);
			 
			 //CallBack
			 opts.onRemove.call();
			 
			 debug('Updated!');
			 debugTimeEnd(method.type);
		}//End Update
	 });
	 
	 if(opts.autostart === true){
		 try{
			 $this.addCustomSelectBox();
		 }catch(err){
			 debug('----------EXCEPTION----------');
			 debug(err);
			 debug('----------EXCEPTION----------');
		 }
	 }
	 
	debug('COMPLETED!');
	});//For Chainability End Each	
  };
  
  //Global Close Method
  $.fn.closeCustomSelectBox = function() {
	$(this).trigger('close');  
  };
  
  //Global Open Method
  $.fn.openCustomSelectBox = function() {
	$(this).trigger('open');  
  };
 
  //Global Add Method
  $.fn.addCustomSelectBox = function() {
	$(this).trigger('add');  
  };
  
  //Global Remove Method
  $.fn.removeCustomSelectBox = function() {
	$(this).trigger('remove');  
  };
  
  //Global Update Method
  $.fn.updateCustomSelectBox = function() {
	$(this).trigger('update');  
  };
  
  //Define Default Options as Property
  $.fn.customInputs.defaults = {
	 autostart: true,
	 debug: false,
	 keyboardEvents: true,
	 activeOptionClass : 'active',
	 containerWidth: 90,
	 containerHeight: 20,
	 containerItemIdPrefix: 'container',
	 containerItem: 'div',
	 containerClass: 'uiCustomContainer',
	 multipleSelectionType: 'checkBox',
	 multipleItemsContainer: 'span',
	 optionContainerItem : 'div', 
	 optionContainerClass : 'uiCustomOptionContainer',
	 optionContainerWidth: 40,
	 optionContainerHeight: 110,
	 optionContainerCloseEffect: 'fast',
	 optionContainerOpenEffect: 'fast',
	 optionContainerCloseEasingEffect : 'swing',
	 optionContainerOpenEasingEffect : 'swing',
	 optionClass : 'uiCustomOption',
	 optionItem: 'div',
	 optionSliderContainerItem: 'span',
	 optionSliderClass: 'uiCustomSlider',
	 optionSliderPosition: 'rightSide',
	 optionSliderArrowItem: 'span',
	 optionSliderArrowClass: 'uiCustomSliderArrow',
	 optionSliderArrowPosition: 'down',
	 optionsItemIdPrefix: 'options',
	 showCustomSlider: true,
	 wrapperItem: 'div',	 
	 wrapperValueContainer: 'span',
	 wrapperItemClass: 'uiCustomWrapper',
	 wrapperValueIdPrefix: 'value',
	 wrapperItemIdPrefix: 'wrapper',
	 //CallBack Function
	 onAdd: function(){},
	 onOpen: function(){},
	 onClose: function(){},
	 onChange: function(){},
	 onRemove: function(){},
	 onUpdate: function(){}
  };
 //end of closure
})( jQuery );