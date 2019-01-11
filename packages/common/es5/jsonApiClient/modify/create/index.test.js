'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createOpenApiMockClient = require('../../../openApiClient/utilities/createOpenApiMockClient');

var _require = require('./index'),
    create = _require.create,
    dep = _require.dep;

describe('jsonApiClient/modify/create', function () {
  it('exports function create', function () {
    expect(typeof create === 'undefined' ? 'undefined' : (0, _typeof3.default)(create)).toEqual('function');
  });
  it('exports object dep', function () {
    expect(typeof dep === 'undefined' ? 'undefined' : (0, _typeof3.default)(dep)).toEqual('object');
  });

  it('rejects if openApiClient not provided', function () {
    expect.assertions(1);
    return expect(create({
      item: {
        type: 'user'
      }
    })).rejects.toThrow('provide openApiClient');
  });

  it('rejects if item not provided', function () {
    expect.assertions(1);
    return expect(create({
      openApiClient: {}
    })).rejects.toThrow('item required');
  });

  it('rejects if type not provided in item', function () {
    expect.assertions(1);
    return expect(create({
      item: {},
      openApiClient: {}
    })).rejects.toThrow('type is required');
  });

  it('rejects if item with id provided', function () {
    expect.assertions(1);
    return expect(create({
      item: {
        id: 2,
        type: 'user'
      },
      openApiClient: {}
    })).rejects.toThrow('not allowed to create with id');
  });

  describe('with dependor', function () {
    var depSpies = void 0;
    var openApiClient = void 0;
    beforeEach(function () {
      depSpies = dep.createSpies({
        buildOperationId: function buildOperationId() {
          return 'operationId';
        }
      });
      openApiClient = createOpenApiMockClient({
        call: function call() {
          return 'apiResponse';
        }
      });
    });

    it('call buildOperationId and openApiClient', function () {
      expect.assertions(6);
      var item = {
        attributes: {
          name: 'Alan'
        },
        type: 'user'
      };
      return create({
        item: item,
        openApiClient: openApiClient
      }).then(function (res) {
        expect(depSpies.buildOperationId.mock.calls.length).toEqual(1);
        expect(depSpies.buildOperationId.mock.calls[0][0]).toEqual({
          operationType: 'create',
          resource: 'user'
        });
        expect(openApiClient.spies.call.mock.calls.length).toEqual(1);
        expect(openApiClient.spies.call.mock.calls[0][0]).toEqual('operationId');
        expect(openApiClient.spies.call.mock.calls[0][1]).toEqual({
          body: { data: item }
        });

        expect(res).toBe('apiResponse');
      });
    });
  });
});