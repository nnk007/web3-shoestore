import { GraphQLScalarType, Kind } from 'graphql';

export const ISODateScalar = new GraphQLScalarType({
    name: 'ISO_DATE',
    description: 'RFC3339/ISO8601 Date format',
    serialize(value) {
        if (value instanceof Date) {
            const m = value.getUTCMonth()+1;
            const d = value.getUTCDay();
            return `${value.getUTCFullYear()}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`;
        }
        throw Error('GraphQL ISO Date Scalar serializer expected a `Date` object');
    },
    parseValue(value) {
        if (typeof value == 'string') {
            if (!/\d{4}-\d{2}-\d{2}/.test(value)) throw new Error(`GraphQL ISO Date Scalar parser expected an 'ISO Date'`);
            const [year, month, day] = value.split('-').map(v => Number.parseInt(v));
            return new Date(`${year}-${month}-${day}Z`);
        }
        throw new Error('GraphQL ISO Date Scalar parser expected a `string`');
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            // Convert hard-coded AST string to integer and then to Date
            if (!/\d{4}-\d{2}-\d{2}/.test(ast.value)) return null;
            const [year, month, day] = ast.value.split('-').map(v => Number.parseInt(v));
            return new Date(`${year}-${month}-${day}Z`);
        }
        // Invalid hard-coded value (not an integer)
        return null;
    },
});