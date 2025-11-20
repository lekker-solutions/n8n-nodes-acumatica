import {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class AcumaticaOAuth2Api implements ICredentialType {
    name = 'acumaticaOAuth2Api';
    displayName = 'Acumatica OAuth2 API';
    documentationUrl = 'https://help.acumatica.com/';
    extends = ['oAuth2Api'];  // ← Fixed: no ?, correct name

    properties: INodeProperties[] = [
        {
            displayName: 'Grant Type',
            name: 'grantType',
            type: 'hidden',
            default: 'authorizationCode',
        },
        {
            displayName: 'Acumatica Instance URL',
            name: 'url',
            type: 'string',
            default: '',
            placeholder: 'https://yourinstance.acumatica.com/TenantName',
            description: 'Base URL of your Acumatica instance (including tenant path)',
            required: true,
        },
        {
            displayName: 'Client ID',
            name: 'clientId',
            type: 'string',
            default: '',
            placeholder: '88358B02-A48D-A50E-F710-39C1636C30F6@MyTenant',
            description: 'Client ID with tenant suffix (e.g., GUID@TenantName)',
            required: true,
        },
        {
            displayName: 'Client Secret',
            name: 'clientSecret',
            type: 'string',
            typeOptions: {
                password: true,
            },
            default: '',
            required: true,
        },
        {
            displayName: 'Authorization URL',
            name: 'authUrl',
            type: 'hidden',
            default: '={{$credentials.url}}/identity/connect/authorize',
            required: true,
        },
        {
            displayName: 'Access Token URL',
            name: 'accessTokenUrl',
            type: 'hidden',
            default: '={{$credentials.url}}/identity/connect/token',
            required: true,
        },
        {
            displayName: 'Scope',
            name: 'scope',
            type: 'hidden',
            default: 'api offline_access',
        },
        {
            displayName: 'Auth URI Query Parameters',
            name: 'authQueryParameters',
            type: 'hidden',
            default: '',
        },
        {
            displayName: 'Authentication',
            name: 'authentication',
            type: 'hidden',
            default: 'body',
        },
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                Authorization: '=Bearer {{$credentials.oauthTokenData.access_token}}',
            },
        },
    };

    test: ICredentialTestRequest = {
        request: {
            baseURL: '={{$credentials?.url}}',
            url: '/entity/Default/25.200.001',
            method: 'GET',
        },
    };
}