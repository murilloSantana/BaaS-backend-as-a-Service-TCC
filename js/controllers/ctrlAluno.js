
app.controller('ctrlAluno', function ($scope,alunosAPI,servicesAPI,turmasAPI,$window) {
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
			$scope.carregarAluno();

			alert("Aluno excluido com sucesso");
			console.log(data);
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
			alert("Não existem alunos disponiveis para cadastrado")
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
				alert("Turma editada com sucesso");
				console.log(data);
			});

		}
	}

	$scope.editarAluno = function(aluno,objectId){
		alunosAPI.updateAluno(aluno.objectId,aluno).success(function(response,data){
			$scope.carregarAluno();

			alert("Aluno editado com sucesso");
			console.log(data);
		});

	}

	$scope.mudaBtn = function(salva,edita){
		$scope.salva= true;
		$scope.edita = false;
		$scope.mudarTur = false;


	}

	$scope.edit = function(aluno,edita,salva){
		$scope.aluno =  aluno;
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
			$window.alert("Aluno cadastrado com sucesso")

			$window.location.reload();

			console.log(data);


		})
	};
	$scope.encaminhar = function(){
		$(window.document.location).attr('href',"/Tcc/index.html#/aluno"); 
	}


	$scope.atualizaCep = function(cep){
		servicesAPI.getEndereco(cep).success(function (response) {
			$scope.enderecos = response;
			console.log(response);

		});
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
			alert("Este aluno não está cadastrado em nenhuma turma")
			$window.location.reload()
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
		});

		turmasAPI.updateTurma($scope.turmas[$scope.cont].objectId,turma).success(function(response,data){
			alert("Aluno removido da turma");
			$window.location.reload();
			console.log(data);
		});

	}

	$scope.carregarAluno();

	$scope.carregarTurma();

});