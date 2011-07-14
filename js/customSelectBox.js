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
  $.fn.customSelectBox = function( method ) {
	  
	var PLUGIN_NAMESPACE = 'customSelectBox', 
		PLUGIN_DEFAULTS = {
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
	   	},
	   	$this = this,
	   	Document = $(document),
	   	debug = function($obj) {
			  if($this.data('opts').debug === true){
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
	  		if($this.data('opts').debug === true){
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
			if($this.data('opts').debug === true){
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
		
	var methods = {
		init : function( options ){
			
			var  $this = $(this);
			
			$this.data('opts', $.extend({}, PLUGIN_DEFAULTS, options));
			
			if($this.data('opts').autostart === true){
				return this.each(function(){
					$(this).customSelectBox('add');
				});
			}
		},
		add : function(){
			
			debugTime('Add');
			
			//this refers to jQuery Object!
			   
			return this.each(function() {
				
				var  $this = $(this),
					 opts = $this.data('opts'),
					 
					 activeOptionClass = opts.activeOptionClass,
					 containerItem = $('<' + opts.containerItem + ' />'),
			   	  	 customOptions = [], //An Array Containing Custom Options List
			   	  	 elementId = $this.attr('id'),
			   	 	 elementWidth = (typeof(opts.containerWidth) === 'undefined')? $this.outerWidth() : opts.containerWidth,
					 elementHeight = (typeof(opts.containerHeight) === 'undefined')? $this.outerHeight() : opts.containerHeight,
					 multiple = ($this.attr('multiple') === 'multiple' || $this.attr('multiple') === true)? true : false,
					 multipleSelectionType = opts.multipleSelectionType,
			   	  	 multipleItemsContainer = opts.multipleItemsContainer,
			   	  	 optionClass = opts.optionClass,
			   	  	 optionItem = opts.optionItem,
			   	  	 optionContainerClass = opts.optionContainerClass,
			   	  	 optionContainerHeight = opts.optionContainerHeight,
			   	  	 optionsContainerItem = $('<' + opts.optionContainerItem  + ' />'),
			   	  	 optionContainerWidth = opts.optionContainerWidth,
			   	  	 optionSliderContainerItem = $('<' + opts.optionSliderContainerItem  + ' />'),
			   	  	 optionSliderPosition = opts.optionSliderPosition,
			   	 	 optionSliderArrowItem = $('<' + opts.optionSliderArrowItem  + ' />'),
				 	 selectBoxOptions = $this.children(),
					 selectBoxOptionsLength = selectBoxOptions.length,
				  	 showCustomSlider = opts.showCustomSlider,
			   	  	 wrapperItemClass = opts.wrapperItemClass,
			   	  	 wrapperValueContainer = opts.wrapperValueContainer,
			   	 	 wrapperItem = $('<' + opts.wrapperItem  + ' />'),
					 wrapperHTML = $('<' + opts.wrapperValueContainer  + ' />'), 	 
					 wrapperOption = selectBoxOptions.filter(':selected'),
					 wrapperText = wrapperOption.text(),
					 wrapperValue = $this.val();
			 
			 debug($this);
			 debug('Width: ' + elementWidth);
			 debug('Height: ' + elementHeight);
			 debug('Multiple : ' + multiple);
			 
			 //SET PLUGIN NAMESPACE DATA
			 $this.data(PLUGIN_NAMESPACE, {
				 'containerItem': containerItem,
				 'wrapperItem': wrapperItem,
				 'optionsContainerItem': optionsContainerItem
			 });
			//SET PLUGIN NAMESPACE DATA
			 
				 //If Item is already customized do Mothing.
				 //No Support For Multiple SelectBoxes Yet!
				 if($this.data('custom') === true){
					 debug('Already Customized!');
					 return false;
				 }
			 
			 	//Hide Current Item
			 	$this.data('custom', true).hide();
			 
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
					 
						debug('Show Slider :' + showCustomSlider);
						 
					    var optionSliderContainerItemClasses = [],
					    	optionSliderArrowItemClasses = [];
					    
					    optionSliderContainerItemClasses.push(opts.optionSliderClass);
					    optionSliderContainerItemClasses.push(optionSliderPosition);
					    
					    optionSliderArrowItemClasses.push(opts.optionSliderArrowClass);
					    optionSliderArrowItemClasses.push(optionSliderPosition);
					    optionSliderArrowItemClasses.push(opts.optionSliderArrowPosition);
						 
						optionSliderContainerItem.addClass(optionSliderContainerItemClasses.join(' '));
						optionSliderArrowItem.addClass(optionSliderArrowItemClasses.join(' '));
						
						optionSliderArrowItem.insertAfter(wrapperHTML);
						optionSliderContainerItem.insertAfter(wrapperHTML);
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
						 		$this.customSelectBox('close');
						 	break;
						 	case false: //closed => open menu
						 		$this.customSelectBox('open');
						 	break;
						 }
					 });
					 //Click Event For Wrapper
					 
					 function setSelectBoxValue(value) {
						 
						debug('Value Set: ' + value); 
						 
						$this.val(value);
					 	$this.trigger('change.'+PLUGIN_NAMESPACE);
					 	
					 	opts.onChange.call();
					 }
					 
					 //Click Events For Custom Options
					 optionsContainerItem.children().bind('click.'+PLUGIN_NAMESPACE, function(e) {
						 debugTime('Option Change');
						 e.stopPropagation();
						 
						 var option = $(this),
						 	 optionValue = option.data('value');
						 
						 switch(multiple){
						 	case false:
						 		setSelectBoxValue(optionValue);
						 		wrapperHTML.text(optionValue);
						 		$this.customSelectBox('close');
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
						 debugTimeEnd('Option Change');
					 });
					 
					 
					 if(multiple === true){
						 var optionCheckBoxes = optionsContainerItem.find("input[type='checkbox']");
					 
						 optionCheckBoxes.bind('change.'+PLUGIN_NAMESPACE, function(e){
							 debugTime('Option Change');
							 e.stopPropagation();
							 
							 var checkBox = $(this),
							 	 optionValue = [];
							 
							 //TODO: FIX THE BUG!!
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
					 		debugTimeEnd('Option Change');
						 });
						 
						 optionCheckBoxes.bind('click.'+PLUGIN_NAMESPACE, function(e){
							 e.stopPropagation();
						 });
					 }
					 
					 //Click Events For Custom Options
					 
					//Keyboard Events For Document (Not For Multiple Selects)
					 
					 //Document Click Event
					if(multiple === false){
						Document.bind('click.'+PLUGIN_NAMESPACE, function(e) {
							if(e.button == 0 && optionsContainerItem.is(':visible')){					
								$this.customSelectBox('close', opts, wrapperItem, optionsContainerItem);
							}
						});
					}
					
					//TODO: Somehow Add Keyboard Support For Multiple Selects?
					if(opts.keyboardEvents === true && multiple === false){
						Document.bind('keydown.'+PLUGIN_NAMESPACE, function(e) {
							
							e.stopPropagation();
							
							if(optionsContainerItem.is(':visible') && wrapperItem.data('state') === true){
								
								var currentOption = optionsContainerItem.children("[data-selected='true']"),
									targetOption = null;
								
								//TODO: Add More Keyboard Codes
								debug('Keyboard Code: ' + e.which);
								
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
									currentOption.attr('data-selected', 'false').removeClass('active');
									targetOption.attr('data-selected', 'true').addClass('active');
								
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
					 debugTimeEnd('Add');
			});
		},
		close : function(wrapperItem, optionsContainerItem){
			debugTime('Close');
			
			var $data = $this.data(PLUGIN_NAMESPACE),
				opts = $this.data('opts');
			
			$data.wrapperItem.data('state', false);
	 		$data.optionsContainerItem.hide(opts.optionContainerCloseEffect, opts.optionContainerCloseEasingEffect, function(){
	 			//CallBack
	 			opts.onClose.call();
	 		});
	 		
	 		debug('Closed!');
	 		debugTimeEnd('Close');
		},
		open : function(){
			debugTime('Open');

			var $data = $this.data(PLUGIN_NAMESPACE),
				opts = $this.data('opts');
			
			$data.wrapperItem.data('state', true);
			$data.optionsContainerItem.show(opts.optionContainerOpenEffect, opts.optionContainerOpenEasingEffect, function(){
	 			//CallBack
	 			opts.onOpen.call();
	 		});
	 		
	 		debug('Opened!');
	 		debugTimeEnd('Open');
		},
		remove : function(){
			 debugTime('Remove');
			 //Remove Container
			 
			 var $data = $this.data(PLUGIN_NAMESPACE),
			 	 opts = $this.data('opts');
			 
			 $data.containerItem.remove();
			 $this.data('custom', false).show();
			 
			 //Remove Plugin Namespace Data As Well!
			 $this.removeData(PLUGIN_NAMESPACE);
			 
			 //Remove Document Events As Well!
			 Document.unbind('click.'+PLUGIN_NAMESPACE);
			 Document.unbind('keydown.'+PLUGIN_NAMESPACE);
			 
			 //CallBack
			 opts.onRemove.call();
			 
			 debug('Removed!');
			 debugTimeEnd('Remove');
		},
		update : function(){
			 debugTime('Update');
			 //CallBack
			 opts.onUpdate.call();
			 
			 debug('Updated!');
			 debugTimeEnd('Update');
		}
	};
	
 	 // Method calling logic
     if ( methods[method] ) {
       return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
     } else if ( typeof method === 'object' || ! method ) {
       return methods.init.apply( this, arguments );       
     } else {
       $.error( 'Method ' +  method + ' does not exist' );
     }
  };
 //End Of Closure
})( jQuery );