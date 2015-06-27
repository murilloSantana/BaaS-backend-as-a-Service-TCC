
app.controller('ctrlProfessor', function ($scope,professoresAPI,$window,servicesAPI,turmasAPI,$timeout) {
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
	$scope.carregarEnderecos = function(){
		servicesAPI.getEnderecoProfAlu().success(function (response) {
			$scope.tabEnderecos = response.data;

		});
	};

	$scope.excluirProfessor = function(professor){
		servicesAPI.deleteEndereco(professor.enderecoProf.objectId).success(function (response,data) {
			$scope.carregarProfessor();


			console.log(data);
		});
		professoresAPI.deleteProfessor(professor.objectId).success(function (response,data) {

			$scope.sucessoProfDel = true;
			$timeout(function() {
				$scope.sucessoProfDel= false
			}, 2000);
			$timeout(function() {
				$scope.carregarProfessor();
			}, 1000);
			console.log(data);
		}).error(function(data){
			$scope.erroProfDel = true;
			$timeout(function() {
				$scope.erroProfDel= false
			}, 3000);


		});
		
	}

	$scope.editarProfessor = function(professor){

		servicesAPI.deleteEndereco(professor.enderecoProf.objectId).success(function (response,data) {
			$scope.carregarProfessor();


			console.log(data);
		});
		professor={
			"__meta":professor.__meta,
			"objectId":professor.objectId,
			"nome":professor.nome,
			"DataNascimento":professor.date,
			"telefone":professor.telefone,
			"enderecoProf": 
			{
				"___class":"Enderecos",
				"cep":$scope.enderecos.cep,
				"bairro":$scope.enderecos.bairro,
				"municipio":$scope.enderecos.localidade,
				"rua":$scope.enderecos.logradouro,
				"complemento": $scope.enderecos.complemento

			},

		}
		professoresAPI.updateProfessor(professor.objectId,professor).success(function(response,data){

			$scope.sucessoProfEdit = true;
			$timeout(function() {
				$scope.sucessoProfEdit= false
			}, 2000);
			$timeout(function() {
				$scope.carregarProfessor();
				$window.location.reload();
			}, 1000);
			console.log(data);
		}).error(function(data){
			$scope.erroProfEdit = true;
			$timeout(function() {
				$scope.erroProfDel= false
			}, 3000);


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
					
					$scope.sucessoProfInserir = true;
					$timeout(function() {
						$scope.sucessoProfInserir= false
					}, 2000);
					$timeout(function() {
						$scope.carregarProfessor();
						$window.location.reload();
						$scope.encaminhar();

					}, 1000);
				}).error(function(data){
					$scope.erroProfInserir = true;
					$timeout(function() {
						$scope.erroProfInserir= false
					}, 3000);
				});
			}
		}							
	}


	$scope.mudaBtn = function(){
		$scope.salva = true;
		$scope.edita = false;
		$scope.profs = false;


	}

	$scope.editProf = function(professor){

		$scope.professor = professor;
		data = new Date(professor.DataNascimento)
		$scope.professor.date = data;
		$scope.edita = true;
		$scope.salva = false;
		$scope.profs = false;

		$scope.enderecos = professor.enderecoProf;
		$scope.enderecos.logradouro = professor.enderecoProf.rua;
		$scope.enderecos.localidade = professor.enderecoProf.municipio;
		$scope.enderecos.complemento = professor.enderecoProf.complemento;


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
			$scope.sucessoProf = true;
			$timeout(function() {
				$scope.sucessoProf= false
			}, 2000);
			$timeout(function() {
				$window.location.reload();
			}, 1000);

			console.log(data);


		}).error(function(data){
			$scope.erroProf = true;
			$timeout(function() {
				$scope.erroProf= false
			}, 3000);


		});
	};

	$scope.atualizaCep = function(cep){
		if($scope.professor.enderecoProf.cep.length == 8){

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


	$scope.encaminhar = function(){
		$(window.document.location).attr('href',"/Tcc/index.html#/professor"); 
	}

	$scope.profInTurma=[]
	$scope.profs = false;

	$scope.turmasProf = function(professor){
		for (var i = 0; i < $scope.professores.length; i++) {
			for (var y = 0; y < $scope.professores[i].profTurma.length; y++) {

				if($scope.professores[i].objectId == professor.objectId){
					$scope.profInTurma.push($scope.professores[i].profTurma[y].nome)

				}
			}
		};
		$scope.profs = true;
		$scope.edita = false;
		$scope.salva = false;
	}

	$scope.atualiza = function(){
		window.location.reload()
	}
	$scope.carregarTurma();
	$scope.carregarProfessor();
	$scope.carregarEnderecos();

});


