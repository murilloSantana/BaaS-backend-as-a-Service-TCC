
app.factory("servicesAPI", function($http){

	var _getEndereco = function(cep){
		return $http.get('http://cep.correiocontrol.com.br/'+cep+'.json',

		{

			headers:{

				'Content-Type':'application/json'
			}

		})
	}

	var _getEnderecoProfAlu = function(){
		return $http.get('https://api.backendless.com/v1/data/Enderecos', 
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

	var _getRelatorioSemanal= function(){
		return $http.get('https://api.backendless.com/v1/data/Semanal', 
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
	
	var _setRelatorioSemanal = function(presencas){
		return $http.post(' https://api.backendless.com/v1/data/Semanal',presencas,{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}
			
		}).error(function(data){
			console.log(data);

		});
	}

	var _deleteRelatorioSemanal = function(objectId){
		return $http.delete('https://api.backendless.com/v1/data/Semanal/'+objectId, 
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

	var _getRelatorioTrimestral= function(){
		return $http.get('https://api.backendless.com/v1/data/Trimestral', 
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
	
	var _setRelatorioTrimestral = function(presencas){
		return $http.post(' https://api.backendless.com/v1/data/Trimestral',presencas,{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}
			
		}).error(function(data){
			console.log(data);

		});
	}
	var _deleteRelatorioTrimestral= function(objectId){
		return $http.delete('https://api.backendless.com/v1/data/Trimestral/'+objectId, 
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
	var _getRelatorioAnual= function(){
		return $http.get('https://api.backendless.com/v1/data/Anual', 
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
	
	var _setRelatorioAnual = function(presencas){
		return $http.post(' https://api.backendless.com/v1/data/Anual',presencas,{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}
			
		}).error(function(data){
			console.log(data);

		});
	}


	var _deleteRelatorioAnual = function(objectId){
		return $http.delete('https://api.backendless.com/v1/data/Anual/'+objectId, 
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

	var _setUsuario = function(usuario){
		return $http.post(' https://api.backendless.com/v1/users/register',usuario,{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}
			
		}).error(function(data){
			console.log(data);

		});
	}

	var _login = function(usuario){
		return $http.post(' https://api.backendless.com/v1/users/login',usuario,{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}

		}).error(function(data){
			console.log(data.code);
			if(data.code == 3006 || data.code == 3003){
				alert("login ou senha inválidas")
			}
		});
	}

	var _logout = function(exit){
		return $http.get('https://api.backendless.com/v1/users/logout',{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'user-token':exit.token,
				'Content-Type':'application/json',
			}
			
		}).error(function(data){
			console.log(data);

		});
	}

	var _getUsuario = function(usuario){
		return $http.get('https://api.backendless.com/v1/data/users',{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}

		}).error(function(data){
			console.log(data);

		});
	}
	
	var _updateUsuario = function(objectId,usuario){
		return $http.put('https://api.backendless.com/v1/data/users/'+objectId,usuario,{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'user-token':usuario['user-token'],
				'Content-Type':'application/json'
			}


		}).error(function(data){
			console.log(data);

		});
	}

	var _setLogados = function(logados){
		return $http.post(' https://api.backendless.com/v1/data/Logados',logados,{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}
			
		}).error(function(data){
			console.log(data);

		});
	}

	var _getLogados = function(){
		return $http.get(' https://api.backendless.com/v1/data/Logados',{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}
			
		}).error(function(data){
			console.log(data);

		});
	}

	var _updateLogados = function(objectId,logado){
		return $http.put(' https://api.backendless.com/v1/data/Logados/'+objectId,logado,{

			headers:{
				'application-id': '6FE67292-F413-9B0A-FF75-FD3594DF2300',
				'secret-key'    : '27C738CA-2AE7-F02B-FFCA-7BEC526B9A00',
				'Content-Type':'application/json'
			}
			
		}).error(function(data){
			console.log(data);

		});
	}
	var _getSenha = function(usuario){
		return $http.get(' https://api.backendless.com/v1/users/restorepassword/'+usuario,{

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
		getEndereco: _getEndereco,
		getEnderecoProfAlu: _getEnderecoProfAlu,
		deleteEndereco: _deleteEndereco,
		setUsuario: _setUsuario,
		login: _login,
		logout: _logout,
		getUsuario: _getUsuario,
		updateUsuario: _updateUsuario,
		setLogados: _setLogados,
		getLogados:_getLogados,
		getSenha: _getSenha,
		updateLogados: _updateLogados,
		setRelatorioSemanal: _setRelatorioSemanal,
		getRelatorioSemanal: _getRelatorioSemanal,
		deleteRelatorioSemanal: _deleteRelatorioSemanal,
		getRelatorioTrimestral: _getRelatorioTrimestral,
		setRelatorioTrimestral:_setRelatorioTrimestral,
		deleteRelatorioTrimestral:_deleteRelatorioTrimestral,
		getRelatorioAnual:_getRelatorioAnual,
		setRelatorioAnual:_setRelatorioAnual,
		deleteRelatorioAnual:_deleteRelatorioAnual
	};
})