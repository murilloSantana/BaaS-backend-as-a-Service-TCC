
app.controller('ctrlProfessor', function ($scope,professoresAPI,$window,servicesAPI,turmasAPI) {
	$scope.currentPage = 1;
	$scope.pageSize= 10;
	var professores = [];
	var enderecos;
	$scope.enderecos=[];
	$scope.perPagePresets = [10,15,25,50]
	$scope.carregarProfessor = function(){
		professoresAPI.getProfessor().success(function (response) {
			$scope.professores = response.data;

		});
	};
	
	$scope.carregarTurma = function(){
		turmasAPI.getTurma().success(function (response) {
			$scope.turmas = response.data;

		});
	};

	$scope.excluirProfessor = function(professor){
		servicesAPI.deleteEndereco(professor.enderecoProf.objectId).success(function (response,data) {
			$scope.carregarProfessor();


			console.log(data);
		});
		professoresAPI.deleteProfessor(professor.objectId).success(function (response,data) {
			$scope.carregarProfessor();

			alert("Professor excluido com sucesso");

			console.log(data);
		});
		
	}

	$scope.editarProfessor = function(professor,objectId){
		professoresAPI.updateProfessor(professor.objectId,professor).success(function(response,data){
			console.log(response);

			$scope.carregarProfessor();

			alert("Professor editado com sucesso");
		});

	}

	$scope.saveProfTurma = function(turma,professor){
		var professorSelecionado = $scope.professores.filter(function (professor) {
			if (professor.selecionado) return professor;
		});
		
		for(var i=0;i<$scope.professores.length;i++){

			$scope.professores[i].profTurma.filter(function(elemento){
				if(elemento.objectId == turma.select.objectId){
					alert("Já existe um professor cadastrado nessa turma, caso queira inserir um novo professor, terá de remover o atual da turma")
					$window.location.reload()
				}
			})
		}
		if(professorSelecionado.length > 1){
			alert("Uma turma só pode ter um professor cadastrado")
			$window.location.reload()
		}else{

			for(var i = 0;i < professorSelecionado.length; i++){
				professor={
					"profTurma":$scope.turma.select
				}


				professoresAPI.updateProfessor(professorSelecionado[0].objectId,professor).success(function(response,data){
					$window.alert("Professor inserido com sucesso")
					console.log(data);
				});
			}
		}							
	}


	$scope.mudaBtn = function(salva,edita){
		$scope.salva = true;
		$scope.edita = false;


	}

	$scope.editProf = function(professor,edita,salva){
		$scope.professor = professor;
		$scope.enderecos = enderecos;
		$scope.edita = true;
		$scope.salva = false;

	}


	$scope.limpaForm = function(){
		delete $scope.cep;
		delete $scope.enderecos;
		delete $scope.professor;
		$scope.professorForm.$setPristine();

	};



	$scope.saveProfessor = function(professor,matricula){
		enderecos = $scope.enderecos;
		professor={
			"nome":professor.nome,
			"telefone":professor.telefone,
			"DataNascimento":professor.date,
			"enderecoProf": 

			{
				"___class":"Enderecos",
				"cep": enderecos.cep,
				"bairro": enderecos.bairro,
				"UF":enderecos.uf,
				"municipio":enderecos.localidade,
				"rua":enderecos.logradouro
			}

		}
		professoresAPI.setProfessor(professor).success(function(data){
			$window.alert("Professor cadastrado com sucesso")

			$window.location.reload();

			console.log(data);


		})
	};

	$scope.atualizaCep = function(cep){
		servicesAPI.getEndereco(cep).success(function (response) {
			$scope.enderecos = response;
			console.log(response);

		});
	};


	$scope.encaminhar = function(){
		$(window.document.location).attr('href',"/Tcc/index.html#/professor"); 
	}



	$scope.carregarTurma();

	$scope.carregarProfessor();

});


