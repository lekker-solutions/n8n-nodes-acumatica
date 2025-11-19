import { INodeType, INodeTypeDescription, NodeConnectionTypes } from 'n8n-workflow';
import { N8NPropertiesBuilder } from '@devlikeapro/n8n-openapi-node';
import { AcumaticaResourceParser } from '../../parsers/AcumaticaResourceParser';
import { AcumaticaOperationParser } from '../../parsers/AcumaticaOperationParser';
import * as doc from './swagger.json';

const parser = new N8NPropertiesBuilder(doc, {
  resource: new AcumaticaResourceParser(),
  operation: new AcumaticaOperationParser()
});
const properties = parser.build();

export class ACM_Default_25_200_001 implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Acumatica API - Endpoint Default 25 200 001',
    name: 'acumaticaDefault25200001',
    icon: 'file:acu.png',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with Acumatica Endpoint Default/25.200.001',
    defaults: { name: 'Your Service' },
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    credentials: [{ name: 'acumaticaOAuth2Api', required: true }],
    requestDefaults: {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      baseURL: '={{$credentials.url}}',
    },
    properties: properties,
  };
}