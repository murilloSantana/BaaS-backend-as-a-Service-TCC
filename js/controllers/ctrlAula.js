
app.controller('ctrlAula', function ($scope,alunosAPI,turmasAPI,aulasAPI,$window,professoresAPI,$timeout) {
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
		var achou=0
		$scope.datas=[];

		
		for (var i = 0; i < $scope.aulas.length; i++) {
			if($scope.datas.length == 0 && $scope.aulas[i].codTurma.objectId == $scope.turma.selecionado.objectId){
				$scope.datas.push($scope.aulas[i]);
			}else if($scope.datas.length > 0 && $scope.aulas[i].codTurma.objectId == $scope.turma.selecionado.objectId){
				for (var y = 0; y < $scope.datas.length; y++) {

					if($scope.datas[y].data == $scope.aulas[i].data && $scope.aulas[i].codTurma.objectId == $scope.turma.selecionado.objectId){

						achou++;
					}
				}

				if(achou < 1){
					$scope.datas.push($scope.aulas[i]);

				}
			}else{
			}
			achou = 0;
		}

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
	$scope.excluirAula = function(aula){
		$scope.aulasExcluidas =[];
		for(var i = 0; i < $scope.aulas.length; i++){
			if($scope.aulas[i].codTurma.objectId == $scope.turma.selecionado.objectId && $scope.aulas[i].data == aula.data){
				$scope.aulasExcluidas.push($scope.aulas[i]);

			}
		}
		for(var i = 0; i < $scope.aulasExcluidas.length; i++){
			aulasAPI.deleteAula($scope.aulasExcluidas[i].objectId).success(function (response,data) {

				if(i == $scope.aulasExcluidas.length){
					$scope.sucessoAulaDel = true;

					$timeout(function() {
						$scope.sucessoAulaDel= false
					}, 2000);
					$timeout(function() {
						$window.location.reload();
					}, 1000);
				}}).error(function(data){
					$scope.erroAulaDel = true;
					$timeout(function() {
						$scope.erroAulaDel= false
					}, 3000);
				});
			}
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
		$scope.dadosAula = function(aula,turma){
			$scope.edita = false;
			$scope.salva = false;
			$scope.dados = true;
			$scope.alunosChamados = [];
			$scope.alu=[];
			$scope.dado=[]

			$scope.aulas.filter(function(elemento) {
				if(elemento.data == aula.data && $scope.turma.selecionado.objectId == elemento.codTurma.objectId ) return $scope.alunosChamados.push(elemento)
			});
			console.log($scope.alunosChamados);
			// var achou = 0;
			// for(var i = 0; i<$scope.alunos.length;i++){
			// 	for(var y = 0; y< $scope.alunosChamados.length; y++){

			// 		if($scope.dado.length == 0 && $scope.alunosChamados[y].codAluno == $scope.alunos[i].objectId  &&  $scope.turma.selecionado.objectId == aula.codTurma.objectId ){
			// 			// obj= $scope.alunos[i].objectId
			// 			$scope.dado.push($scope.alunos[i])

			// 		}else{
			// 			for(var j = 0; j< $scope.dado.length; j++){

			// 				if($scope.dado[j].objectId == $scope.alunos[i].objectId){
			// 					achou++;
			// 				}
			// 			}
			// 		}
			// 	}if(achou < 1){
			// 		$scope.dado.push($scope.alunos[i])

			// 	}
			// 	achou = 0;
			// }
			// console.log($scope.dado);



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
			var dateAula = new Date($scope.aula.date);
			var dataAtualizada = new Date();

			if($scope.aula.date <= dataAtualizada){
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
						if(i == aluSelecionados.length ){
							$scope.sucessoAulaSave = true;
							$timeout(function() {
								$scope.sucessoAulaSave= false
							}, 2000);
							$timeout(function() {
								$window.location.reload();
							}, 1000);
						}
					}).error(function(data){
						$scope.erroAulaSave = true;
						$timeout(function() {
							$scope.erroAulaSave= false
						}, 3000);
					});

				}
			}else{
				$scope.erroDataAula = true;
				$timeout(function() {
					$scope.erroDataAula= false
				}, 3000)
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