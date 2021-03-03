const assert = require('assert');
const uuid = require('uuid');
const sinon = require('sinon');

const {backup} = require('..');

const MockAdapter = require("axios-mock-adapter");
const axios = require("axios");

const mock = new MockAdapter(axios, {onNoMatch: "throwException"});

describe('functions_helloworld_storage', () => {
    mock.onGet(/\/users/).reply(200,
        [],
    );
    mock.onGet(/\/roles/).reply(200,
        [],
    );

    const stubConsole = function () {
        sinon.stub(console, 'error');
        sinon.stub(console, 'log');
    };

    const restoreConsole = function () {
        console.log.restore();
        console.error.restore();
    };

    // beforeEach(stubConsole);
    // afterEach(restoreConsole);

    it('helloGCS: should print out event', async () => {
        // Initialize mocks
        const filename = uuid.v4();
        const req = {
            query: {},
            body: {},
        };
        const res = {json: sinon.stub()};

        // Call tested function and verify its behavior
        await backup(req, res);
        let BUCKET_NAME = "ons-blaise-v2-dev-nisra-test"
        assert.ok(res.json.calledOnce);
        assert.deepStrictEqual(res.json.firstCall.args, ["Complete"]);
        // assert.ok(console.log.calledWith(`Start backup`));
        // assert.ok(console.log.calledWith(`Failed to upload  to bucket`));
        // assert.ok(console.log.calledWith(`Uploaded file  to bucket ${BUCKET_NAME}`));
        // assert.ok(console.log.calledWith(`  File: ${filename}`));
        // assert.ok(console.log.calledWith(`  Event Type: ${eventType}`));
    });
});