# iPad 1st Generation IPA Archive Web App

A static GitHub Pages web app for browsing classic iPad-era apps designed for the original iPad and iOS 2.x–5.x devices.

## Features

- Search by app name or bundle ID
- Filter by minimum iOS version
- Sort by name, version, or minimum iOS
- Browse a curated archive of classic IPA entries
- Download placeholder IPA files from the `ipa/` directory
- Ready to deploy to GitHub Pages
- Compatible with GitHub Codespaces

## Local development

```bash
cd /workspaces/animal
python3 -m http.server 8000
```

Then visit http://localhost:8000

## GitHub Pages deployment

1. Push this repository to GitHub.
2. Open the repository settings.
3. Navigate to Pages.
4. Set Source to GitHub Actions or Deploy from Branch.
5. Use the root folder (`/`) for the static site.

## GitHub Codespaces

Open the repository in Codespaces, then run:

```bash
python3 -m http.server 8000
```
