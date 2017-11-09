const getData = ( id, optionalClass ) => {
	var data = {};
	var bool = true;
	$( id + ' :not(' + optionalClass + ')' +  ' input[type="text"]:not(#locationMaptipinpu):not(.noMustNeed)').each(function(index, ele){
		const name = $(ele).attr('name'),
			  value = $(ele).val();
		if(!value){
			bool = false;
			console.log('a')
			$(ele).css('background', 'rgba(255, 0, 0, 0.26)')
			return false;
		}else{
			$(ele).css('background', '')
		}
	    data[name] = value; 
	});

	if( bool ){
		$( id + ' ' + optionalClass +  ' input[type="text"]:not(#locationMaptipinpu)').each(function(index, ele){
			const name = $(ele).attr('name'),
				  value = $(ele).text();
		    data[name] = value;
		});
	}

	if( bool ){

		$( id + ' button.setWidth:not(.noMustNeed):not(' + optionalClass + ')' ).each(function(index, ele){
			const name = $(ele).attr('name'),
				  value = $(ele).text();
			if(!value){
				bool = false;
				console.log('b')
				$(ele).css('background', 'rgba(255, 0, 0, 0.26)')
				return false;
			}else{
				$(ele).css('background', '')
			}
		    data[name] = value;
		});
	}

	if( bool ){
		$( id + ' button.setWidth' + optionalClass ).each(function(index, ele){
			const name = $(ele).attr('name'),
				  value = $(ele).text();
		    data[name] = value;
		});
	}

	// if( bool ){
	// 	$( id + ' input:checked').each(function(index, ele){
	// 		const name = $(ele).attr('name'),
	// 			  value = $(ele).val() ? true : false;
	// 		console.log(name, value, $(ele).val() );
	// 		if(!value){
	// 			bool = false;
	// 			console.log('c')
	// 			$(ele).css('background', 'rgba(255, 0, 0, 0.26)')
	// 			return false;
	// 		}else{
	// 			$(ele).css('background', '');
	// 		}
	// 	    data[name] = value;
	// 	});
	// }

	if( bool ){
		$( id + ' textarea').each(function(index, ele){
			const name = $(ele).attr('name'),
				  value = $(ele).val();
			if(!value){
				bool = false;
				console.log('d')
				$(ele).css('background', 'rgba(255, 0, 0, 0.26)')
				return false;
			}else{
				$(ele).css('background', '')
			}
		    data[name] = value;
		});
	}

	if(!bool){
		return false;
	}

	//清空
	// $( id + ' input').val('');
	// $( id + ' textarea').val('');
	// $( id + ' .setWidth').text('');
	return data;
}

export default getData

