app.factory("aulasAPI", function($http,$window){
	
	var _getAula = function(){
		return	$http.get('https://api.backendless.com/v1/data/Aulas?pageSize=100',{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}
		}).success(function(data){
			console.log(data);
		}).error(function(data){
			console.log(data);

		});
	}

	var _setAula = function(aula){
		return $http.post('https://api.backendless.com/v1/data/Aulas',aula,{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}
			
		}).error(function(data){
			console.log(data);

		});
	}
	var _deleteAula = function(objectId){
		return $http.delete('https://api.backendless.com/v1/data/Aulas/'+objectId, 
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
	var _updateAula = function(objectId,aula){
		return $http.put('https://api.backendless.com/v1/data/Aulas/'+objectId, aula, 
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
		setAula: _setAula,
		getAula: _getAula,
		deleteAula: _deleteAula,
		updateAula: _updateAula

	};
});