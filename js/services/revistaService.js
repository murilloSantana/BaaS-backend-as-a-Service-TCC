
app.factory("revistasAPI", function($http){

	var _getRevista = function(){
		return	$http.get('https://api.backendless.com/v1/data/Revistas?pageSize=100',{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}

		}).error(function(data){
			console.log(data);

		});
	}

	var _setRevista  = function(revista){
		return $http.post('https://api.backendless.com/v1/data/Revistas',revista,{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}

		}).error(function(data){
			console.log(data);

		});
	}

	var _deleteRevista  = function(objectId){
		return $http.delete('https://api.backendless.com/v1/data/Revistas/'+objectId, 
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

	
	
	var _updateRevista  = function(objectId,revista){
		return $http.put('https://api.backendless.com/v1/data/Revistas/'+objectId, revista, 
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
		setRevista : _setRevista ,
		getRevista : _getRevista,
		deleteRevista : _deleteRevista ,
		updateRevista : _updateRevista 
	};
})

