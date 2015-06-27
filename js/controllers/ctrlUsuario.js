app.controller('ctrlUsuario', function ($scope,servicesAPI,$window,$timeout) {

	$scope.contador;
	$scope.cargos = ["Secretária","Superintendente","Pastor"]
	
	$scope.salvarUsuario = function(usuario){

		if($scope.usuarios != null){
			var verificaEmail = $scope.usuarios.filter(function(elemento){
				return elemento.email == usuario.email;
			})
			var verificaLogin = $scope.usuarios.filter(function(elemento){
				return elemento.login == usuario.login;
			})
		}
		if(verificaEmail.length > 0 ){
			alert("Já existe um usuário cadastrado com esse email")
		}else if(verificaLogin.length > 0){
			alert("Já existe um usuário cadastrado com esse login")

		}else{
			usuario={
				"name":usuario.nome,
				"login":usuario.login,
				"email":usuario.email,
				"password":usuario.senha,
				"cargo":usuario.cargo
			}
			servicesAPI.setUsuario(usuario).success(function (data) {
				$scope.sucessoUserSave = true;
				$timeout(function() {
					$scope.sucessoUserSave= false
				}, 2000);
				$timeout(function() {
					$scope.mudar = !$scope.mudar
					$scope.usuario = []
					window.location.reload();
				}, 2000);
			}).error(function(data){
				$scope.erroUserSave = true;
				$timeout(function() {
					$scope.erroUserSave= false
				}, 3000);
			});				
		}
	};

	$scope.logar = function(usuario){

		var existe = false;
		usuario={
			"login":usuario.login,
			"password":usuario.senha,
		}
		for(var i = 0; i < $scope.logados.length; i++){
			if($scope.logados[i].ip == getIP() && $scope.logados[i].logado == true){
				
				$scope.erroUserLogadoTrue = true;
				$timeout(function() {
					$scope.erroUserLogadoTrue = false
				}, 3000);
				$window.location.reload();
				existe = true;
				break;
			}
		}
		if(!existe){
			servicesAPI.login(usuario).success(function (data) {
				$scope.logado = data;
				$scope.carregarUsuarios();
				logados={
					"usuariosLogados":data,
					"token":data['user-token'],
					"ip":getIP(),
					"logado": true

				}
				servicesAPI.setLogados(logados).success(function(){
					$(window.document.location).attr('href',"/Tcc/index.html#/aluno"); 
				})	
			}).error(function(data){
				$scope.erroUserLogado = true;
				$timeout(function() {
					$scope.erroUserLogado= false
				}, 3000);
			});		

		}
	};

	$scope.carregarUsuarios = function(){
		servicesAPI.getUsuario().success(function(response,data){
			$scope.usuarios = response.data;
		});
	};

	$scope.carregarLogados = function(){
		servicesAPI.getLogados().success(function(response,data){
			$scope.logados = response.data;
			console.log(response.data);
			$scope.user = $scope.logados.filter(function(elemento) {
				if(elemento.logado == true) return elemento.usuariosLogados;
			});	
		});
	};

	function getIP(){
		if(window.XMLHttpRequest) pegar_ip=new window.XMLHttpRequest
			else pegar_ip=new ActiveXObject('Microsoft.XMLHttp');

		pegar_ip.open("GET","http://api.hostip.info/get_html.php",false);
		pegar_ip.send();
		auxIp = pegar_ip.responseText.split("\n");
		for (i=0; auxIp.length >= i; i++) {  
			ip = auxIp[i].split(":");  
			if ( ip[0] == "IP" ) return ip[1];  
		}  
		return false;  
	}  

	$scope.sair= function(){

		for(var i = 0; i <$scope.usuarios.length;i++){
			for(var y = 0; y <$scope.logados.length;y++){
				if(getIP() == $scope.logados[y].ip && $scope.logados[y].logado == true ){
					exit = $scope.logados[y];
					var contador = y;
					break;
				}
			}

		}
		servicesAPI.logout(exit).success(function (data) {

			logado={
				"logado":false
			}
			servicesAPI.updateLogados($scope.logados[contador].objectId,logado).success(function(){
				$(window.document.location).attr('href',"/Tcc/index.html#/login"); 

			});

		});	
	}

	$scope.recuperarSenha = function(usuario){

		servicesAPI.getSenha(usuario.login).success(function(data){
			alert("Uma nova senha foi enviada para seu email")
			$scope.limpaForm();
		});
	}

	$scope.limpaForm = function(usuario){
		$scope.usuario = []
		$(window.document.location).attr('href',"/Tcc/index.html#/login"); 

	}
	$scope.trocar = function(usuario){
		$scope.mudar = !$scope.mudar
		$scope.usuario = []
	}
	$scope.edit = function(){
		$(window.document.location).attr('href',"/Tcc/index.html#/configuracao"); 


	}


	$scope.editarUsuario = function(usuario){

		usuario={
			"email":$scope.user[0].usuariosLogados.email,
			"cargo":$scope.user[0].usuariosLogados.cargo
		}
		servicesAPI.updateUsuario($scope.user[0].usuariosLogados.objectId, usuario).success(function(){
			
			$scope.sucessoUserEdit = true;
			$timeout(function() {
				$scope.sucessoUserEdit= false
			}, 2000);
			$timeout(function() {
				$(window.document.location).attr('href',"/Tcc/index.html#/aluno"); 
			}, 1000);
		}).error(function(data){
			$scope.erroUserEdit = true;
			$timeout(function() {
				$scope.erroUserEdit= false
			}, 3000);
		});

	}

	$scope.cancelarConfig = function(){
		$(window.document.location).attr('href',"/Tcc/index.html#/aluno"); 

	}
	$scope.carregarUsuarios();
	$scope.carregarLogados();
});