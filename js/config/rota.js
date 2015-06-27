app.config(["$routeProvider","$locationProvider", function ($routeProvider,$locationProvider) {
	
	
	$routeProvider
	.when("/login", {
		templateUrl: "/Tcc/views/usuario/login.html",
		controller: "ctrlUsuario"
	})
	.when("/aluno", {
		templateUrl: "/Tcc/views/aluno/aluno.html",
		controller: "ctrlAluno"
	})
	.when("/aluTurma", {
		templateUrl: "/Tcc/views/aluno/aluno.html",
		controller: "ctrlAluno"
	})
	.when("/professor", {
		templateUrl: "/Tcc/views/professor/professor.html",
		controller: "ctrlProfessor"
	})
	.when("/profTurma", {
		templateUrl: "/Tcc/views/professor/professor.html",
		controller: "ctrlProfessor"
	})
	.when("/turma", {
		templateUrl: "/Tcc/views/turma/turma.html",
		controller: "ctrlTurma"
	})
	.when("/aula", {
		templateUrl: "/Tcc/views/aula/aula.html",
		controller: "ctrlAula"
	})
	.when("/cadastro", {
		templateUrl: "/Tcc/views/usuario/registro.html",
		controller: "ctrlUsuario"
	})
	.when("/senha", {
		templateUrl: "/Tcc/views/usuario/login.html",
		controller: "ctrlUsuario"
	})
	.when("/modalRevista", {
		templateUrl: "/Tcc/views/turma/turma.html",
		controller: "ctrlTurma"
	})
	.when("/configuracao", {
		templateUrl: "/Tcc/views/usuario/configuracao.html",
		controller: "ctrlUsuario"
	})
	.when("/home", {
		templateUrl: "/Tcc/views/home/home.html",
		controller: "ctrlTurma"
	})
	.when("/relatorioSemanal", {
		templateUrl: "/Tcc/views/relatorios/semanal.html",
		controller: "ctrlTurma"
	})
	.when("/relatorioSemanalTurma", {
		templateUrl: "/Tcc/views/relatorios/semanalIndividual.html",
		controller: "ctrlTurma"
	})
	.when("/relatorioTrimestral", {
		templateUrl: "/Tcc/views/relatorios/trimestral.html",
		controller: "ctrlTurma"
	})
	.when("/relatorioTrimestralTurma", {
		templateUrl: "/Tcc/views/relatorios/trimestralIndividual.html",
		controller: "ctrlTurma"
	})
	.otherwise({ redirectTo: "/login" });

}]);