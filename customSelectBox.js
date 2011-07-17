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
	   	Document = $(document),
	   	$this = this,
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
		},
		generateCustomOptions = function(){
			
			debugTime('Custom Options');
			
			//Set Custom Options Start
		 	var $data = $this.data(PLUGIN_NAMESPACE),
			 	activeOptionClass = $data.activeOptionClass,
			 	customOptions = new Array(), //An Array Containing Custom Options List
			 	i = 0,
			 	multipleItemsContainer = $data.multipleItemsContainer,
			 	multipleSelectionType = $data.multipleSelectionType,
			 	optionClass = $data.optionClass,
			 	optionItem = $data.optionItem,
			 	selectBoxOptions = $this.children(),
			 	selectBoxOptionsLength = selectBoxOptions.length,
			 	wrapperValue = $this.val();
			 	
			 while(i < selectBoxOptionsLength){
			
				 var option = $(selectBoxOptions[i]),
				 	 value = option.val(),
				 	 text = option.text();
				 
				 if($data.multiple === true){
					 switch(multipleSelectionType){
		 				case 'checkBox':
		 					
		 					var checked = 'checked',
		 						selected = true;
		 					
		 					if($.inArray(value, wrapperValue) == -1){
		 						selected = false;
		 						checked = false;
		 					}
		 					
		 					customOptions.push('<' + optionItem + ' tabIndex="'+i+'" data-selected="'+selected+'" data-value="'+value+'" class="'+optionClass+'">');
		 					
		 					customOptions.push('<'+multipleItemsContainer+'>');
		 					customOptions.push('<input type="checkbox" id="'+optionClass+'_'+value+'" name="'+optionClass+'[]" value="'+value+'"');
		 					
		 					if(checked !== false){
		 						customOptions.push(' checked="checked"');
		 					}
		 					
		 					customOptions.push(' />');
		 					customOptions.push('</'+multipleItemsContainer+'>');
		 					customOptions.push('<'+multipleItemsContainer+'>' + text + '</'+multipleItemsContainer+'>');
		 					customOptions.push('</'+optionItem+'>');
		 				break;
					 }
				 }else{
					 
					 var optSelected = true,
					 	 optClass = activeOptionClass + ' ' + optionClass;
					 
					 if(wrapperValue !== value){
						 optSelected = false;
						 optClass = optionClass;
					 }
					 
					 customOptions.push('<' + optionItem + ' tabIndex="'+i+'" data-selected="'+optSelected+'" data-value="'+value+'" class="'+optClass+'">'+text+'</'+optionItem+'>');
				 }
				 
				 i++;
			 }
			 
			 debugTimeEnd('Custom Options');
			 
			 //FIXME: Find a Solution ASAP!
			 if (optionItem === 'li'){
				 return '<ul>'+customOptions.join('')+'</ul>';
			 }else{
				 return customOptions.join('');
			 }
		},
		setSelectBoxValue = function (value) {
			
			debugTime('Set SelectBox Value');
			debug('Value Set: ' + value); 
			 
			$this.val(value).trigger('change.'+PLUGIN_NAMESPACE);
		 	$this.data('opts').onChange.apply();
		 	
		 	debugTimeEnd('Set SelectBox Value');
		},
		bindEventsToCustomOptions = function(){
			
			debugTime('Bind Events To Custom Options');
			
			var $data = $this.data(PLUGIN_NAMESPACE),
				multiple = $data.multiple,
				optionsContainerItem = $data.optionsContainerItem;
			
			//Change Event For Multiple Selectboxes
			 if(multiple === true){
				 var optionCheckBoxes = optionsContainerItem.find("input[type='checkbox']");
			 
				 optionCheckBoxes.bind('change.'+PLUGIN_NAMESPACE, function(e){
					 debugTime('Option Change');
					 e.stopPropagation();
					 
					 var checkBox = $(this),
					 	 optionValue = new Array();
					 
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
			//Change Event For Multiple Selectboxes
			 
			 //Click Events For Custom Options
			 optionsContainerItem.children().bind('click.'+PLUGIN_NAMESPACE, function(e) {
				 debugTime('Option Change');
				 e.stopPropagation();
				 
				 var currentOption = $(this),
				 	 optionValue = currentOption.data('value');
				 
				 switch(multiple){
				 	case false:
				 		setSelectBoxValue(optionValue);
				 		$data.wrapperHTML.text(optionValue);
				 		$this.customSelectBox('close');
				 	break;
				 	case true:
				 		
				 		var checkBox = $('#' + $data.optionClass + '_' + optionValue);
				 		
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
			 
			 //Click Events For Custom Options
			
			debugTimeEnd('Bind Events To Custom Options');
		},
		
		methods = {
		init : function( options ){
			
				return this.each(function(){
					
					$this = $(this);
					
					$this.data('opts', $.extend({}, PLUGIN_DEFAULTS, options));
					
					//If Item is not a select tag do nothing
					if(!$this.is('select')){
						debug('Element is Not a Select Tag!');
						debug($this);
						debugTimeEnd('init');
						return false;
					}
					
					var opts = $this.data('opts');
					
						 debugTime('init');
						
						 //SET PLUGIN NAMESPACE DATA
						 $this.data(PLUGIN_NAMESPACE, {
							 'activeOptionClass': opts.activeOptionClass,
							 'containerItem': $('<' + opts.containerItem + ' />'),
							 'multiple': ($this.attr('multiple') === 'multiple' || $this.attr('multiple') === true)? true : false,
							 'multipleItemsContainer': opts.multipleItemsContainer,
							 'multipleSelectionType': opts.multipleSelectionType,
							 'optionClass': opts.optionClass,
					   	  	 'optionItem': opts.optionItem,
							 'optionsContainerItem': $('<' + opts.optionContainerItem  + ' />'),
							 'optionSliderContainerItem': $('<' + opts.optionSliderContainerItem  + ' />'),
							 'optionSliderArrowItem': $('<' + opts.optionSliderArrowItem  + ' />'),
							 'wrapperItem': $('<' + opts.wrapperItem  + ' />'),
							 'wrapperHTML': $('<' + opts.wrapperValueContainer  + ' />')
					    });
						//SET PLUGIN NAMESPACE DATA
						 
						 debugTimeEnd('init');
						 
						 if(opts.autostart === true){
							 
							 $(this).customSelectBox('add');
						 }
				});
		},
		add : function(){
			
			//this refers to jQuery Object!
			   
			return this.each(function() {
				
				$this = $(this);
				
				debugTime('Add');
				
				debugTime('Set Variables');
				
				var  $data = $this.data(PLUGIN_NAMESPACE),
					 opts = $this.data('opts'),
					 
					 containerItem = $data.containerItem,
			   	  	 elementId = $this.attr('id'),
			   	 	 elementWidth = (typeof(opts.containerWidth) === 'undefined')? $this.outerWidth() : opts.containerWidth,
					 elementHeight = (typeof(opts.containerHeight) === 'undefined')? $this.outerHeight() : opts.containerHeight,
					 multiple = $data.multiple,
			   	  	 optionContainerClass = opts.optionContainerClass,
			   	  	 optionContainerHeight = opts.optionContainerHeight,
			   	  	 optionsContainerItem = $data.optionsContainerItem,
			   	  	 optionContainerWidth = opts.optionContainerWidth,
			   	  	 optionSliderContainerItem = $data.optionSliderContainerItem,
			   	  	 optionSliderPosition = opts.optionSliderPosition,
			   	 	 optionSliderArrowItem = $data.optionSliderArrowItem,
			   	 	 optionItem = $data.optionItem,
				 	 showCustomSlider = opts.showCustomSlider,
			   	  	 wrapperItemClass = opts.wrapperItemClass,
			   	  	 wrapperValueContainer = opts.wrapperValueContainer,
			   	 	 wrapperItem = $data.wrapperItem,
					 wrapperHTML = $data.wrapperHTML, 	 
					 wrapperText = $this.children(':selected').text();
					 
				 debugTimeEnd('Set Variables');
					 
				 debug($this);
				 debug('Width: ' + elementWidth);
				 debug('Height: ' + elementHeight);
				 debug('Multiple : ' + multiple);
			 
				 //If Item is already customized do nothing.
				 if($this.data('custom') === true){
					 debug('Already Customized!');
					 debugTimeEnd('Add');
					 return false;
				 }
				 
				//If Item is not a select tag do nothing
				if(!$this.is('select')){
					debug('Element is Not a Select Tag!');
					debugTimeEnd('Add');
					return false;
				}
			 
				debugTime('Hide Current SelectBox And Prepare Container');
				 
			 	//Hide Current Item
			 	$this.data('custom', true).hide();
			 
				 //Set Container Items Here Start => A Bit Complicated Ehueheuheuh :D
				 containerItem
				 	.addClass(opts.containerClass)
				 	.attr('id', opts.containerItemIdPrefix+ '-' + elementId)
				 	.css({
				 	 	'width': (multiple === false)? elementWidth : elementWidth + optionContainerWidth,
					 	'height': (multiple === false)? elementHeight : optionContainerHeight,
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
						 
					    var optionSliderContainerItemClasses = new Array(),
					    	optionSliderArrowItemClasses = new Array();
					    
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
					 
					debugTimeEnd('Hide Current SelectBox And Prepare Container');
					 
					//Set Custom Options Start
					var customOptions = generateCustomOptions();
					//Set Custom Options Start
					
					debugTime('Append Custom Options To Container');
					 
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
					 
					 debugTimeEnd('Append Custom Options To Container');
					 
					 debugTime('Bind Events To Containers');
					 
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
					 
					 debugTimeEnd('Bind Events To Containers');
					 
					 //Bind Events
					 bindEventsToCustomOptions();
					 //Bind Events
					 
					 debugTime('Bind Events To Document');
					 
					 //Document Click Event
					if(multiple === false){
						Document.bind('click.'+PLUGIN_NAMESPACE, function(e) {
							if(e.button == 0 && optionsContainerItem.is(':visible')){					
								$this.customSelectBox('close');
							}
						});
					}
					
					//Keyboard Events For Document (Not For Multiple Selects)
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
										$this.customSelectBox('close');
										break;
								}
								
								if(targetOption !== null){
									currentOption.attr('data-selected', 'false').removeClass('active');
									targetOption.attr('data-selected', 'true').addClass('active');
									
									var targetOptionValue = targetOption.data('value'),
										topPosition = targetOption.attr('tabindex') * targetOption.outerHeight(),
										scrollPosition = 0;
								
									setSelectBoxValue(targetOptionValue);
									wrapperHTML.text(targetOptionValue);
									
									if(topPosition >= optionContainerHeight){
										scrollPosition = topPosition;
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
					
					debugTimeEnd('Bind Events To Document');
					
					//Keyboard Events For Document
					
					//CallBack
					 debug("Callback For Add");
					 opts.onAdd.apply();
					
					 debug(optionsContainerItem);
					 debug(wrapperItem);
					 debug(containerItem);
					 debugTimeEnd('Add');
			});
		},
		close : function(){
			
			debugTime('Close');
			
			if( $this.data('custom') === true){
			
				var $data = $this.data(PLUGIN_NAMESPACE),
					opts = $this.data('opts');
				
				if(!$data.multiple){
					$data.wrapperItem.data('state', false);
			 		$data.optionsContainerItem.hide(opts.optionContainerCloseEffect, opts.optionContainerCloseEasingEffect, function(){
			 			//CallBack
			 			debug("Callback For Close");
			 			opts.onClose.apply();
			 		});
				}
				
				debug('Closed!');
			}else{
				debug("Element is not Customized!");
			}
	 		
	 		debugTimeEnd('Close');
		},
		open : function(){
			
			debugTime('Open');
			
			if( $this.data('custom') === true){

				var $data = $this.data(PLUGIN_NAMESPACE),
					opts = $this.data('opts');
				
				if(!$data.multiple){
					$data.wrapperItem.data('state', true);
					$data.optionsContainerItem.show(opts.optionContainerOpenEffect, opts.optionContainerOpenEasingEffect, function(){
						//CallBack
						debug("Callback For Open");
						opts.onOpen.apply();
					});
				}
				
				debug('Opened!');
			}else{
				debug("Element is not Customized!");
			}
	 		
	 		debugTimeEnd('Open');
		},
		remove : function(){
			
			 debugTime('Remove');
			 //Remove Container
			 
			 if( $this.data('custom') === true){
			 
				 var $data = $this.data(PLUGIN_NAMESPACE),
				 	 opts = $this.data('opts');
				 
				 $data.containerItem.remove();
				 $this.data('custom', false).show();
				 
				 //Remove Document Events As Well!
				 Document.unbind('click.'+PLUGIN_NAMESPACE);
				 Document.unbind('keydown.'+PLUGIN_NAMESPACE);
				 
				 //CallBack
				 debug("Callback For Remove");
				 opts.onRemove.apply();
			 
				 debug('Removed!');
			 }else{
				 debug("Element is not Customized!");
			 }
			 debugTimeEnd('Remove');
		},
		update : function(){
			
			 debugTime('Update');
			 
			 if( $this.data('custom') === true){
			 
				 var $data = $this.data(PLUGIN_NAMESPACE),
			 	 	 opts = $this.data('opts'),
			 	 	 value = $this.val(),
			 	 	 customOptions = generateCustomOptions();
				 
				 debug("Value: " + value);
				 
				 if(!$data.multiple){
					 $data.wrapperHTML.text(value).data('value', value);
				 }
				 
				 $data.optionsContainerItem.html(customOptions);
				 
				 //Bind Events Again 
				 bindEventsToCustomOptions();
				 //Bind Events Again
				 
				 //CallBack
				 debug("Callback For Update");
				 opts.onUpdate.apply();
				 
				 debug('Updated!');
			 }else{
				 debug("Element is not Customized!");
			 }
			 
			 debugTimeEnd('Update');
		},
		value : function(){
			return $this.val();
		}
	};
	
	 //Copy Paste From jQuery's Plugin Documentation :)	
	 
	 try{
	 	 // Method calling logic
	     if ( methods[method] ) {
	       return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	     } else if ( typeof method === 'object' || ! method ) {
	       return methods.init.apply( this, arguments );       
	     } else {
	       $.error( 'Method ' +  method + ' does not exist' );
	     }
	 }catch(Exception){
		 
		 	 try{
				  if (window.console && window.console.log){
					  window.console.warn('==========Exception==========');
					  window.console.error(Exception);
					  window.console.info("Message : " + Exception.message);
					  window.console.info("File: " + Exception.fileName + ':' + Exception.lineNumber);
					  window.console.warn('==========Exception==========');
				  }
			  }
			  catch(err){
			 	  //ignore
			  }
	 }
  };
 //End Of Closure
})( jQuery );