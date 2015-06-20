app.controller('ctrlTrimestre', function ($scope,turmasAPI,trimestresAPI,$window) {
	$scope.currentPage = 1;
	$scope.pageSize= 10;
	$scope.aulas = [ ];
	$scope.turmas= [];
	$scope.perPagePresets = [10,15,25,50];

	
	$scope.carregarTurma = function(){
		turmasAPI.getTurma().success(function (response) {
			$scope.turmas = response.data;

		});
	};
	


	

	$scope.mudaBtn = function(salva,edita){
		$scope.salva= true;
		$scope.edita = false;


	}

	$scope.edit = function(aula,edita,salva){
		$scope.aula=  aula;
		$scope.edita = true;
		$scope.salva = false;


	}


	$scope.limpaForm = function(){
		delete $scope.cep;
		delete $scope.enderecos;
		delete $scope.aula;

	};


	
	$scope.encaminhar = function(){
		$(window.document.location).attr('href',"/Tcc/index.html#/aula"); 
	}


	
	$scope.carregarAluno();

	$scope.carregarAula();

	$scope.carregarTurma();

});