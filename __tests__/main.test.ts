/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../src/main'
import * as keygenUtils from '../src/utils/keygen-utils'
import { env } from 'node:process';





// Mock the action's main function
const runMock = jest.spyOn(main, 'run')
const openReleaseMock = jest.spyOn(keygenUtils, 'openRelease');

// Other utilities
const timeRegex = /^\d{2}:\d{2}:\d{2}/

// Mock the GitHub Actions core library
// let debugMock: jest.SpyInstance
// let errorMock: jest.SpyInstance
let getInputMock: jest.SpyInstance
let setFailedMock: jest.SpyInstance
let setOutputMock: jest.SpyInstance

describe('action', () => {

  beforeEach(() => {
    jest.clearAllMocks()

    // debugMock = jest.spyOn(core, 'debug').mockImplementation()
    // errorMock = jest.spyOn(core, 'error').mockImplementation()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
    setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
    setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()
  })

  it('checks for release to be oppened', async () => {
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'keygen-token':
          return env.KEYGEN_TOKEN!;
        case 'keygen-account-id':
          return env.KEYGEN_ACCOUNT_ID!;
        case 'keygen-package-id':
          return env.KEYGEN_PACKAGE_ID!;
        case 'keygen-productID':
          return env.KEYGEN_PRODUCT_ID!;
        case 'release-name':
          return 'test-release';
        case 'release-channel':
          return 'dev';
        case 'githubTag':
          return 'v1.0.0';
        default:
          return '';
      }
    });
    await main.run();
    expect(openReleaseMock).toHaveBeenCalled()
    expect(setOutputMock).toHaveBeenCalled()

  })
})
