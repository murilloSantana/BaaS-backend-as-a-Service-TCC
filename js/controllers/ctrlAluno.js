
app.controller('ctrlAluno', function ($scope,alunosAPI,servicesAPI,turmasAPI,$window,$timeout,aulasAPI) {
	$scope.currentPage = 1;
	$scope.pageSize= 10;
	$scope.alunos = [];
	$scope.enderecos = [];
	$scope.turmas= [];
	$scope.perPagePresets = [10,15,25,50];
	$scope.alunosInscritos=[];

	$scope.carregarAluno = function(){
		alunosAPI.getAluno().success(function (response) {
			$scope.alunos = response.data;
		});

	};
	$scope.carregarTurma = function(){
		turmasAPI.getTurma().success(function (response) {
			$scope.turmas = response.data;
			console.log(response.data);

		});
	};

	$scope.carregarAula = function(){
		aulasAPI.getAula().success(function (response) {
			$scope.aulas = response.data;

		});
	};
	
	$scope.excluirAluno = function(aluno){
		servicesAPI.deleteEndereco(aluno.aluEndereco.objectId).success(function (response,data) {
			$scope.carregarAluno();


			console.log(data);
		});
		alunosAPI.deleteAluno(aluno.objectId).success(function (response,data) {

			$scope.sucessoAluDel = true;
			$timeout(function() {
				$scope.sucessoAluDel= false
			}, 2000);
			$timeout(function() {
				$scope.carregarAluno();
			}, 1000);
		}).error(function(data){
			$scope.erroAluDel = true;
			$timeout(function() {
				$scope.erroAluDel= false
			}, 3000);
		});
	}
	$scope.inscreverAlunos = function(){
		$scope.alunosInscritos=[]

		for(var j = 0; j < $scope.alunos.length; j++){
			if($scope.alunos[j].selecionado == undefined || $scope.alunos[j].selecionado == false ){
				$scope.alunosInscritos.push($scope.alunos[j])
			}
		}
		if($scope.alunosInscritos.length < 1){
			$scope.erroAluDisponivel = true;
			$timeout(function() {
				$scope.erroAluDisponivel= false
			}, 3000);

		}

	};

	$scope.editarTurma = function(turma,aluno){
		var alunosSelecionados = $scope.alunosInscritos.filter(function (aluno) {
			if (aluno.selecionado) return aluno;
		});


		for(var i = 0; i< alunosSelecionados.length;i++){
			turma={
				"aluTurma":alunosSelecionados[i]


			}


			turmasAPI.updateTurma($scope.turma.objectId,turma).success(function(response,data){
				
				$scope.sucessoAluInscrito = true;
				$timeout(function() {
					$scope.sucessoAluInscrito= false
				}, 2000);
				$timeout(function() {
					$window.location.reload();

					$scope.encaminhar();
				}, 1000);
			}).error(function(data){
				$scope.erroAluInscrito = true;
				$timeout(function() {
					$scope.erroAluInscrito= false
				}, 3000);
			})

		}
	}

	$scope.editarAluno = function(aluno){
		servicesAPI.deleteEndereco(aluno.aluEndereco.objectId).success(function (response,data) {
			$scope.carregarAluno();

		});


		aluno={
			"__meta":aluno.__meta,
			"objectId":aluno.objectId,
			"nome":aluno.nome,
			"dtNascimento":aluno.date,
			"telefone":aluno.telefone,
			"aluEndereco": 
			{
				"___class":"Enderecos",
				"cep":$scope.enderecos.cep,
				"bairro":$scope.enderecos.bairro,
				"municipio":$scope.enderecos.localidade,
				"rua":$scope.enderecos.logradouro,
				"complemento": $scope.enderecos.complemento,

			},

		}
		alunosAPI.updateAluno(aluno.objectId,aluno).success(function(response,data){
			
			$scope.sucessoAluEdit = true;
			$timeout(function() {
				$scope.sucessoAluEdit= false
			}, 2000);
			$timeout(function() {
				$window.location.reload();
			}, 1000);
		}).error(function(data){
			$scope.erroAluEdit = true;
			$timeout(function() {
				$scope.erroAluEdit= false
			}, 3000);
		});

	}

	$scope.mudaBtn = function(){
		$scope.salva= true;
		$scope.edita = false;
		$scope.mostraFrequencia = false;

		// $scope.mudarTur = false;


	}

	$scope.edit = function(aluno){
		$scope.aluno =  aluno;
		data = new Date(aluno.dtNascimento)
		$scope.aluno.date = data;
		$scope.enderecos = aluno.aluEndereco;
		$scope.enderecos.logradouro = aluno.aluEndereco.rua;
		$scope.enderecos.localidade = aluno.aluEndereco.municipio;
		$scope.enderecos.complemento = aluno.aluEndereco.complemento;
		$scope.edita = true;
		$scope.salva = false;
		// $scope.mudarTur = false;
		$scope.mostraFrequencia = false;

	}

	// $scope.editMudarTurma = function(){
	// 	$scope.mudarTur = true;
	// 	$scope.edita = false;
	// 	$scope.salva = false;
	// }

	$scope.limpaForm = function(){
		delete $scope.cep;
		delete $scope.enderecos;
		delete $scope.aluno;
		$scope.alunoForm.$setPristine();

	};


	$scope.saveAluno = function(aluno,enderecos){
		enderecos = $scope.enderecos;

		aluno={
			"nome":aluno.nome,
			"dtNascimento":aluno.date,
			"telefone":aluno.telefone,
			"aluEndereco": 

			{
				"___class":"Enderecos",
				"cep":enderecos.cep,
				"bairro":enderecos.bairro,
				"UF":enderecos.uf,
				"municipio":enderecos.localidade,
				"rua":enderecos.logradouro,
				"complemento": enderecos.complemento,

			},


		}
		alunosAPI.setAluno(aluno).success(function(data){
			$scope.sucessoAluSave = true;
			$timeout(function() {
				$scope.sucessoAluSave= false
			}, 2000);
			$timeout(function() {
				$window.location.reload();
			}, 1000);
		}).error(function(data){
			$scope.erroAluSave = true;
			$timeout(function() {
				$scope.erroAluSave= false
			}, 3000);
		});
	};
	$scope.encaminhar = function(){
		$(window.document.location).attr('href',"/Tcc/index.html#/aluno"); 
	}


	$scope.atualizaCep = function(cep){

		if($scope.aluno.aluEndereco.cep.length == 8){
			servicesAPI.getEndereco(cep).success(function (response) {
				$scope.enderecos = response;

			}).error(function(data){
				$scope.achouCep = true;
				$timeout(function() {
					$scope.achouCep= false
				}, 3000);


			});
		}
	};

	$scope.mudarTurma = function(aluno,turma){
		var achado;
		$scope.novo=[];
		$scope.turmaAchada=[]
		for (var i = 0; i < $scope.turmas.length; i++) {
			for (var y = 0; y < $scope.turmas[i].aluTurma.length; y++) {
				if($scope.turmas[i].aluTurma[y].objectId == aluno.objectId){
					$scope.turmaAchada.push($scope.turmas[i])
					$scope.cont = i;
					$scope.contador = y;
					achado = true;
					break;

				}
			}
		}
		if(!achado){
			$scope.naoCadastrado = true;
			$timeout(function() {
				$scope.naoCadastrado= false
				$window.location.reload()

			}, 2000);
		}


		for(var i=0;i<$scope.turmas.length;i++){

			$scope.turmas[i].aluTurma.filter(function(elemento){
				if(elemento.objectId != aluno.objectId && $scope.turmas[i].objectId == $scope.turmaAchada[0].objectId ){

					return $scope.novo.push(elemento)
				}
			})
		}
		console.log($scope.novo);
		

		turma={
			"aluTurma":$scope.novo,
			"__meta":$scope.turmas[$scope.cont].__meta

		}
		aluno={
			"selecionado":false
		}

		alunosAPI.updateAluno($scope.turmas[$scope.cont].aluTurma[$scope.contador].objectId,aluno).success(function(response,data){
			console.log(data);
		}).error(function(data){
			$scope.erroAluMudar = true;
			$timeout(function() {
				$scope.erroAluMudar= false
			}, 3000);
		})

		turmasAPI.updateTurma($scope.turmas[$scope.cont].objectId,turma).success(function(response,data){

			$scope.sucessoAluMudar = true;
			$timeout(function() {
				$scope.sucessoAluMudar= false
			}, 2000);
			$timeout(function() {
				$window.location.reload();
			}, 1000);
		}).error(function(data){
			$scope.erroAluMudar = true;
			$timeout(function() {
				$scope.erroAluMudar= false
			}, 3000);
		});

}


$scope.frequencia = function(aluno){
	$scope.aulasAlu=[]
	$scope.aulasTurma=[]
	$scope.alunosFalta=[]
	$scope.mostraFrequencia = true;
	$scope.edita = false;
	$scope.salva = false;
	$scope.aluno = aluno;
	for(var j =0;j<$scope.turmas.length;j++){
		for( var i =0; i<$scope.aulas.length;i++){
			if($scope.aulas[i].codAluno == aluno.objectId ) {
				$scope.aulasAlu.push($scope.aulas[i]);
			}
		}
	}
	for( var i =0; i<$scope.aulas.length;i++){
		for( var y =0; y<$scope.turmas.length;y++){
			for( var j =0; j<$scope.turmas[y].aluTurma.length;j++){

				if($scope.aulas[i].codTurma.objectId == $scope.turmas[y].objectId && aluno.objectId == $scope.turmas[y].aluTurma[j].objectId) {
					$scope.aulasTurma.push($scope.aulas[i]);
				}
			}
		}
	}

		// for( var i =0; i<$scope.aulas.length;i++){
		// 	for( var y =0; y<$scope.turmas.length;y++){
		// 		for( var j =0; j<$scope.turmas[y].aluTurma.length;j++){

		// 			if( aluno.objectId == $scope.aulas[i].codAluno && aluno.objectId == $scope.turmas[y].aluTurma[j].objectId) {
		// 				$scope.alunosFalta.push($scope.aulas[i]);
		// 			}
		// 		}
		// 	}
		// }
		$scope.turmaFalta=[]
		for( var i =0; i<$scope.aulas.length;i++){
			for( var y =0; y<$scope.turmas.length;y++){
				for( var j =0; j<$scope.turmas[y].aluTurma.length;j++){

					if( aluno.objectId != $scope.aulas[i].codAluno && aluno.objectId == $scope.turmas[y].aluTurma[j].objectId && $scope.turmas[y].objectId == $scope.aulas[i].codTurma.objectId) {
						$scope.alunosFalta.push($scope.aulas[i]);
						$scope.turmaFalta.push($scope.turmas[y]);
					}
				}
			}
		}
		$scope.datasFalta=[]
		var achou =0;
		
		for(var i =0;i<$scope.alunosFalta.length;i++){
			for(var j =0;j<$scope.aulasAlu.length;j++){
				if($scope.aulasAlu[j].data ==  $scope.alunosFalta[i].data){
					achou++
				}
			}if(achou < 1){
				$scope.datasFalta.push($scope.alunosFalta[i].data);
			}
			achou = 0
		}

		$scope.dadosAluno = {"gerais":{"data":$scope.datasFalta,"faltas": $scope.datasFalta.length  }}
	}
	$scope.carregarAluno();

	$scope.carregarTurma();

	$scope.carregarAula();

});