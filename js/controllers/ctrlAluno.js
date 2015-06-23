
app.controller('ctrlAluno', function ($scope,alunosAPI,servicesAPI,turmasAPI,$window,$timeout) {
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
		$scope.mudarTur = false;


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
		$scope.mudarTur = false;


	}

	$scope.editMudarTurma = function(){
		$scope.mudarTur = true;
		$scope.edita = false;
		$scope.salva = false;
	}

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
		for (var i = 0; i < $scope.turmas.length; i++) {
			for (var y = 0; y < $scope.turmas[i].aluTurma.length; y++) {
				if($scope.turmas[i].aluTurma[y].objectId == aluno.objectId){
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
				if(elemento.objectId != aluno.objectId){

					return $scope.novo.push(elemento)
				}
			})
		}





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

	$scope.carregarAluno();

	$scope.carregarTurma();

});