
app.factory("turmasAPI", function($http,$window){
	
	var _getTurma = function(){
		return	$http.get('https://api.backendless.com/v1/data/Turmas?pageSize=100',{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}
			
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
	
	var _deleteTurma = function(objectId){
		return $http.delete('https://api.backendless.com/v1/data/Turmas/'+objectId, 
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
	var _updateTurma = function(objectId,turma){
		return $http.put('https://api.backendless.com/v1/data/Turmas/'+objectId, turma, 
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
	
	var _setTurmaProfessor = function(turmaProfessor){
		return $http.post('https://api.backendless.com/v1/data/TurmaProfessores',turmaProfessor,{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}

		}).error(function(data){
			console.log(data);

		});
	}
	
	var _getTurmaProfessor = function(){
		return	$http.get('https://api.backendless.com/v1/data/TurmaProfessores?pageSize=100',{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}
			
		}).error(function(data){
			console.log(data);

		});
	}

	var _updateTurmaProfessor = function(objectId,turmaProfessor){
		return $http.put('https://api.backendless.com/v1/data/TurmaProfessores/'+objectId, turmaProfessor, 
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

	var _deleteTurmaProfessor = function(objectId){
		return $http.delete('https://api.backendless.com/v1/data/TurmaProfessores/'+objectId, 
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

	var _pesquisarRelatorio = function(data){
		return $http.get("https://api.backendless.com/v1/data/Aulas?where=data%3D"+"'"+data+"'", 
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
		setTurma: _setTurma,
		getTurma: _getTurma,
		deleteTurma: _deleteTurma,
		updateTurma: _updateTurma,
		setTurmaProfessor: _setTurmaProfessor,
		setTurmaProfessor: _setTurmaProfessor,
		getTurmaProfessor: _getTurmaProfessor,
		deleteTurmaProfessor: _deleteTurmaProfessor,
		updateTurmaProfessor: _updateTurmaProfessor,
		pesquisarRelatorio: _pesquisarRelatorio
	};
})

