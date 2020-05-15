import * as core from '@actions/core'
import { create, UploadOptions } from '@actions/artifact'
import { basename } from 'path'
import { Inputs } from './constants'
import { findFilesToUpload } from './search'

async function run(): Promise<void> {
    try {
        const path = core.getInput(Inputs.Path, { required: true })

        const searchResult = await findFilesToUpload(path)
        if (searchResult.filesToUpload.length === 0) {
            core.warning(
                `No files were found for the provided path: ${path}. No artifacts will be uploaded.`
            )
        } else {
            core.info(
                `With the provided path, there will be ${searchResult.filesToUpload.length} files uploaded`
            )
            core.debug(`Root artifact directory is ${searchResult.rootDirectory}`)

            const artifactClient = create()
            const options: UploadOptions = {
                continueOnError: true
            }
            for (const file of searchResult.filesToUpload) {
                core.debug(`Uploading ${file} as ${basename(file)}`)
                await artifactClient.uploadArtifact(
                    basename(file),
                    [file],
                    searchResult.rootDirectory,
                    options
                )
            }

            core.info('Artifact upload has finished successfully!')
        }
    } catch (err) {
        core.setFailed(err.message)
    }
}

run()
