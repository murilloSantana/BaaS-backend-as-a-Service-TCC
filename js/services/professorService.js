
app.factory("professoresAPI", function($http){

	var _getProfessor = function(){
		return	$http.get('https://api.backendless.com/v1/data/Professores?pageSize=100',{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}

		}).error(function(data){
			console.log(data);

		});
	}

	var _setProfessor = function(professor){
		return $http.post('https://api.backendless.com/v1/data/Professores',professor,{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}

		}).error(function(data){
			console.log(data);

		});
	}

	var _deleteProfessor = function(objectId){
		return $http.delete('https://api.backendless.com/v1/data/Professores/'+objectId, 
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

	var _deleteEndereco = function(objectId){
		return $http.delete('https://api.backendless.com/v1/data/Enderecos/'+objectId, 
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
	var _updateProfessor = function(objectId,professor){
		return $http.put('https://api.backendless.com/v1/data/Professores/'+objectId, professor, 
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
		setProfessor: _setProfessor,
		getProfessor: _getProfessor,
		deleteProfessor: _deleteProfessor,
		updateProfessor: _updateProfessor,
		deleteEndereco : _deleteEndereco 

	};
})

