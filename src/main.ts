import * as core from '@actions/core'
import { openRelease } from './utils/keygen-utils'
import { ReleaseChannel } from './models/open-release/release-channel'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const releaseName = core.getInput('release-name', { required: true })
    const keygenToken: string = core.getInput('keygen-token', {
      required: true
    })
    const releaseChannel: string = core.getInput('release-channel', {
      required: true
    })
    const githubTag: string = core.getInput('github-tag', { required: true })
    const keygenProductID: string = core.getInput('keygen-product-id', {
      required: true
    })
    const keygenPackageID: string = core.getInput('keygen-package-id', {
      required: true
    })
    const keygenAccountID: string = core.getInput('keygen-account-id', {
      required: true
    })

    core.setSecret(keygenToken)
    core.setSecret(keygenProductID)
    core.setSecret(keygenPackageID)
    core.setSecret(keygenAccountID)
    //Open the release
    const releaseID = await openRelease(
      githubTag,
      releaseChannel as ReleaseChannel,
      releaseName,
      keygenProductID,
      keygenToken,
      keygenAccountID
    )

    //Output release ID
    core.setOutput('release-id', releaseID)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
