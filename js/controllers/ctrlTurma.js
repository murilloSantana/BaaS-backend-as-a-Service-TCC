app.controller('ctrlTurma', function ($scope,turmasAPI,$window,professoresAPI,alunosAPI,revistasAPI,trimestresAPI,aulasAPI) {
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	var turmas = [];
	$scope.alunos = [];
	$scope.professores = [];
	$scope.perPagePresets = [10,15,25,50]
	$scope.tipoRelatorio = ["Semanal","Trimestral","Anual"];
	$scope.datas=[];

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
	$scope.excluirTurma = function(turma,objectId){
		turmasAPI.deleteTurma(turma.objectId).success(function (response,data) {
			$scope.carregarTurma();
			alert("Turma excluida com sucesso");
			console.log(data);
		});
	}

	$scope.editarTurma = function(turma,aluno){

		turma={
			"nome":turma.nome,
			"turmaTrimestre": 
			[{

				"___class":"Trimestres",
				"dataInicio": $scope.trimestre.dataInicio,
				"dataFim":$scope.trimestre.dataFim,
				"periodo":$scope.trimestre.periodo
			}]

		};		
		turmasAPI.updateTurma($scope.turma.objectId,turma).success(function(response,data){
			alert("Turma editada com sucesso");
			console.log(data);
		});


	}
	$scope.mudaBtn = function(){
		$scope.salva = true;
		$scope.edita = false;
		$scope.carregar = false;
		$scope.mostraRevista = false;


	}

	$scope.editTurma = function(turma,professor){
		$scope.turma = turma;
		$scope.professor = professor;
		$scope.edita = true;
		$scope.salva = false;
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
			$window.alert("Revista cadastrada com sucesso")

			$window.location.reload();

			console.log(data);


		})

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
			$window.alert("Turma cadastrada com sucesso")

			$window.location.reload();

			console.log(data);


		})


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
				alert("Fora do periodo do fechamento do trimestre!")
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
				alert("Fora do periodo do fechamento de trimestre!")
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
				alert("Fora do periodo do fechamento de trimestre!")
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
				alert("Fora do periodo do fechamento de trimestre!")
			}
		}
		if(verficar){
			turmasAPI.updateTurma($scope.turma.selecionada.objectId,turma).success(function(response,data){
				alert("Trimestre fechado com sucesso");
				$scope.carregarTurma();
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
			alert("Esta turma não possui professor")
			$window.location.reload()
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
			alert("Professor removido da turma");
			$window.location.reload();
			console.log(data);
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
			if(diferenca < 0 && diferenca > -8) return elemento;
		});
		// for (var i = 0; i < $scope.aniversario.length; i++) {
		// 	var dataFormatada = new Date($scope.aniversario[i].dtNascimento);

		// 	var dia = dataFormatada.getDate();
		// 	if (dia.toString().length == 1)
		// 		dia = "0"+dia;
		// 	var mes = dataFormatada.getMonth()+1;
		// 	if (mes.toString().length == 1)
		// 		mes = "0"+mes;
		// 	var ano = dataFormatada.getFullYear();  
		// 	$scope.aniversario.push(dia+"/"+mes+"/"+ano) ;
		// };
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

	$scope.gerarRelatorio = function(aul){
		$scope.nova=[]
		for (var i = 0; i < $scope.datas.length; i++) {
			if(aul.dataSelecionada == true){
				$scope.nova.push($scope.datas[i])
			}
		};

		
	}




	$scope.relatorioIndividual = function(){
		$scope.presencaindividual=[]
		$scope.matriculadosIndividual=[]
		$scope.bibliaPindividual = $scope.aulas.filter(function(elemento){
			if(elemento.biblia == "presente" && elemento.codTurma.objectId == $scope.turma.select.objectId && elemento.data == $scope.nova[0].data)	
				return elemento
		})

		$scope.revistaPindividual = $scope.aulas.filter(function(elemento){
			if(elemento.revista == "presente" && elemento.codTurma.objectId == $scope.turma.select.objectId && elemento.data == $scope.nova[0].data)	
				return elemento
		})
		for(var i =0; i < $scope.alunos.length; i++){
			for(var y = 0; y<$scope.turmas.length;y++){
				if($scope.turmas[y].aluTurma[0].objectId == $scope.alunos[i].objectId)	{
					$scope.matriculadosIndividual.push($scope.alunos[i])
				}
			}
		}

		for(var i =0;i<$scope.alunos.length;i++){

			$scope.aulas.filter(function(elemento){
				if($scope.alunos[i].objectId == elemento.codAluno) return $scope.presencaindividual.push($scope.alunos[i])
			})
		}
		console.log($scope.presencaindividual);
		$scope.profindividual = $scope.aulas.filter(function(elemento){
			if( elemento.codTurma.objectId == $scope.turma.select.objectId && elemento.data == $scope.nova[0].data)	
				return elemento
		})
		$scope.individual={"total":{"matriculadosIndividual":$scope.matriculadosIndividual.length,"bibliasPindividual":$scope.bibliaPindividual.length,
		"revistaPindividual":$scope.revistaPindividual.length,"profindividual":$scope.profindividual[0].professor,"presencaindividual":$scope.presencaindividual.length}};
	}

	$scope.geral = function(){
		$scope.presencas=[];
		$scope.numero=[];

		for(var i = 0; i<$scope.aulas.length;i++){
			if($scope.aulas[i].data == $scope.nova[0].data){
				$scope.presentes.push($scope.aulas[i])
			}
		}

		$scope.bibliasPresentes = $scope.aulas.filter(function(elemento){
			if(elemento.biblia == "presente")	return elemento
		})

		$scope.matriculadosGeral = $scope.alunos.filter(function(elemento){
			return elemento
		})


		$scope.revistasPresentes = $scope.aulas.filter(function(elemento){
			if(elemento.revista == "presente") return elemento
		})


		$scope.presencas={"total":{"bibliasPre":$scope.bibliasPresentes.length,
		"presenca":$scope.presentes.length,"revistasPre":$scope.revistasPresentes.length,"matriculadosGeral":$scope.matriculadosGeral.length}};
		$scope.mostra = true;

	}

	$scope.limpar = function(){
		$scope.relatorios=[]
		$scope.presentes=[]
		$scope.datas=[];
		$scope.turma = [];
		$scope.mostra = false;
		delete $scope.relatorio;

		$scope.tpRec.$setPristine();

	}
	$scope.carregarTurma();
	$scope.carregarProfessor();
	$scope.carregarAluno();
	$scope.carregarTrimestre();
	$scope.carregarAula();
});

