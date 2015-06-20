app.config(["$routeProvider","$locationProvider", function ($routeProvider,$locationProvider) {

	$routeProvider
	.when("/login", {
		templateUrl: "/Tcc/login.html",
		controller: "ctrlUsuario"
	})
	.when("/aluno", {
		templateUrl: "/Tcc/aluno.html",
		controller: "ctrlAluno"
	})
	.when("/aluTurma", {
		templateUrl: "/Tcc/aluno.html",
		controller: "ctrlAluno"
	})
	.when("/professor", {
		templateUrl: "/Tcc/professor.html",
		controller: "ctrlProfessor"
	})
	.when("/profTurma", {
		templateUrl: "/Tcc/professor.html",
		controller: "ctrlProfessor"
	})
	.when("/turma", {
		templateUrl: "/Tcc/turma.html",
		controller: "ctrlTurma"
	})
	.when("/aula", {
		templateUrl: "/Tcc/aula.html",
		controller: "ctrlAula"
	})
	.when("/cadastro", {
		templateUrl: "/Tcc/registro.html",
		controller: "ctrlUsuario"
	})
	.when("/senha", {
		templateUrl: "/Tcc/login.html",
		controller: "ctrlUsuario"
	})
	.when("/modalRevista", {
		templateUrl: "/Tcc/turma.html",
		controller: "ctrlTurma"
	})
	.when("/configuracao", {
		templateUrl: "/Tcc/configuracao.html",
		controller: "ctrlUsuario"
	})
	.when("/home", {
		templateUrl: "/Tcc/home.html",
		controller: "ctrlTurma"
	})
	.otherwise({ redirectTo: "/login" });

}]);