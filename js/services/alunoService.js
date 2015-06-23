app.factory("alunosAPI", function($http,$window){
	
	var _getAluno = function(){
		return	$http.get('https://api.backendless.com/v1/data/Alunos?pageSize=100',{

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







var _setTurma = function(turma){
		return $http.post('https://api.backendless.com/v1/data/Turmas',turma,{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}

		}).error(function(data){
			
			console.log(data);

		});
	}









	var _setAluno = function(aluno){
		return $http.post('https://api.backendless.com/v1/data/Alunos',aluno,{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}
			
		}).error(function(data){
			console.log(data);

		});
	}
	var _deleteAluno = function(objectId){
		return $http.delete('https://api.backendless.com/v1/data/Alunos/'+objectId, 
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
	var _updateAluno = function(objectId,aluno){
		return $http.put('https://api.backendless.com/v1/data/Alunos/'+objectId, aluno, 
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
		setAluno: _setAluno,
		getAluno: _getAluno,
		deleteAluno: _deleteAluno,
		updateAluno: _updateAluno

	};
});