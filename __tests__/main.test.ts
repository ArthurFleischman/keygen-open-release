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
let debugMock: jest.SpyInstance
let errorMock: jest.SpyInstance
let getInputMock: jest.SpyInstance
let setFailedMock: jest.SpyInstance
let setOutputMock: jest.SpyInstance
let release_id = "";

describe('action', () => {
  // beforeAll(async () => {
  //   const response = await fetch(`https://api.keygen.sh/v1/accounts/${process.env.KEYGEN_ACCOUNT_ID}/environments`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/vnd.api+json",
  //       "Accept": "application/vnd.api+json",
  //       "Authorization": `Bearer ${process.env.KEYGEN_ADMIN_TOKEN}`
  //     },
  //     body: JSON.stringify({
  //       "data": {
  //         "type": "environments",
  //         "attributes": {
  //           "name": "Sandbox Environment",
  //           "code": "sandbox"
  //         }
  //       }
  //     })
  //   })

  //   const { data, errors } = await response.json()
  //   console.log(data);
  //   environment_id = data.data.id;
  //   console.log(errors)
  // })
  beforeEach(() => {
    jest.clearAllMocks()

    debugMock = jest.spyOn(core, 'debug').mockImplementation()
    errorMock = jest.spyOn(core, 'error').mockImplementation()
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
        case 'keygen-product-id':
          return env.KEYGEN_PRODUCT_ID!;
        case 'release-name':
          return 'test-release';
        case 'release-channel':
          return 'dev';
        case 'github-tag':
          return 'v1.0.0';
        default:
          return '';
      }
    });
    await main.run();
    expect(openReleaseMock).toHaveBeenCalled()
    expect(setOutputMock).toHaveBeenCalled()

  })

  //   it('sets the time output', async () => {
  //     // Set the action's inputs as return values from core.getInput()
  //     getInputMock.mockImplementation((name: string): string => {
  //       switch (name) {
  //         case 'milliseconds':
  //           return '500'
  //         default:
  //           return ''
  //       }
  //     })

  //     await main.run()
  //     expect(runMock).toHaveReturned()

  //     // Verify that all of the core library functions were called correctly
  //     expect(debugMock).toHaveBeenNthCalledWith(1, 'Waiting 500 milliseconds ...')
  //     expect(debugMock).toHaveBeenNthCalledWith(
  //       2,
  //       expect.stringMatching(timeRegex)
  //     )
  //     expect(debugMock).toHaveBeenNthCalledWith(
  //       3,
  //       expect.stringMatching(timeRegex)
  //     )
  //     expect(setOutputMock).toHaveBeenNthCalledWith(
  //       1,
  //       'time',
  //       expect.stringMatching(timeRegex)
  //     )
  //     expect(errorMock).not.toHaveBeenCalled()
  //   })

  //   it('sets a failed status', async () => {
  //     // Set the action's inputs as return values from core.getInput()
  //     getInputMock.mockImplementation((name: string): string => {
  //       switch (name) {
  //         case 'milliseconds':
  //           return 'this is not a number'
  //         default:
  //           return ''
  //       }
  //     })

  //     await main.run()
  //     expect(runMock).toHaveReturned()

  //     // Verify that all of the core library functions were called correctly
  //     expect(setFailedMock).toHaveBeenNthCalledWith(
  //       1,
  //       'milliseconds not a number'
  //     )
  //     expect(errorMock).not.toHaveBeenCalled()
  //   })
  // })
})
