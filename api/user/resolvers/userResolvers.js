const { GraphQLScalarType } = require("graphql");

const userResolvers = {
	// QUANDO EH O MESMO VALOR NAO PRECISARIA FAZER ESSE MAPEAMENTO
	// ESTOU COLOCANDO APENAS PRA SABER QUE O VALOR PODERIA SER OUTRO CASO NECESSARIO
	RolesType: {
		ESTUDANTE: "ESTUDANTE",
		DOCENTE: "DOCENTE",
		COORDENACAO: "COORDENACAO",
	},
	DateTime: new GraphQLScalarType({
		name: "DateTime",
		description: "String de data e hora no formato ISO-8601",
		serialize: (value) => value.toISOString(),
		parseValue: (value) => new Date(value),
		parseLiteral: (ast) => new Date(ast.value),
	}),
	Query: {
		users: (root, args, { dataSources }) => dataSources.usersAPI.getUsers(),
		user: (root, { id }, { dataSources }) =>
			dataSources.usersAPI.getUserById(id),
	},
	Mutation: {
		adicionaUser: async (root, { user }, { dataSources }) =>
			dataSources.usersAPI.adicionaUser(user),
		atualizaUser: async (root, novosDados, { dataSources }) =>
			dataSources.usersAPI.atualizaUser(novosDados),
		deletaUser: async (root, { id }, { dataSources }) =>
			dataSources.usersAPI.deletaUser(id),
	},
};

module.exports = userResolvers;
