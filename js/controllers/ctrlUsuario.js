app.controller('ctrlUsuario', function ($scope,servicesAPI,$window) {

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
				$window.alert("Usuário cadastrado com sucesso")
				$scope.mudar = !$scope.mudar

				$scope.usuario = []
				$(window.document.location).attr('href',"/Tcc/index.html#/login"); 

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
				alert("Já existe um usuário logado neste computador!")
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

				});

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
			"password":$scope.user[0].usuariosLogados.senha,
			"cargo":$scope.user[0].usuariosLogados.cargo
		}
		servicesAPI.updateUsuario($scope.user[0].usuariosLogados.objectId, usuario).success(function(){
			alert("Editado com sucesso")
			$(window.document.location).attr('href',"/Tcc/index.html#/aluno"); 

		});
	}

	$scope.cancelarConfig = function(){
		$(window.document.location).attr('href',"/Tcc/index.html#/aluno"); 

	}
	$scope.carregarUsuarios();
	$scope.carregarLogados();
});