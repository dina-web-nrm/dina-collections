'use strict';

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./index'),
    createJsonApiClient = _require.createJsonApiClient,
    dep = _require.dep;

describe('jsonApiClient', function () {
  it('exports function', function () {
    expect(typeof createJsonApiClient === 'undefined' ? 'undefined' : (0, _typeof3.default)(createJsonApiClient)).toEqual('function');
  });
  it('returns object with expected keys as functions', function () {
    var jsonApiClient = createJsonApiClient({
      apiConfigInput: {},
      createEndpoint: function createEndpoint() {
        return {};
      }
    });

    expect((0, _keys2.default)(jsonApiClient).sort()).toEqual(['call', 'create', 'getMany', 'getOne', 'update']);
    (0, _values2.default)(jsonApiClient).forEach(function (val) {
      expect(typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)).toEqual('function');
    });
  });

  describe('with dependor', function () {
    var depSpies = void 0;
    var openApiClient = void 0;
    beforeEach(function () {
      openApiClient = {
        call: jest.fn(function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return args;
        })
      };
      depSpies = dep.createSpies({
        createOpenApiClient: jest.fn(function () {
          return openApiClient;
        })
      });
    });
    afterAll(function () {
      dep.reset();
    });

    it('calls createOpenApiClient', function () {
      var input = { apiConfigInput: {}, createEndpoint: function createEndpoint() {} };

      createJsonApiClient(input);

      expect(depSpies.createOpenApiClient).toHaveBeenCalled();
      expect(depSpies.createOpenApiClient).toHaveBeenCalledWith(input);
    });

    it('calls openApiClient.call', function () {
      var input = { apiConfigInput: {}, createEndpoint: function createEndpoint() {} };
      var jsonApiClient = createJsonApiClient(input);

      jsonApiClient.call('placeGetOne');

      expect(openApiClient.call).toHaveBeenCalled();
      expect(openApiClient.call).toHaveBeenCalledWith('placeGetOne');
    });

    it('calls jsonApiUpdate with resourcesToModify based on resourceType', function () {
      var input = { apiConfigInput: {}, createEndpoint: function createEndpoint() {} };
      var jsonApiClient = createJsonApiClient(input);

      jsonApiClient.update('agent', {
        body: {
          data: {
            id: '1'
          }
        }
      });

      expect(depSpies.jsonApiUpdate).toHaveBeenCalled();
      expect(depSpies.jsonApiUpdate).toHaveBeenCalledWith({
        item: { id: '1' },
        openApiClient: openApiClient,
        resourcesToModify: ['agent'],
        resourceType: 'agent'
      });
    });

    it('calls jsonApiCreate with custom resourcesToModify', function () {
      var input = { apiConfigInput: {}, createEndpoint: function createEndpoint() {} };
      var jsonApiClient = createJsonApiClient(input);

      jsonApiClient.create('agent', {
        body: {
          data: {
            age: 30
          }
        },
        resourcesToModify: ['agent', 'user']
      });

      expect(depSpies.jsonApiCreate).toHaveBeenCalled();
      expect(depSpies.jsonApiCreate).toHaveBeenCalledWith({
        item: { age: 30 },
        openApiClient: openApiClient,
        resourcesToModify: ['agent', 'user'],
        resourceType: 'agent'
      });
    });

    it('calls jsonApiCreate with custom resourcesToModify', function () {
      var input = { apiConfigInput: {}, createEndpoint: function createEndpoint() {} };
      var jsonApiClient = createJsonApiClient(input);

      jsonApiClient.create('agent', {
        body: {
          data: {
            age: 30
          }
        },
        resourcesToModify: ['agent', 'user']
      });

      expect(depSpies.jsonApiCreate).toHaveBeenCalled();
      expect(depSpies.jsonApiCreate).toHaveBeenCalledWith({
        item: { age: 30 },
        openApiClient: openApiClient,
        resourcesToModify: ['agent', 'user'],
        resourceType: 'agent'
      });
    });

    it('calls jsonApiGetOne', function () {
      var input = { apiConfigInput: {}, createEndpoint: function createEndpoint() {} };
      var jsonApiClient = createJsonApiClient(input);

      jsonApiClient.getOne('agent', {
        queryParams: {
          filter: {
            age: 30
          }
        }
      });

      expect(depSpies.jsonApiGetOne).toHaveBeenCalled();
      expect(depSpies.jsonApiGetOne).toHaveBeenCalledWith({
        openApiClient: openApiClient,
        resourceType: 'agent',
        userOptions: {
          queryParams: {
            filter: {
              age: 30
            }
          }
        }
      });
    });

    it('calls jsonApiGetMany', function () {
      var input = { apiConfigInput: {}, createEndpoint: function createEndpoint() {} };
      var jsonApiClient = createJsonApiClient(input);

      jsonApiClient.getMany('agent', {
        queryParams: {
          limit: 10
        }
      });

      expect(depSpies.jsonApiGetMany).toHaveBeenCalled();
      expect(depSpies.jsonApiGetMany).toHaveBeenCalledWith({
        openApiClient: openApiClient,
        resourceType: 'agent',
        userOptions: {
          queryParams: {
            limit: 10
          }
        }
      });
    });
  });
});