import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

let apolloClientInstance: ApolloClient<any>;

export default class ApolloClientSingleton {

    private _apolloClient: ApolloClient<any>
    private static apolloClientSingleton: ApolloClientSingleton
    private static _token: string

    private constructor() {
        this._apolloClient = apolloClient()
    }

    public static getInstance(): ApolloClientSingleton {
        if (!this.apolloClientSingleton) {
            this.apolloClientSingleton = new ApolloClientSingleton()
        }
        return this.apolloClientSingleton
    }

    public get apolloClient() {
        return this._apolloClient
    }
}

const apolloClient = () => {
    const link = new HttpLink({
        uri: process.env.REACT_APP_GRAPHQL_ENDPOINT || "https://content-redfish-61.hasura.app/v1/graphql",
    });
    apolloClientInstance = new ApolloClient({
        link: link,
        cache: new InMemoryCache(),
    })
    return apolloClientInstance
}