import { gql } from 'graphql-request';

const token = (symbol) => gql`
  query tokens {
    tokens(where:{ symbol: "${symbol}"}, orderBy: tradeVolume, orderDirection: desc) {
      id,
      symbol,
      totalSupply,
      name,
      tradeVolume,
    }
  }
`;

export default token;
