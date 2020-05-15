# upload-artifact-as-is

Inspired by [actions/upload-artifact](https://github.com/actions/upload-artifact). The credit goes there. 🏅

This GitHub Action uploads build artifacts, but unlike the original [actions/upload-artifact](https://github.com/actions/upload-artifact) GitHub Action, this one does not require the desired artifact `name`, but uses the original name of the files for the uploads. No artifact name customization is possible.

## Inputs

### `path`

**Required** A file, directory or wildcard pattern that describes what to upload.

## Example usage

```yaml
    - uses: kittaakos/upload-artifact-as-is@v1
    with:
        path: path/to/artifactDir/ # or path/to/artifactDir or path/to/artifactFile or path/to/**/wildcard/*
```
