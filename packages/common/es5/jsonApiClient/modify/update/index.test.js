'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createOpenApiMockClient = require('../../../openApiClient/utilities/createOpenApiMockClient');

var _require = require('./index'),
    update = _require.update,
    dep = _require.dep;

describe('jsonApiClient/modify/update', function () {
  it('exports function update', function () {
    expect(typeof update === 'undefined' ? 'undefined' : (0, _typeof3.default)(update)).toEqual('function');
  });
  it('exports dep', function () {
    expect(typeof dep === 'undefined' ? 'undefined' : (0, _typeof3.default)(dep)).toEqual('object');
  });

  it('rejects if openApiClient not provided', function () {
    expect.assertions(1);
    return expect(update({
      item: {
        id: '123',
        type: 'user'
      }
    })).rejects.toThrow('provide openApiClient');
  });

  it('rejects if item not provided', function () {
    expect.assertions(1);
    return expect(update({
      openApiClient: {}
    })).rejects.toThrow('item required');
  });

  it('rejects if type not provided in item', function () {
    expect.assertions(1);
    return expect(update({
      item: {
        attributes: {
          name: 'Alan'
        },
        id: '123'
      },
      openApiClient: {}
    })).rejects.toThrow('type is required');
  });

  it('rejects if item id not provided', function () {
    expect.assertions(1);
    return expect(update({
      item: {
        attributes: {
          name: 'Alan'
        },
        type: 'user'
      },
      openApiClient: {}
    })).rejects.toThrow('id is required');
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
        id: '123',
        type: 'user'
      };
      return update({
        item: item,
        openApiClient: openApiClient
      }).then(function (res) {
        expect(depSpies.buildOperationId.mock.calls.length).toEqual(1);
        expect(depSpies.buildOperationId.mock.calls[0][0]).toEqual({
          operationType: 'update',
          resource: 'user'
        });
        expect(openApiClient.spies.call.mock.calls.length).toEqual(1);
        expect(openApiClient.spies.call.mock.calls[0][0]).toEqual('operationId');
        expect(openApiClient.spies.call.mock.calls[0][1]).toEqual({
          body: { data: item },
          pathParams: {
            id: item.id
          }
        });

        expect(res).toBe('apiResponse');
      });
    });
  });
});