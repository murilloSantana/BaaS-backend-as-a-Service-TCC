app.controller('ctrlTurma', function ($scope,turmasAPI,$window,professoresAPI,alunosAPI,revistasAPI,trimestresAPI,aulasAPI,$timeout,servicesAPI) {
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
	$scope.carregarRelatorioSemanal = function(){
		servicesAPI.getRelatorioSemanal().success(function (response) {
			$scope.relatorioSemanal = response.data;


		});
	}
	$scope.carregarRelatorioAnual= function(){
		servicesAPI.getRelatorioAnual().success(function (response) {
			$scope.relatorioAnual = response.data;


		});
	}
	$scope.carregarRelatorioTrimestral = function(){
		servicesAPI.getRelatorioTrimestral().success(function (response) {
			$scope.relatorioTrim = response.data;


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
				"nome":$scope.revista.nome,
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
			if(diferenca < 1 && diferenca > -8) return elemento;
		});

		$scope.quantidade = $scope.aniversario.length
	}

	$scope.contains = function (aulas) {

		$scope.datas=[];
		var verdadeiro = 0
		for(var i = 0; i < $scope.aulas.length; i++){
			if($scope.datas.length == 0 ){
				$scope.datas.push($scope.aulas[i]);			
			}else{
				for(var j = 0; j < $scope.datas.length; j++){
					if($scope.datas[j].data == $scope.aulas[i].data){
						verdadeiro ++
					}
				}
				

				if(verdadeiro < 1){
					$scope.datas.push($scope.aulas[i]);
				}
				verdadeiro =0;
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
		$scope.matriculadosTrimestre=[]
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



			$scope.alunos.filter(function(elemento){
				var dataA = new Date();
				var dataAtual = new Date("April 01,"+ dataA.getFullYear());
				if( elemento.created < dataAtual.getTime()  && elemento.selecionado == true ) return $scope.matriculadosTrimestre.push(elemento)
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
			"presencaTri":$scope.presentesTri.length,"matriculadosTri":$scope.matriculadosTrimestre.length}};
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


			$scope.matriculadosTrimestre =[]
			$scope.alunos.filter(function(elemento){
				var dataA = new Date();
				var dataFim = new Date("July 01,"+ dataA.getFullYear());

				if(  elemento.created < dataFim.getTime() && elemento.selecionado == true ) return $scope.matriculadosTrimestre.push(elemento)
			})
			console.log($scope.matriculadosTrimestre);

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
			"presencaTri":$scope.presentesTri.length,"matriculadosTri":$scope.matriculadosTrimestre.length}};
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


			$scope.alunos.filter(function(elemento){
				var dataA = new Date();
				var dataFim = new Date("October 01,"+ dataA.getFullYear());

				if(  elemento.created < dataFim.getTime() && elemento.selecionado == true ) return $scope.matriculadosTrimestre.push(elemento)
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
			"presencaTri":$scope.presentesTri.length,"matriculadosTri":$scope.matriculadosTrimestre.length}};
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



			$scope.alunos.filter(function(elemento){
				var dataA = new Date();
				var dataFim = new Date("December 31,"+ dataA.getFullYear());

				if(  elemento.created < dataFim.getTime() && elemento.selecionado == true ) return$scope.matriculadosTrimestre.push(elemento)
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
			"presencaTri":$scope.presentesTri.length,"matriculadosTri":$scope.matriculadosTrimestre.length}};
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
				if(elemento.revista == "presente" && mes < 4 && anoAtual == anoAula )	return $scope.revistasPreTriInd.push(elemento)
			});

			$scope.alunos.filter(function(elemento){
				var dataA = new Date();
				var dataAtual = new Date("April 01,"+ dataA.getFullYear());
				if( elemento.created < dataAtual.getTime()  && elemento.selecionado == true && $scope.turma.select.aluTurma[i].objectId == elemento.objectId) return  $scope.matriculadosTri.push(elemento)
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

			$scope.trimestresInd={"total":{"revistasPresentesTri":$scope.revistasPresentesTri.length,"bibliasPresentesTri":$scope.bibliasPreTriInd.length,
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

			$scope.matriculadosTri=[]
			$scope.aulas.filter(function(elemento){
				var dataAula = new Date(elemento.data);
				var mes = dataAula.getMonth();
				var dataAtual = new Date();
				var anoAtual = dataAtual.getFullYear();
				var anoAula = dataAula.getFullYear();
				if(elemento.revista == "presente" && mes < 7 && mes > 3 && anoAtual == anoAula && $scope.turma.select.objectId == elemento.codTurma.objectId)	return $scope.revistasPreTriInd.push(elemento)
			});


			for(var i = 0; i < $scope.alunos.length;i++){
				var dataA = new Date();
				var dataFim = new Date("July 01,"+ dataA.getFullYear());
				for (var j = 0; j <$scope.turma.select.aluTurma.length; j++) {
					if(  $scope.alunos[i].created < dataFim.getTime() && $scope.alunos[i].selecionado == true  ){
						if($scope.turma.select.aluTurma[j].objectId == $scope.alunos[i].objectId){
							$scope.matriculadosTri.push($scope.alunos[i])

						}
					}
				};

			}				
			$scope.triProf=[]

			$scope.professorTrimestral=[]
			var profAchado = false
			
			// $scope.aulas.filter(function(elemento) {
			// 	if($scope.professorTrimestral.length == 0){
			// 		$scope.professorTrimestral.push(elemento.professor);
			// 	}else{
			// 		for (var i = 0; i < $scope.professorTrimestral.length; i++) {
			// 			if(elemento.professor == $scope.professorTrimestral[i]){
			// 				profAchado=true

			// 			};
			// 		}
			// 	}if(profAchado == false){
			// 		$scope.professorTrimestral.push(elemento.professor)
			// 	}
			// 	profAchado = false;
			// });

for (var j = 0; j < $scope.aulas.length; j++) {
	if($scope.professorTrimestral.length == 0){
		$scope.professorTrimestral.push($scope.aulas[j].professor);
	}else{
		for (var i = 0; i < $scope.professorTrimestral.length; i++) {
			if($scope.aulas[j].professor == $scope.professorTrimestral[i]){
				profAchado=true

			};
		}
		if(profAchado == false){
			$scope.professorTrimestral.push($scope.aulas[j].professor)
		}
	}
	profAchado = false;

};

for(var i = 0; i<$scope.aulas.length;i++){
	var dataAula = new Date($scope.aulas[i].data);
	var mes = dataAula.getMonth();
	var dataAtual = new Date();
	var anoAtual = dataAtual.getFullYear();
	var anoAula = dataAula.getFullYear();
	if(mes < 7 && mes > 3 && anoAtual == anoAula &&  $scope.turma.select.objectId == $scope.aulas[i].codTurma.objectId ){
		$scope.presentesTriInd.push($scope.aulas[i])
	}
}

$scope.trimestresInd={"total":{"revistasPresentesTri":$scope.revistasPreTriInd.length,"bibliasPresentesTri":$scope.bibliasPreTriInd.length,
"presencaTri":$scope.presentesTriInd.length,"matriculadosTri":$scope.matriculadosTri.length,"profTrimestral":$scope.professorTrimestral}};
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
		var dataA = new Date();
		var dataFim = new Date("October 01,"+ dataA.getFullYear());

		if(  elemento.created < dataFim.getTime() && elemento.selecionado == true ) return elemento
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

	$scope.trimestresInd={"total":{"revistasPresentesTri":$scope.revistasPreTriInd.length,"bibliasPresentesTri":$scope.bibliasPreTriInd.length,
	"presencaTri":$scope.presentesTriInd.length,"matriculadosTri":$scope.matriculadosTri.length}}
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
		var dataA = new Date();
		var dataFim = new Date("December 31,"+ dataA.getFullYear());

		if(  elemento.creadte < dataFim.getTime() && elemento.selecionado == true ) return elemento
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

	$scope.trimestresInd={"total":{"revistasPresentesTri":$scope.revistasPreTriInd.length,"bibliasPresentesTri":$scope.bibliasPreTriInd.length,
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
	$scope.anual=[];
	$scope.revistaPreAnual=[];
	$scope.presentesAnual=[];
	$scope.matriculadosAnual=[];
	var data = new Date();

	var ano = data.getFullYear(); 
	var mes = data.getMonth();
	if(ano < $scope.relAnual.select || (ano == $scope.relAnual.select && mes == 12)){
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

		for(var i = 0; i<$scope.aulas.length;i++){
			var dataAula = new Date($scope.aulas[i].data);
			var anoAula = dataAula.getFullYear();
			if($scope.relAnual.select == anoAula){
				$scope.presentesAnual.push($scope.aulas[i])
			}
		}

		$scope.alunos.filter(function(elemento){
			var dataMatriculados = new Date(elemento.created);
			var anoMatriculados = dataMatriculados.getFullYear();
			var data = new Date($scope.relAnual.select);
			if( elemento.selecionado == true && anoMatriculados <= data ) return $scope.matriculadosAnual.push(elemento)
		})
		$scope.anual={"total":{"matriculadosAnual":$scope.matriculadosAnual.length,"presentesAnual":$scope.presentesAnual.length,"bibliaPreAnual":$scope.bibliaPreAnual.length,"revistaPreAnual":$scope.revistaPreAnual.length}};
		$scope.mostraAnual = true;

	}else{
		alert("Fora do periodo para gerar relatório anual")
	}

}

$scope.relatorioAnualIndividual = function(){

	$scope.bibliaAnualInd=[];
	$scope.anualIndividual=[];
	$scope.revistaPreAnual=[];
	$scope.presentesAnual=[];
	$scope.matriculadosIndAnual=[];
	var data = new Date();

	var ano = data.getFullYear(); 
	var mes = data.getMonth();
	if(ano < $scope.relAnual.select || (ano == $scope.relAnual.select && mes == 12)){			$scope.aulas.filter(function(elemento){
		var data = new Date(elemento.data);
		var ano = data.getFullYear(); 
		var mes = data.getMonth();
		if(elemento.biblia == "presentes" && ano == $scope.relAnual.select && $scope.turma.select.objectId == elemento.codTurma.objectId){

			return $scope.bibliaPreAnual.push(elemento);
		}
	});

		$scope.aulas.filter(function(elemento){
			var data = new Date(elemento.data);
			var ano = data.getFullYear(); 
			var mes = data.getMonth();
			if(elemento.revista == "presentes" && ano == $scope.relAnual.select && $scope.turma.select.objectId == elemento.codTurma.objectId){

				return $scope.revistaPreAnual.push(elemento);
			}
		});

		for(var i = 0; i<$scope.aulas.length;i++){
			var dataAula = new Date($scope.aulas[i].data);
			var anoAula = dataAula.getFullYear();
			if($scope.relAnual.select == anoAula && $scope.turma.select.objectId == $scope.aulas[i].codTurma.objectId){
				$scope.presentesAnual.push($scope.aulas[i])
			}
		}

		for(var i =0;i<$scope.alunos.length;i++){
			var dataAluno = new Date($scope.alunos[i].created);
			var anoAluno = dataAluno.getFullYear();
			var dataAno = new Date();
			var ano = dataAno.getFullYear();
			$scope.aulas.filter(function(elemento){

				if(anoAluno <= ano && $scope.alunos[i].selecionado == true && $scope.alunos[i].objectId == elemento.codAluno &&  $scope.turma.select.objectId == elemento.codTurma.objectId && $scope.matriculadosIndAnual.length==0){
					$scope.matriculadosIndAnual.push($scope.alunos[i])
				}
				else if(anoAluno <= ano && $scope.alunos[i].selecionado == true && $scope.alunos[i].objectId == elemento.codAluno && $scope.matriculadosIndAnual.length > 0 && $scope.turma.select.objectId == elemento.codTurma.objectId){
					for(var y=0;y<$scope.matriculadosIndAnual.length;y++){
						if($scope.matriculadosIndAnual[y].objectId == $scope.alunos[i].objectId ){
							achou++
						}


					}
					if(achou < 1){
						$scope.matriculadosIndAnual.push($scope.alunos[i])

					}

				}else{
					achou = 0;
				}

			})
		}

		$scope.anualIndividual={"total":{"matriculadosIndAnual":$scope.matriculadosIndAnual.length,"presentesAnual":$scope.presentesAnual.length,"bibliaPreAnual":$scope.bibliaPreAnual.length,"revistaPreAnual":$scope.revistaPreAnual.length}};
		$scope.mostraAnual = true;

	}else{
		alert("Fora do periodo para gerar relatório anual")
	}

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



	for(var i = 0; i < $scope.alunos.length;i++){
		var dataA = new Date();
		var dataFim = new Date("July 01,"+ dataA.getFullYear());
		for (var j = 0; j <$scope.turma.select.aluTurma.length; j++) {
			if(  $scope.alunos[i].created < dataFim.getTime() && $scope.alunos[i].selecionado == true  ){
				if($scope.turma.select.aluTurma[j].objectId == $scope.alunos[i].objectId){
					$scope.matriculadosIndividual.push($scope.alunos[i])

				}
			}
		};

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
	$scope.carregarRelatorioSemanal();

	$scope.presentes = $scope.aulas.filter(function(elemento){
		if(elemento.data == $scope.aul.dataSelecionada.data) return elemento
	})
	$scope.bibliasPresentes = $scope.aulas.filter(function(elemento){
		if(elemento.biblia == "presente" && elemento.data == $scope.aul.dataSelecionada.data)	return elemento
	})

	$scope.alunos.filter(function(elemento){
		var dataMatriculados = new Date(elemento.created);
		dataMatriculados.setDate(dataMatriculados.getDate()-1)
		var data = new Date($scope.aul.dataSelecionada.data);
		if( elemento.selecionado == true && data > dataMatriculados) return $scope.matriculadosGeral.push(elemento)
	})

	$scope.revistasPresentes = $scope.aulas.filter(function(elemento){
		if(elemento.revista == "presente"  && elemento.data == $scope.aul.dataSelecionada.data) return elemento
	})


	$scope.presencas={"total":{"bibliasPre":$scope.bibliasPresentes.length,
	"presenca":$scope.presentes.length,"revistasPre":$scope.revistasPresentes.length,"matriculadosGeral":$scope.matriculadosGeral.length}};
	$scope.mostra = true;
}

$scope.limpar = function(){
	$scope.carregarRelatorioSemanal();

	$scope.individual=[]
	$scope.presencas=[]
	$scope.turma = [];
	$scope.mostra = false;
	$scope.mostraAnual = false;
	$scope.mostraTrimestre=false;
	$scope.trimestres=[]
	$scope.anualIndividual=[]
	delete $scope.relatorio;
	delete $scope.relTrimestre
	delete $scope.aul
	delete $scope.relAnual
	$scope.tpRec.$setPristine();

}
$scope.gerar = function(){

	for (var i = 0; i < $scope.relatorioSemanal.length; i++) {
		if($scope.relatorioSemanal.length==0){
			servicesAPI.deleteRelatorioSemanal($scope.relatorioSemanal[0].objectId).success(function (response,data) {

			});
		}else{

			servicesAPI.deleteRelatorioSemanal($scope.relatorioSemanal[i].objectId).success(function (response,data) {
			});
		}
	};
	if($scope.turma.select == null){
		$scope.saveRelatorioSemanal()
	}else if($scope.turma.select != null){
		$scope.saveRelatorioSemanalIndividual()
	}

}

$scope.gerarTri = function(){

	for (var i = 0; i < $scope.relatorioTrim.length; i++) {
		if($scope.relatorioTrim.length==0){
			servicesAPI.deleteRelatorioTrimestral($scope.relatorioTrim[0].objectId).success(function (response,data) {

			});
		}else{

			servicesAPI.deleteRelatorioTrimestral($scope.relatorioTrim[i].objectId).success(function (response,data) {
				console.log(data);

			});
		}
	};
	if($scope.turma.select == null){
		$scope.saveRelatorioTrimestral()
	}else if($scope.turma.select != null){
		$scope.saveRelatorioTrimestralIndividual()
	}

}
dataNome = new Date();
var _canvas = null;

$(function() {

	$("#downlad").on("click", function(e) {
		e.preventDefault();

		html2canvas($("#downloadsemana").get(0), {
			onrendered: function(canvas) {

				var imgData = canvas.toDataURL('image/png');
				console.log('Report Image URL: '+imgData);
				var doc = new jsPDF('landscape');

				doc.addImage(imgData, 'PNG', 10, 0, 290, 115);
				doc.save("relatório-"+dataNome.getTime());
			}
		});
	});
})

$scope.saveRelatorioSemanal = function(){
	presencas={
		"matriculadosGeral":$scope.presencas.total.matriculadosGeral,
		"presenca":$scope.presencas.total.presenca,
		"bibliasPre":$scope.presencas.total.bibliasPre,
		"revistasPre":$scope.presencas.total.revistasPre

	}


	servicesAPI.setRelatorioSemanal(presencas).success(function(data){
		window.location.reload()

		window.open("/Tcc/index.html#/relatorioSemanal",'_blank')

	}).error(function(data){

	});

}

$scope.saveRelatorioSemanalIndividual = function(){
	presencas={
		"matriculadosGeral":$scope.individual.total.matriculadosIndividual,
		"presencaindividual":$scope.individual.total.presencaindividual,
		"bibliasPre":$scope.individual.total.bibliasPindividual,
		"revistasPre":$scope.individual.total.revistaPindividual,
		"profindividual":$scope.individual.total.profindividual
	}


	servicesAPI.setRelatorioSemanal(presencas).success(function(data){
		window.location.reload()

		window.open("/Tcc/index.html#/relatorioSemanalTurma",'_blank')

	}).error(function(data){

	});

}

$scope.saveRelatorioTrimestral = function(){
	presencas={
		"matriculadosTri":$scope.trimestres.total.matriculadosTri,
		"presencaTri":$scope.trimestres.total.presencaTri,
		"bibliasPresentesTri":$scope.trimestres.total.bibliasPresentesTri,
		"revistasPresentesTri":$scope.trimestres.total.revistasPresentesTri,
	}


	servicesAPI.setRelatorioTrimestral(presencas).success(function(data){
		window.location.reload()

		window.open("/Tcc/index.html#/relatorioTrimestral",'_blank')

	}).error(function(data){

	});

}

$scope.saveRelatorioTrimestralIndividual= function(){
	presencas={
		"matriculadosTriGeral":$scope.trimestresInd.total.matriculadosTri,
		"presencaTriindividual":$scope.trimestresInd.total.presencaTri,
		"bibliasTriPre":$scope.trimestresInd.total.bibliasPresentesTri,
		"revistasTriPre":$scope.trimestresInd.total.revistasPresentesTri,
	}


	servicesAPI.setRelatorioTrimestral(presencas).success(function(data){
		window.location.reload()


		window.open("/Tcc/index.html#/relatorioTrimestralTurma",'_blank')

	}).error(function(data){

	});

}

$scope.saveRelatorioAnual= function(){
	presencas={
		"matriculadosGeral":$scope.individual.total.matriculadosIndividual,
		"presencaindividual":$scope.individual.total.presencaindividual,
		"bibliasPre":$scope.individual.total.bibliasPindividual,
		"revistasPre":$scope.individual.total.revistaPindividual,
		"profindividual":$scope.individual.total.profindividual
	}


	servicesAPI.setRelatorioSemanal(presencas).success(function(data){
		window.location.reload()

		window.open("/Tcc/index.html#/relatorioSemanalIndividual",'_blank')

	}).error(function(data){

	});

}
$scope.saveRelatorioAnualIndividual = function(){
	presencas={
		"matriculadosGeral":$scope.individual.total.matriculadosIndividual,
		"presencaindividual":$scope.individual.total.presencaindividual,
		"bibliasPre":$scope.individual.total.bibliasPindividual,
		"revistasPre":$scope.individual.total.revistaPindividual,
		"profindividual":$scope.individual.total.profindividual
	}


	servicesAPI.setRelatorioSemanal(presencas).success(function(data){
		window.location.reload()

		window.open("/Tcc/index.html#/relatorioSemanalIndividual",'_blank')

	}).error(function(data){

	});

}
$scope.carregarTurma();
$scope.carregarRelatorioSemanal();
$scope.carregarRelatorioTrimestral();

$scope.carregarProfessor();
$scope.carregarAluno();
$scope.carregarTrimestre();
$scope.carregarAula();
});

