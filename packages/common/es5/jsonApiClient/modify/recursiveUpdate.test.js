'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./update'),
    update = _require.update,
    dep = _require.dep;

describe('jsonApiClient/update/update', function () {
  it('is a function', function () {
    expect(typeof update === 'undefined' ? 'undefined' : (0, _typeof3.default)(update)).toEqual('function');
  });
  it('exports dev', function () {
    expect(typeof dep === 'undefined' ? 'undefined' : (0, _typeof3.default)(dep)).toEqual('object');
  });

  describe('with dependor', function () {
    var createWithRelationshipsMock = void 0;
    beforeEach(function () {
      createWithRelationshipsMock = jest.fn();
      dep.freeze();
      dep.mock({
        createWithRelationships: function createWithRelationships() {
          createWithRelationshipsMock.apply(undefined, arguments);
        }
      });
    });
    afterAll(function () {
      dep.reset();
    });
    it('Call createWithRelationships with expected arguments', function () {
      var openApiClient = {};
      var resourceType = 'specimen';
      var userOptions = {
        body: {}
      };
      update({ openApiClient: openApiClient, resourceType: resourceType, userOptions: userOptions });
      expect(createWithRelationshipsMock.mock.calls.length).toEqual(1);
      expect(createWithRelationshipsMock.mock.calls[0][0]).toEqual({
        openApiClient: {},
        resource: {},
        resourceType: 'specimen'
      });
    });
    it('Add id to resource', function () {
      var openApiClient = {};
      var resourceType = 'specimen';
      var userOptions = {
        body: {
          attributes: {
            a: 2
          }
        },
        pathParams: {
          id: 2
        }
      };
      update({ openApiClient: openApiClient, resourceType: resourceType, userOptions: userOptions });
      expect(createWithRelationshipsMock.mock.calls.length).toEqual(1);
      expect(createWithRelationshipsMock.mock.calls[0][0]).toEqual({
        openApiClient: {},
        resource: { attributes: { a: 2 }, id: 2 },
        resourceType: 'specimen'
      });
    });
  });
});