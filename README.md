# Week 6 — Weather Dashboard

**Repository:** `iyf-s12-week-06-Anthony-mugwe`  
**Author:** Anthony Mugwe  
**Project:** Live Weather Dashboard using HTML, CSS, JavaScript, Fetch API and OpenWeatherMap.

## Live Demo

Add your published GitHub Pages URL here after the first successful GitHub Actions deployment:

`https://anthony-mugwe.github.io/iyf-s12-week-06-Anthony-mugwe/`

## Features

- Search for a city using the Search button or Enter.
- Displays city/country, weather icon, temperature in Celsius, description, feels-like temperature, humidity, wind speed and pressure.
- Loading, unknown-city, invalid-key and network-error messages.
- Stores the five most recent successful searches in `localStorage`.
- Tap a recent city to search it again.
- Responsive layout for phones and desktops.
- Uses `async`/`await`, `try`/`catch`, `fetch()` and explicit `response.ok` checks.

## Project structure

```text
iyf-s12-week-06-Anthony-mugwe/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── daily-challenges/
│   ├── day-1-delay-promise.js
│   ├── day-2-promise-chain.js
│   ├── day-3-error-handling.js
│   ├── day-4-async-await.js
│   └── day-5-parallel-fetches.js
├── .gitignore
├── app.js
├── async-practice.js
├── config.example.js
├── config.js                 # local only; ignored by Git
├── index.html
├── README.md
└── styles.css
```

## Setup on your computer

1. Create a free OpenWeatherMap account at https://openweathermap.org/api and generate an API key.
2. Wait for the key to activate. A new key may take up to two hours.
3. Keep `.gitignore` in the project root and confirm it contains `config.js` **before the first commit**.
4. Open `config.js` and replace `PASTE_YOUR_OPENWEATHERMAP_KEY_HERE` with your key.
5. Open `index.html` with VS Code Live Server, or use a local web server.
6. Search for Nairobi or another city.

If you need to recreate the local config file, copy `config.example.js` to `config.js` and paste the key into the new local file.

## GitHub setup and deployment

1. Create a public repository named exactly `iyf-s12-week-06-Anthony-mugwe`.
2. Add the files and commit in small steps. Do not commit `config.js`.
3. In the repository, open **Settings → Secrets and variables → Actions → New repository secret**.
4. Set the secret name to `OPENWEATHER_API_KEY` and paste the OpenWeatherMap key as its value.
5. Open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
6. Push the `main` branch. The workflow creates `config.js` during deployment using the repository secret.
7. Wait for the Actions workflow to complete, open the Pages URL, and test a valid city and an invalid city in a private/incognito window.
8. Put the working live URL in the Live Demo section above.

## Important API-key security note

`config.js` is ignored by Git and is never part of your commits. GitHub Actions creates it from the repository secret only in the deployment artifact. However, a browser-based app must send its API key to OpenWeatherMap, so the key can be seen by visitors in browser developer tools/network requests after deployment. A GitHub Actions secret prevents accidental source-control commits; it does **not** make a client-side API key private. Use an OpenWeatherMap key restricted to the required API where possible, monitor usage, and rotate it if exposed. For a truly private key, requests must go through a backend proxy.

## Suggested commit plan

Make at least five meaningful commits across the week:

```bash
git add .gitignore config.example.js
git commit -m "chore: ignore local weather config"

git add index.html styles.css
git commit -m "feat: build responsive weather dashboard layout"

git add app.js
git commit -m "feat: fetch and display live weather data"

git add async-practice.js daily-challenges/
git commit -m "docs: complete async JavaScript practice and challenges"

git add .github/workflows/deploy.yml README.md
git commit -m "ci: deploy weather dashboard to GitHub Pages"
```

Before each commit, run:

```bash
git status
git check-ignore config.js
```

If `git check-ignore config.js` does not print `config.js`, stop and fix `.gitignore` before committing.

## Troubleshooting

- **API key missing:** confirm `config.js` exists locally and is loaded before `app.js`.
- **401 Unauthorized:** check the key and allow time for activation.
- **404 City not found:** check the spelling or try a nearby larger city.
- **Network error:** check your internet connection.
- **GitHub Actions fails:** confirm `OPENWEATHER_API_KEY` is set and Pages source is GitHub Actions.

## Submission

Submit exactly one link in the course link field:

`https://github.com/Anthony-mugwe/iyf-s12-week-06-Anthony-mugwe`

Submit the repository link, not the live site. Do not submit a ZIP or file attachment. Test the repository link in a private/incognito window before turning in.
