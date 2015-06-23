app.controller('ctrlTurma', function ($scope,turmasAPI,$window,professoresAPI,alunosAPI,revistasAPI,trimestresAPI,aulasAPI,$timeout) {
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	var turmas = [];
	$scope.alunos = [];
	$scope.professores = [];
	$scope.perPagePresets = [10,15,25,50]
	$scope.tipoRelatorio = ["Semanal","Trimestral","Anual"];
	$scope.datas=[];
	$scope.tipoRelatorioTrimestre = ["1º Trimestre","2º Trimestre","3º Trimestre","4º Trimestre"]
	$scope.carregarAula = function(){
		aulasAPI.getAula().success(function (response) {
			$scope.aulas = response.data;

		});
	}
	$scope.carregarProfessor = function(){
		professoresAPI.getProfessor().success(function (response) {
			$scope.professores = response.data;
		});
	};
	$scope.carregarAluno = function(){
		alunosAPI.getAluno().success(function (response) {
			$scope.alunos = response.data;
			$scope.aniversariantes();

		});
	};
	$scope.carregarTrimestre = function(){
		trimestresAPI.getTrimestre().success(function (response) {
			$scope.trimestres = response.data;


		});
	};

	$scope.carregarTurma = function(){
		turmasAPI.getTurma().success(function (response) {
			$scope.turmas = response.data;

		});
	};
	$scope.excluirTurma = function(turma){
		$scope.excluiTurma=[]
		for(var i = 0; i < $scope.turmas.length;i++){
			for(var y = 0;y< $scope.turmas[i].turmaTrimestre.length;y++){
				if($scope.turmas[i].turmaTrimestre[y].objectId == turma.objectId){
					$scope.excluiTurma = $scope.turmas[i]
				}
			}
		}
		turmasAPI.deleteTurma($scope.excluiTurma.objectId).success(function (response,data) {
			$scope.sucessoTurmaDel = true;
			$timeout(function() {
				$scope.sucessoTurmaDel= false
			}, 2000);
			$timeout(function() {
				$window.location.reload();
			}, 1000);
		}).error(function(data){
			$scope.erroTurmaDel = true;
			$timeout(function() {
				$scope.erroTurmaDel= false
			}, 3000);
		});
	}

	
	$scope.mudaBtn = function(){
		$scope.salva = true;
		$scope.carregar = false;
		$scope.mostraRevista = false;


	}

	


	$scope.limpaForm = function(){

		delete $scope.turma;
		$scope.turmaForm.$setPristine();

		$scope.carregarTurma();

	};

	$scope.saveRevista = function(turma){
		var ultimoTri;
		for(var i = 0; i < turma.select.turmaTrimestre.length; i++){
			ultimoTri= i;
		}

		trimestre={



			"triRev":
			{
				"___class":"Revistas",
				"categoria":$scope.revista.categoria,
				"tema":$scope.revista.tema,

			}
		}


		trimestresAPI.updateTrimestre(turma.select.turmaTrimestre[ultimoTri].objectId,trimestre).success(function(data){

			$scope.sucessoTurmaRev = true;
			$timeout(function() {
				$scope.sucessoTurmaRev= false
			}, 2000);
			$timeout(function() {
				$window.location.reload();
				$scope.encaminhar();
			}, 1000);
		}).error(function(data){
			$scope.erroTurmaRev = true;
			$timeout(function() {
				$scope.erroTurmaRev= false
			}, 3000);
		});
	};


	$scope.saveTurma = function(turma){

		dataAtual = new Date();
		mesAtual = dataAtual.getMonth()+1;
		anoAtual =dataAtual.getFullYear();

		if(mesAtual < 4 ){
			turma={
				"nome":turma.nome,
				"turmaTrimestre": 
				[{

					"___class":"Trimestres",
					"dataInicio": "01/01",
					"dataFim":"31/03",
					"trimestre":"1º",
					"ano":dataAtual.getFullYear()
				}]
			}
		}
		if(mesAtual < 7 && mesAtual > 3){
			turma={
				"nome":turma.nome,
				"turmaTrimestre": 
				[{

					"___class":"Trimestres",
					"dataInicio": "01/04",
					"dataFim":"31/06",
					"trimestre":"2º",
					"ano":dataAtual.getFullYear()


				}]
			}
		}if(mesAtual < 10 && mesAtual > 6){
			turma={
				"nome":turma.nome,
				"turmaTrimestre": 
				[{

					"___class":"Trimestres",
					"dataInicio": "01/07",
					"dataFim":"31/09",
					"trimestre":"3º",
					"ano":dataAtual.getFullYear()


				}]
			}
		}if(mesAtual > 9){
			turma={
				"nome":turma.nome,
				"turmaTrimestre": 
				[{

					"___class":"Trimestres",
					"dataInicio": "01/10",
					"dataFim":"31/12",
					"trimestre":"4º",
					"ano":dataAtual.getFullYear()


				}]
			}

		}


		turmasAPI.setTurma(turma).success(function(data){

			$scope.sucessoTurmaSave = true;
			$timeout(function() {
				$scope.sucessoTurmaSave= false
			}, 2000);
			$timeout(function() {
				$window.location.reload();
			}, 1000);
		}).error(function(data){
			$scope.erroTurmaSave = true;
			$timeout(function() {
				$scope.erroTurmaSave= false
			}, 3000);
		});

	};

	$scope.fecharTrimestre = function(turma){
		dataAtual = new Date();
		mesAtual = dataAtual.getMonth()+1;
		anoAtual = dataAtual.getFullYear();

		var ultimoTri;
		var verficar = false;
		for(var i = 0; i < turma.selecionada.turmaTrimestre.length; i++){
			ultimoTri= i;
		}

		if(mesAtual < 4 ){
			if(turma.selecionada.turmaTrimestre[ultimoTri].trimestre != "1º"){
				turma={
					"turmaTrimestre": 
					[{

						"___class":"Trimestres",
						"dataInicio": "01/01",
						"dataFim":"31/03",
						"trimestre":"1º"

					}]
				}
				verficar = true;
			}else{
				$scope.erroTurmaAndamento = true;
				$timeout(function() {
					$scope.erroTurmaAndamento= false
				}, 3000);
			}
		}
		if(mesAtual < 7 && mesAtual > 3){
			if(turma.selecionada.turmaTrimestre[ultimoTri].trimestre != "2º"){

				turma={
					"turmaTrimestre": 
					[{

						"___class":"Trimestres",
						"dataInicio": "01/04",
						"dataFim":"31/06",
						"trimestre":"2º"

					}]
				}
				verficar = true;

			}else{
				$scope.erroTurmaAndamento = true;
				$timeout(function() {
					$scope.erroTurmaAndamento= false
				}, 3000);

			}
		}if(mesAtual < 10 && mesAtual > 6){
			if(turma.selecionada.turmaTrimestre[ultimoTri].trimestre != "3º"){

				turma={
					"turmaTrimestre": 
					[{

						"___class":"Trimestres",
						"dataInicio": "01/07",
						"dataFim":"31/09",
						"trimestre":"3º"

					}]
				}
				verficar = true;

			}else{
				$scope.erroTurmaAndamento = true;
				$timeout(function() {
					$scope.erroTurmaAndamento= false
				}, 3000);
			}

		}if(mesAtual > 9){
			if(turma.selecionada.turmaTrimestre[ultimoTri].trimestre != "4º"){

				turma={
					"turmaTrimestre": 
					[{

						"___class":"Trimestres",
						"dataInicio": "01/10",
						"dataFim":"31/12",
						"trimestre":"4º"

					}]

				}
				verficar = true;

			}else{
				$scope.erroTurmaAndamento = true;
				$timeout(function() {
					$scope.erroTurmaAndamento= false
				}, 3000);
			}
		}
		if(verficar){
			turmasAPI.updateTurma($scope.turma.selecionada.objectId,turma).success(function(response,data){
				$scope.sucessoTurmaFechar = true;
				$timeout(function() {
					$scope.sucessoTurmaFechar= false
				}, 2000);
				$timeout(function() {
					$scope.carregarTurma();
				}, 1000);
			}).error(function(data){
				$scope.erroTurmaFechar = true;
				$timeout(function() {
					$scope.erroTurmaFechar= false
				}, 3000);
			});
		}

		$scope.carregarProfessor();
		$scope.carregarAluno();
		$scope.carregarTrimestre();
		$scope.carregarAula();

	}

	$scope.encaminhar = function(){
		$(window.document.location).attr('href',"/Tcc/index.html#/turma"); 
	}
	$scope.carregarAlunosTur = function(){
		$scope.edita = false;
		$scope.salva = false;
		$scope.carregar = true;
		$scope.mostraRevista = false;


	}

	$scope.removerProfTurma = function(turma){
		var achado;
		$scope.novaLista=[];

		for (var i = 0; i < $scope.professores.length; i++) {
			for (var y = 0; y < $scope.professores[i].profTurma.length; y++) {
				if($scope.professores[i].profTurma[y].objectId == turma.objectId){
					$scope.cont = i;
					$scope.contador = y;
					achado = true;
					break;

				}
			}
		}
		if(!achado){
			$scope.erroTurmaProfVazia = true;
			$timeout(function() {
				$scope.erroTurmaProfVazia= false
				$window.location.reload()
			}, 3000);
		}

		$scope.professores[$scope.cont].profTurma.filter(function(elemento){
			if(elemento.objectId != turma.objectId){

				return $scope.novaLista.push(elemento)
			}
		})

		professor={
			"profTurma":$scope.novaLista,
			"__meta":$scope.professores[$scope.cont].__meta

		}


		professoresAPI.updateProfessor($scope.professores[$scope.cont].objectId,professor).success(function(response,data){
			$scope.sucessoTurmaRemoveProf = true;
			$timeout(function() {
				$scope.sucessoTurmaRemoveProf= false
			}, 2000);
			$timeout(function() {
				$window.location.reload();
			}, 1000);
		}).error(function(data){
			$scope.erroTurmaRemoveProf = true;
			$timeout(function() {
				$scope.erroTurmaRemoveProf= false
			}, 3000);
		});
	}

	$scope.mostrarRevista = function(){
		$scope.mostraRevista = true;
		$scope.salva = false;
		$scope.edita = false;
		$scope.carregar = false;
	}

	$scope.aniversariantes = function(){
		$scope.aniversario=[]
		var dataAtual = new Date();
		var dataAntiga = new Date();
		dataAntiga.setDate(dataAntiga.getDate()-7);

		$scope.aniversario = $scope.alunos.filter(function(elemento) {
			var data2 = new Date(elemento.dtNascimento);
			ano2 = data2.getFullYear();
			var data = new Date();
			ano = data.getFullYear()
			total =ano -ano2
			data2.setFullYear(data2.getFullYear()+total);

			var diferenca = Math.trunc((data2.getTime()-data.getTime())/(1000*60*60*24));
			if(diferenca <= 0 && diferenca > -8) return elemento;
		});

		$scope.quantidade = $scope.aniversario.length
	}

	$scope.contains = function (aulas) {

		$scope.datas=[];

		$scope.datas.push($scope.aulas[0]);
		obj = $scope.aulas[0].data;
		for(var i = 0; i < $scope.aulas.length; i++){
			if($scope.aulas[i].data == obj ){
				obj = $scope.aulas[i].data;
			}else{
				obj = $scope.aulas[i].data;

				$scope.datas.push($scope.aulas[i]);

			}
		}

	}

	$scope.gerarRelatorio = function(aul,trimestreEscolhido){
		$scope.nova=[]
		if($scope.relatorio == 'Semanal'){
			for (var i = 0; i < $scope.datas.length; i++) {
				if(aul.dataSelecionada == true){
					$scope.nova.push($scope.datas[i])
				}
			};
		}else if($scope.relatorio == 'Trimestral'){
			$scope.relatorioTrimestral();
		}
	}
	
	$scope.relatorioTrimestral = function(){
		$scope.trimestres=[];

		$scope.revistasPresentesTri=[]		
		$scope.bibliasPresentesTri=[]
		$scope.presentesTri=[]
		if($scope.relTrimestre.select == "1º Trimestre"){
			
			$scope.aulas.filter(function(elemento){
				var dataAula = new Date(elemento.data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(elemento.biblia == "presente" && mes < 4 && anoAtual == anoAula)	return $scope.bibliasPresentesTri.push(elemento)
			});


			$scope.aulas.filter(function(elemento){
				var dataAula = new Date(elemento.data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(elemento.revista == "presente" && mes < 4 && anoAtual == anoAula )	return $scope.revistasPresentesTri.push(elemento)
			});


			$scope.matriculadosTri = $scope.alunos.filter(function(elemento){
				var dataMatricula = new Date(elemento.created);
				var mes = dataMatricula.getMonth();
				
				if( mes  < 4) return elemento
			})

			for(var i = 0; i<$scope.aulas.length;i++){
				var dataAula = new Date($scope.aulas[i].data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(mes < 4 && anoAtual == anoAula ){
					$scope.presentesTri.push($scope.aulas[i])
				}
			}

			$scope.trimestres={"total":{"revistasPresentesTri":$scope.revistasPresentesTri.length,"bibliasPresentesTri":$scope.bibliasPresentesTri.length,
			"presencaTri":$scope.presentesTri.length,"matriculadosTri":$scope.matriculadosTri.length}};
			$scope.mostraTrimestre = true;

		}else if($scope.relTrimestre.select == "2º Trimestre"){
			$scope.aulas.filter(function(elemento){
				var dataAula = new Date(elemento.data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(elemento.biblia == "presente" && mes < 7 && mes > 3 && anoAtual == anoAula)	return $scope.bibliasPresentesTri.push(elemento)
			});


			$scope.aulas.filter(function(elemento){
				var dataAula = new Date(elemento.data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(elemento.revista == "presente" && mes < 7 && mes > 3 && anoAtual == anoAula)	return $scope.revistasPresentesTri.push(elemento)
			});


			$scope.matriculadosTri = $scope.alunos.filter(function(elemento){
				var dataMatricula = new Date(elemento.created);
				var mes = dataMatricula.getMonth();
				if( mes < 7 && mes > 3 ) return elemento
			})

			for(var i = 0; i<$scope.aulas.length;i++){
				var dataAula = new Date($scope.aulas[i].data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(mes < 7 && mes > 3 && anoAtual == anoAula ){
					$scope.presentesTri.push($scope.aulas[i])
				}
			}

			$scope.trimestres={"total":{"revistasPresentesTri":$scope.revistasPresentesTri.length,"bibliasPresentesTri":$scope.bibliasPresentesTri.length,
			"presencaTri":$scope.presentesTri.length,"matriculadosTri":$scope.matriculadosTri.length}};
			$scope.mostraTrimestre = true;

		}else if($scope.relTrimestre.select == "3º Trimestre"){
			$scope.aulas.filter(function(elemento){
				var dataAula = new Date(elemento.data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(elemento.biblia == "presente" && mes < 10 && mes > 6 && anoAtual == anoAula)	return $scope.bibliasPresentesTri.push(elemento)
			});


			$scope.aulas.filter(function(elemento){
				var dataAula = new Date(elemento.data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(elemento.revista == "presente" && mes < 10 && mes > 6 && anoAtual == anoAula )	return $scope.revistasPresentesTri.push(elemento)
			});


			$scope.matriculadosTri = $scope.alunos.filter(function(elemento){
				var dataMatricula = new Date(elemento.created);
				var mes = dataMatricula.getMonth();
				if( mes < 10 && mes > 6  ) return elemento
			})

			for(var i = 0; i<$scope.aulas.length;i++){
				var dataAula = new Date($scope.aulas[i].data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(mes < 10 && mes > 6  && anoAtual == anoAula ){
					$scope.presentesTri.push($scope.aulas[i])
				}
			}

			$scope.trimestres={"total":{"revistasPresentesTri":$scope.revistasPresentesTri.length,"bibliasPresentesTri":$scope.bibliasPresentesTri.length,
			"presencaTri":$scope.presentesTri.length,"matriculadosTri":$scope.matriculadosTri.length}};
			$scope.mostraTrimestre = true;
		}else if($scope.relTrimestre.select == "4º Trimestre"){
			$scope.aulas.filter(function(elemento){
				var dataAula = new Date(elemento.data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(elemento.biblia == "presente" && mes > 9 && anoAtual == anoAula)	return $scope.bibliasPresentesTri.push(elemento)
			});


			$scope.aulas.filter(function(elemento){
				var dataAula = new Date(elemento.data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(elemento.revista == "presente" && mes > 9 && anoAtual == anoAula )	return $scope.revistasPresentesTri.push(elemento)
			});


			$scope.matriculadosTri = $scope.alunos.filter(function(elemento){
				var dataMatricula = new Date(elemento.created);
				var mes = dataMatricula.getMonth();
				if( mes > 9  ) return elemento
			})

			for(var i = 0; i<$scope.aulas.length;i++){
				var dataAula = new Date($scope.aulas[i].data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(mes > 9  && anoAtual == anoAula && anoAtual == anoAula){
					$scope.presentesTri.push($scope.aulas[i])
				}
			}

			$scope.trimestres={"total":{"revistasPresentesTri":$scope.revistasPresentesTri.length,"bibliasPresentesTri":$scope.bibliasPresentesTri.length,
			"presencaTri":$scope.presentesTri.length,"matriculadosTri":$scope.matriculadosTri.length}};
			$scope.mostraTrimestre = true;
		}
	}



	$scope.relatorioTrimestralIndividual = function(){
		$scope.trimestresInd=[];

		$scope.revistasPreTriInd=[]		
		$scope.bibliasPreTriInd=[]
		$scope.presentesTriInd=[]
		if($scope.relTrimestre.select == "1º Trimestre"){
			
			$scope.aulas.filter(function(elemento){
				var dataAula = new Date(elemento.data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(elemento.biblia == "presente" && mes < 4 && anoAtual == anoAula && $scope.turma.select.objectId == elemento.codTurma.objectId)	return $scope.bibliasPreTriInd.push(elemento)
			});


			$scope.aulas.filter(function(elemento){
				var dataAula = new Date(elemento.data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(elemento.revista == "presente" && mes < 4 && anoAtual == anoAula && $scope.turma.select.objectId == elemento.codTurma.objectId)	return $scope.revistasPreTriInd.push(elemento)
			});


			$scope.matriculadosTri = $scope.alunos.filter(function(elemento){
				var dataMatricula = new Date(elemento.created);
				var mes = dataMatricula.getMonth();
				
				if( mes  < 4 ) return elemento
			})

			for(var i = 0; i<$scope.aulas.length;i++){
				var dataAula = new Date($scope.aulas[i].data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(mes < 4 && anoAtual == anoAula && $scope.turma.select.objectId == $scope.aulas[i].codTurma.objectId){
					$scope.presentesTriInd.push($scope.aulas[i])
				}
			}

			$scope.trimestres={"total":{"revistasPresentesTri":$scope.revistasPresentesTri.length,"bibliasPresentesTri":$scope.bibliasPreTriInd.length,
			"presencaTri":$scope.presentesTriInd.length,"matriculadosTri":$scope.matriculadosTri.length}};
			$scope.mostraTrimestre = true;

		}else if($scope.relTrimestre.select == "2º Trimestre"){
			$scope.aulas.filter(function(elemento){
				var dataAula = new Date(elemento.data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(elemento.biblia == "presente" && mes < 7 && mes > 3 && anoAtual == anoAula && $scope.turma.select.objectId == elemento.codTurma.objectId)	return $scope.bibliasPreTriInd.push(elemento)
			});


			$scope.aulas.filter(function(elemento){
				var dataAula = new Date(elemento.data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(elemento.revista == "presente" && mes < 7 && mes > 3 && anoAtual == anoAula && $scope.turma.select.objectId == elemento.codTurma.objectId)	return $scope.revistasPreTriInd.push(elemento)
			});


			$scope.matriculadosTri = $scope.alunos.filter(function(elemento){
				var dataMatricula = new Date(elemento.created);
				var mes = dataMatricula.getMonth();
				if( mes < 7 && mes > 3 ) return elemento
			})

			for(var i = 0; i<$scope.aulas.length;i++){
				var dataAula = new Date($scope.aulas[i].data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(mes < 7 && mes > 3 && anoAtual == anoAula && $scope.turma.select.objectId == $scope.aulas[i].codTurma.objectId ){
					$scope.presentesTriInd.push($scope.aulas[i])
				}
			}

			$scope.trimestres={"total":{"revistasPresentesTri":$scope.revistasPreTriInd.length,"bibliasPresentesTri":$scope.bibliasPreTriInd.length,
			"presencaTri":$scope.presentesTriInd.length,"matriculadosTri":$scope.matriculadosTri.length}};
			$scope.mostraTrimestre = true;

		}else if($scope.relTrimestre.select == "3º Trimestre"){
			$scope.aulas.filter(function(elemento){
				var dataAula = new Date(elemento.data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(elemento.biblia == "presente" && mes < 10 && mes > 6 && anoAtual == anoAula && $scope.turma.select.objectId == elemento.codTurma.objectId)	return $scope.bibliasPreTriInd.push(elemento)
			});


			$scope.aulas.filter(function(elemento){
				var dataAula = new Date(elemento.data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(elemento.revista == "presente" && mes < 10 && mes > 6 && anoAtual == anoAula && $scope.turma.select.objectId == elemento.codTurma.objectId)	return $scope.revistasPreTriInd.push(elemento)
			});


			$scope.matriculadosTri = $scope.alunos.filter(function(elemento){
				var dataMatricula = new Date(elemento.created);
				var mes = dataMatricula.getMonth();
				if( mes < 10 && mes > 6  ) return elemento
			})

			for(var i = 0; i<$scope.aulas.length;i++){
				var dataAula = new Date($scope.aulas[i].data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(mes < 10 && mes > 6  && anoAtual == anoAula && $scope.turma.select.objectId == $scope.aulas[i].codTurma.objectId ){
					$scope.presentesTriInd.push($scope.aulas[i])
				}
			}

			$scope.trimestres={"total":{"revistasPresentesTri":$scope.revistasPreTriInd.length,"bibliasPresentesTri":$scope.bibliasPreTriInd.length,
			"presencaTri":$scope.presentesTriInd.length,"matriculadosTri":$scope.matriculadosTri.length}};
			$scope.mostraTrimestre = true;
		}else if($scope.relTrimestre.select == "4º Trimestre"){
			$scope.aulas.filter(function(elemento){
				var dataAula = new Date(elemento.data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(elemento.biblia == "presente" && mes > 9 && anoAtual == anoAula && $scope.turma.select.objectId == elemento.codTurma.objectId)	return $scope.bibliasPreTriInd.push(elemento)
			});


			$scope.aulas.filter(function(elemento){
				var dataAula = new Date(elemento.data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(elemento.revista == "presente" && mes > 9 && anoAtual == anoAula && $scope.turma.select.objectId == elemento.codTurma.objectId )	return $scope.revistasPreTriInd.push(elemento)
			});


			$scope.matriculadosTri = $scope.alunos.filter(function(elemento){
				var dataMatricula = new Date(elemento.created);
				var mes = dataMatricula.getMonth();
				if( mes > 9  ) return elemento
			})

			for(var i = 0; i<$scope.aulas.length;i++){
				var dataAula = new Date($scope.aulas[i].data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(mes > 9  && anoAtual == anoAula && anoAtual == anoAula && $scope.turma.select.objectId == elemento.codTurma.objectId){
					$scope.presentesTriInd.push($scope.aulas[i])
				}
			}

			$scope.trimestres={"total":{"revistasPresentesTri":$scope.revistasPreTriInd.length,"bibliasPresentesTri":$scope.bibliasPreTriInd.length,
			"presencaTri":$scope.presentesTriInd.length,"matriculadosTri":$scope.matriculadosTri.length}};
			$scope.mostraTrimestre = true;
		}
	}

	$scope.getAno = function(){
		$scope.anoRelatorio=[]
		var achou = 0;
		var aux;
		for(var i = 0; i< $scope.aulas.length;i++){
			

			var dataAula = new Date($scope.aulas[i].data);
			var anoAula = dataAula.getFullYear();
			var mesAula = dataAula.getMonth();

			if($scope.anoRelatorio.length == 0){
				
				$scope.anoRelatorio.push(anoAula)
			}else{
				for(var y =0; y < $scope.anoRelatorio.length;y++){
					if($scope.anoRelatorio[y] == anoAula){
						achou++
					}
				}
				if(achou < 1){
					$scope.anoRelatorio.push(anoAula)
				}
			}
			achou = 0;
		}

		var j = 0
		
		while(j < $scope.anoRelatorio.length ){
			if($scope.anoRelatorio[j] > $scope.anoRelatorio[j+1]){
				aux = $scope.anoRelatorio[j]
				$scope.anoRelatorio[j] = $scope.anoRelatorio[j+1]
				$scope.anoRelatorio[j+1] = aux
				j = 0;
			}else{
				j++
			}
		}
	}

	$scope.relatorioAnual = function(){
		$scope.bibliaPreAnual=[];
		$scope.anualIndividual=[];
		$scope.revistaPreAnual=[];
		// if(ano < $scope.relAnual.select || (ano == $scope.relAnual.select && mes == 12)){
			$scope.aulas.filter(function(elemento){
				var data = new Date(elemento.data);
				var ano = data.getFullYear(); 
				var mes = data.getMonth();
				if(elemento.biblia == "presentes" && ano == $scope.relAnual.select ){

					return $scope.bibliaPreAnual.push(elemento);
				}
			});

			$scope.aulas.filter(function(elemento){
				var data = new Date(elemento.data);
				var ano = data.getFullYear(); 
				var mes = data.getMonth();
				if(elemento.revista == "presentes" && ano == $scope.relAnual.select ){

					return $scope.revistaPreAnual.push(elemento);
				}
			});

			$scope.anualIndividual={"total":{"bibliaPreAnual":$scope.bibliaPreAnual.length,"revistaPreAnual":$scope.revistaPreAnual.length}};

		// }

		$scope.mostraAnual = true;
	}
	$scope.relatorioIndividual = function(){
		var achou = 0
		$scope.presencaindividual=[]
		$scope.matriculadosIndividual=[]
		$scope.bibliaPindividual=[]
		$scope.profindividual=[]
		$scope.bibliaPindividual = $scope.aulas.filter(function(elemento){
			if(elemento.biblia == "presente" && elemento.codTurma.objectId == $scope.turma.select.objectId && elemento.data == $scope.aul.dataSelecionada.data)	
				return elemento
		})

		$scope.revistaPindividual = $scope.aulas.filter(function(elemento){
			if(elemento.revista == "presente" && elemento.codTurma.objectId == $scope.turma.select.objectId && elemento.data == $scope.aul.dataSelecionada.data)	
				return elemento
		})

		for(var y = 0; y<$scope.alunos.length;y++){

			$scope.aulas.filter(function(elemento){
				if(elemento.codTurma.objectId == $scope.turma.select.objectId && elemento.data == $scope.aul.dataSelecionada.data && elemento.codAluno == $scope.alunos[y].objectId)	
					return $scope.presencaindividual.push($scope.alunos[y])
			})
		}


		for(var i =0;i<$scope.alunos.length;i++){

			$scope.aulas.filter(function(elemento){
				var dataMatriculados = new Date($scope.alunos[i].created);
				var data = new Date($scope.aul.dataSelecionada.data);
				if($scope.alunos[i].objectId == elemento.codAluno && dataMatriculados < data && $scope.turma.select.objectId == elemento.codTurma.objectId && $scope.matriculadosIndividual.length==0 && $scope.aul.dataSelecionada.data == elemento.data){
					$scope.matriculadosIndividual.push($scope.alunos[i])
				}
				else if($scope.alunos[i].objectId == elemento.codAluno && $scope.matriculadosIndividual.length > 0 && $scope.matriculadosIndividual.length < $scope.alunos.length && $scope.turma.select.objectId == elemento.codTurma.objectId && dataMatriculados < data && $scope.aul.dataSelecionada.data == elemento.data){
					for(var y=0;y<$scope.matriculadosIndividual.length;y++){
						if($scope.matriculadosIndividual[y].objectId == $scope.alunos[i].objectId ){
							achou++
						}
						if(achou < 1 && $scope.matriculadosIndividual[y].objectId != $scope.alunos[i].objectId){
							$scope.matriculadosIndividual.push($scope.alunos[i])

						}

					}

				}else{
					achou = 0;
				}

			})

}

$scope.profindividual = $scope.aulas.filter(function(elemento){
	if( elemento.codTurma.objectId == $scope.turma.select.objectId && elemento.data == $scope.aul.dataSelecionada.data)	
		return elemento
})
$scope.individual={"total":{"matriculadosIndividual":$scope.matriculadosIndividual.length,"bibliasPindividual":$scope.bibliaPindividual.length,
"revistaPindividual":$scope.revistaPindividual.length,"profindividual":$scope.profindividual[0].professor,"presencaindividual":$scope.presencaindividual.length}};
}

$scope.geral = function(){
	$scope.presencas=[];
	$scope.numero=[];
	$scope.presentes=[]
	$scope.bibliasPresentes=[]
	$scope.matriculadosGeral=[]
	$scope.revistasPresentes=[]

	$scope.presentes = $scope.aulas.filter(function(elemento){
		if(elemento.data == $scope.aul.dataSelecionada.data) return elemento
	})
	$scope.bibliasPresentes = $scope.aulas.filter(function(elemento){
		if(elemento.biblia == "presente" && elemento.data == $scope.aul.dataSelecionada.data)	return elemento
	})

	$scope.alunos.filter(function(elemento){
		var dataMatriculados = new Date(elemento.created);
		var data = new Date($scope.aul.dataSelecionada.data);
		if(data.getTime() > dataMatriculados.getTime()) return $scope.matriculadosGeral.push(elemento)
	})
	console.log($scope.matriculadosGeral);

	$scope.revistasPresentes = $scope.aulas.filter(function(elemento){
		if(elemento.revista == "presente"  && elemento.data == $scope.aul.dataSelecionada.data) return elemento
	})


	$scope.presencas={"total":{"bibliasPre":$scope.bibliasPresentes.length,
	"presenca":$scope.presentes.length,"revistasPre":$scope.revistasPresentes.length,"matriculadosGeral":$scope.matriculadosGeral.length}};
	$scope.mostra = true;
}

$scope.limpar = function(){
	var dt = document.getElementsByName("dataSelect");  
	for(var i = 0; i < dt.length;i++){
		dt[i].checked = false;
	}
	$scope.relatorios=[]
	$scope.presentes=[]
	$scope.turma = [];
	$scope.mostra = false;
	delete $scope.relatorio;

	$scope.tpRec.$setPristine();

}
$scope.colocaFalse = function(){
	var dt = document.getElementsByName("dataSelect");  
	for(var i = 0; i < dt.length;i++){
		dt[i].checked = false;

	}

}
$scope.carregarTurma();
$scope.carregarProfessor();
$scope.carregarAluno();
$scope.carregarTrimestre();
$scope.carregarAula();
});

