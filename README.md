# Portfolio

Static site, no build step needed. Three files: `index.html`, `styles.css`, `script.js`.

## Before you publish

Open `index.html` and update the placeholders in the contact table (Sheet 6) and title block (Sheet 1):
- Email address
- LinkedIn URL
- GitHub URL
- Add your last name if you want one on the page

## Publish with GitHub Pages

1. Create a new repo on GitHub — for a **user site**, name it exactly `your-username.github.io`. For a **project site**, any name works.
2. Push these three files (plus this README) to the repo:
   ```
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```
3. On GitHub: go to **Settings → Pages**.
4. Under **Source**, choose the `main` branch and `/ (root)` folder, then save.
5. GitHub gives you a URL in a minute or two:
   - User site → `https://your-username.github.io`
   - Project site → `https://your-username.github.io/your-repo`

No further config needed — it's plain HTML/CSS/JS.
