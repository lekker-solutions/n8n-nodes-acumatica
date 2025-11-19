import {
    DefaultResourceParser,
    DefaultOperationParser
} from '@devlikeapro/n8n-openapi-node';
import { OpenAPIV3 } from 'openapi-types';
import * as lodash from 'lodash';

export class AcumaticaResourceParser extends DefaultResourceParser {
    // Extract entity names from paths like "/{entity}"
    getResources(document: OpenAPIV3.Document): Array<{ name: string, value: string, description: string }> {
        const entities = new Set<string>();

        // Parse paths to extract entity names
        Object.keys(document.paths).forEach(path => {
            // Match patterns like /SalesOrder, /Customer, etc.
            const match = path.match(/^\/([A-Z][a-zA-Z]+)(?:\/|$)/);
            if (match && match[1] !== 'entity') {
                entities.add(match[1]);
            }
        });

        return Array.from(entities).sort().map(entity => ({
            name: lodash.startCase(entity),
            value: entity,
            description: `Operations for ${lodash.startCase(entity)}`
        }));
    }
}

export class AcumaticaOperationParser extends DefaultOperationParser {
    name(operation: OpenAPIV3.OperationObject, context: any): string {
        const method = context.method.toUpperCase();

        switch (method) {
            case 'GET':
                return operation.operationId?.includes('GetList') ? 'Get List' : 'Get';
            case 'PUT':
                return 'Insert/Update';
            case 'DELETE':
                return 'Delete';
            case 'POST':
                // Handle action endpoints
                return operation.operationId?.includes('action') ? 'Execute Action' : 'Create';
            default:
                return lodash.startCase(method);
        }
    }

    value(operation: OpenAPIV3.OperationObject, context: any): string {
        const method = context.method.toLowerCase();

        switch (method) {
            case 'get':
                return operation.operationId?.includes('GetList') ? 'getList' : 'get';
            case 'put':
                return 'upsert';
            case 'delete':
                return 'delete';
            case 'post':
                return operation.operationId?.includes('action') ? 'action' : 'create';
            default:
                return method;
        }
    }

    action(operation: OpenAPIV3.OperationObject, context: any): string {
        return this.name(operation, context);
    }
}