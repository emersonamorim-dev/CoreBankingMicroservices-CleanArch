const AWS = require('aws-sdk');

class DynamoServiceRegistry {
  constructor() {
    this.dynamoDb = new AWS.DynamoDB.DocumentClient({
      region: 'us-west-2',
      endpoint: process.env.DYNAMO_URL || 'http://localhost:8001',
      accessKeyId: 'fakeAccessKeyId',
      secretAccessKey: 'fakeSecretAccessKey',
    });

    this.dynamoDBRaw = new AWS.DynamoDB({
      region: 'us-west-2',
      endpoint: process.env.DYNAMO_URL || 'http://localhost:8001',
      accessKeyId: 'fakeAccessKeyId',
      secretAccessKey: 'fakeSecretAccessKey',
    });

    this.tableName = 'services';
  }

  async ensureTableExists() {
    const params = {
      TableName: this.tableName,
    };
  
    try {
      await this.dynamoDBRaw.describeTable(params).promise();
      console.log(`Tabela ${this.tableName} já existe.`);
    } catch (err) {
      if (err.code === 'ResourceNotFoundException') {
        // Se a tabela não existir, cria a tabela
        const createTableParams = {
          TableName: this.tableName,
          KeySchema: [
            { AttributeName: 'name', KeyType: 'HASH' },  // Chave primária HASH
            { AttributeName: 'port', KeyType: 'RANGE' },  // Chave primária RANGE
          ],
          AttributeDefinitions: [
            { AttributeName: 'name', AttributeType: 'S' }, // 'S' para string
            { AttributeName: 'port', AttributeType: 'N' }, // 'N' para número
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        };
  
        await this.dynamoDBRaw.createTable(createTableParams).promise();
        console.log(`Tabela ${this.tableName} criada com sucesso.`);
      } else {
        throw err;
      }
    }
  }
  

// Registra ou atualiza um serviço
async registerService(serviceData) {
    await this.ensureTableExists(); 
  
    const params = {
      TableName: this.tableName,
      Item: {
        name: serviceData.name,
        host: serviceData.host,
        port: serviceData.port,
        status: serviceData.status || 'active',
        region: serviceData.region || 'global', 
      },
    };
  
    return this.dynamoDb.put(params).promise();
  }
  

  async getAllServices() {
    await this.ensureTableExists();

    const params = {
      TableName: this.tableName,
    };

    const result = await this.dynamoDb.scan(params).promise();
    return result.Items;
  }

  async removeService(name, port) {
    await this.ensureTableExists();

    const params = {
      TableName: this.tableName,
      Key: {
        name: name,
        port: port,
      },
    };

    return this.dynamoDb.delete(params).promise();
  }
}

module.exports = DynamoServiceRegistry;
