# Intro

This is a bare minimum iiif simple search server.

It's designed as a simple demo service that could be run in code space

The service will search all annotations placed in the data folder and return search result annotations.

At present there is no indexing, so this will not scale well. 

However, it should be sufficient to run in code a space and then link via demo manifest to get a sense of how the ecoystem works.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main)

# Start

Once the code space is started run

`node app.js`

# Adding data

Simple drop your annotation lists into the data folder

# Connecting to manifest

Once running in code space, allow code space to open in browser. Find the running url. Something like the following

`https://musical-space-fishstick-7v5rxp4wr9cxjvg-3000.app.github.dev`

Add this to your manifest service block, like so:

```json
    "service": {
        "@context": "http://iiif.io/api/search/1/context.json",
        "@id": "https://musical-space-fishstick-7v5rxp4wr9cxjvg-3000.app.github.dev",
        "profile": "http://iiif.io/api/search/1/search",
        "label": "Search within this manifest"
    },
  ```

  And then serve your manifest.

  If everything goes well, you should be able to load this manifest into a viewer like Mirador and search your annotations.