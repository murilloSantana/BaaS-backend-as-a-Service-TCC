
app.controller('ctrlAula', function ($scope,alunosAPI,turmasAPI,aulasAPI,$window,professoresAPI) {
	$scope.currentPage = 1;
	$scope.pageSize= 10;
	$scope.aulas = [];
	$scope.turmas= [];
	$scope.perPagePresets = [10,15,25,50];
	$scope.alunosChamados=[];
	$scope.datas=[];
	$scope.opcoes= ["falta", "presente"];
	$scope.biblia=[];
	$scope.revista=[];
	
	$scope.contains = function (aulas) {
		
		$scope.datas=[];

		$scope.datas.push($scope.aulas[0].data);
		obj = $scope.aulas[0];
		for(var i = 0; i < $scope.aulas.length; i++){
			if($scope.aulas[i].data == obj ){
				obj = $scope.aulas[i].data;
			}else{
				obj = $scope.aulas[i].data;
				
				$scope.datas.push($scope.aulas[i]);

			}

		}
		$scope.datas.shift()


	}
	$scope.carregarAula = function(){
		aulasAPI.getAula().success(function (response) {
			$scope.aulas = response.data;

		});
	};
	$scope.carregarTurma = function(){
		turmasAPI.getTurma().success(function (response) {
			$scope.turmas = response.data;

		});
	};

	$scope.carregarProfessor = function(){
		professoresAPI.getProfessor().success(function (response) {
			$scope.professores = response.data;

		});
	};
	
	$scope.carregarAluno = function(){
		alunosAPI.getAluno().success(function (response) {
			$scope.alunos = response.data;

		});
	};
	$scope.excluirAula = function(aula,objectId){
		aulasAPI.deleteAula(aula.objectId).success(function (response,data) {
			$scope.carregarAula();
			$scope.carregarTurma();
			$scope.carregarAluno();

			alert("Aula excluida com sucesso");
			console.log(data);
		});
	}

	$scope.editarTurma = function(turma,aula){



		turma={
			"aulaTurma": $scope.turma.select.aluTurma



		}

		turmasAPI.updateTurma($scope.turma.select.objectId,turma).success(function(response,data){
			alert("Turma editada com sucesso");
			console.log(data);
		});

	}


	$scope.editarAula = function(aula,objectId){
		aulasAPI.updateAula(aula.objectId,aula).success(function(response,data){
			$scope.carregarAula();

			alert("Aula editada com sucesso");
			console.log(data);
		});

	}

	$scope.mudaBtn = function(salva,edita){
		$scope.salva= true;
		$scope.edita = false;
		$scope.dados = false;


	}

	$scope.edit = function(aula,edita,salva){
		$scope.aula=  aula;
		$scope.edita = true;
		$scope.salva = false;
		$scope.dados = false;


	}

	$scope.dadosAula = function(aula,edita,salva){
		$scope.edita = false;
		$scope.salva = false;
		$scope.dados = true;
		$scope.alunosChamados = [];
		$scope.alu=[];
		$scope.dadosAula=[];

		for(var y = 0; y< $scope.datas.length; y++){
			$scope.alunosChamados= $scope.aulas.filter(function(elemento) {
				if(elemento.data == aula.data && $scope.datas[y].data == elemento.data ) return elemento.codAluno
			});
		}
		$scope.alus=[]
		$scope.alus.push($scope.alunos[0])
		obj = $scope.alunos[0].objectId
		for(var i = 0; i<$scope.alunos.length;i++){
			for(var y = 0; y< $scope.alunosChamados.length; y++){

				if($scope.alunosChamados[y].codAluno == $scope.alunos[i].objectId && $scope.alunos[i].objectId != obj){
					obj= $scope.alunos[i].objectId
					$scope.alus.push($scope.alunos[i])
				}else{
					obj= $scope.alunos[i].objectId
				}
			}
		}
		console.log($scope.alus);
	}
	$scope.limpaForm = function(){


		$window.location.reload();
	};

	$scope.guardar = function(tur){
		var b = document.getElementsByName("bib");  
		var r = document.getElementsByName("rev");  


		var aluSelecionados = $scope.turma.select.aluTurma.filter(function (tur) {
			if (tur.seleciona) return $scope.turma.select.aluTurma;
		});

		for (var i=0;i<aluSelecionados.length;i++){ 
			if (tur.seleciona){ 
				if (b[i].checked == false){ 
					if(aluSelecionados.length == $scope.biblia.length){ 
						$scope.biblia.shift()
						$scope.biblia.push("faltou")

						$scope.revista.shift()
						$scope.revista.push("faltou")
					}else{
						$scope.biblia.push("faltou")
						$scope.revista.push("faltou")

					}
				}else{
					if(aluSelecionados.length == $scope.biblia.length){
						$scope.biblia.shift()
						$scope.revista.shift()

						$scope.biblia.push("presente")
						$scope.revista.push("presente")

					}else{
						$scope.biblia.push("presente")
						$scope.revista.push("presente")

					}
				}  
			}
		}
	}
	$scope.saveAula = function(){
		var aluSelecionados = $scope.turma.select.aluTurma.filter(function (tur) {
			if (tur.seleciona) return $scope.turma.select.aluTurma;
		});


		for(var j=0;j<$scope.professores.length;j++){
			for(var y=0;y<$scope.professores[j].profTurma.length;y++){
				if ($scope.turma.select.objectId == $scope.professores[j].profTurma[y].objectId){ 
					$scope.prof = $scope.professores[j]
					break;
				}
			}
		}		
		for(var i = 0; i < aluSelecionados.length;i++){


			aula={


				"data":$scope.aula.date,
				"biblia":$scope.biblia[i],
				"revista":$scope.revista[i],
				"codTurma":$scope.turma.select,
				"codAluno":aluSelecionados[i].objectId,
				"professor":$scope.prof.nome

			}

			aulasAPI.setAula(aula).success(function(data){

				$window.alert("Aula cadastrada com sucesso")
				console.log(data);
			}) 

		}
	};


	$scope.encaminhar = function(){
		$(window.document.location).attr('href',"/Tcc/index.html#/aula"); 
	}


	$scope.carregarProfessor();

	$scope.carregarAluno();

	$scope.carregarAula();

	$scope.carregarTurma();

});