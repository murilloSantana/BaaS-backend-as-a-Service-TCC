
app.factory("trimestresAPI", function($http){

	var _getTrimestre = function(){
		return	$http.get('https://api.backendless.com/v1/data/Trimestres?pageSize=100',{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}

		}).error(function(data){
			console.log(data);

		});
	}

	var _setTrimestre  = function(trimestre){
		return $http.post('https://api.backendless.com/v1/data/Trimestres',trimestre,{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}

		}).error(function(data){
			console.log(data);

		});
	}

	var _deleteTrimestre  = function(objectId){
		return $http.delete('https://api.backendless.com/v1/data/Trimestres/'+objectId, 
		{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}

		}).error(function(data){
			console.log(data);

		});
	}

	
	
	var _updateTrimestre  = function(objectId,trimestre){
		return $http.put('https://api.backendless.com/v1/data/Trimestres/'+objectId, trimestre, 
		{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}

		}).error(function(data){
			console.log(data);

		});
	}
	

	return {
		setTrimestre : _setTrimestre ,
		getTrimestre : _getTrimestre,
		deleteTrimestre : _deleteTrimestre ,
		updateTrimestre : _updateTrimestre
	};
})