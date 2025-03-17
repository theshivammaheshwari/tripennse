# Tripennse

## Overview
Tripennse is a simple and interactive trip expense tracker that helps you and your friends split expenses efficiently. It ensures a fair distribution of costs among all participants, making trip expense management seamless.

## Features
- **Add People**: Add trip members dynamically.
- **Record Expenses**: Log expenses along with the payer and shared users.
- **Automatic Calculation**: Calculates individual shares and net amounts.
- **Interactive UI**: Enhanced UI with animations and structured layout.
- **Expense Breakdown**: Shows detailed expense distribution.

## How to Use
1. **Add People**: Enter the names of the participants.
2. **Add Expenses**: Select the payer, enter the item name, amount, and select users who shared the item.
3. **View Expense Table**: Displays all expenses along with the participants.
4. **Check Individual Expenses**: Calculates the net amount each participant owes or is owed.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/theshivammaheshwari/tripennse.git
   cd tripennse
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   npm start
   ```

## Deployment
To deploy the project, run:
```sh
npm run deploy
```
### Deploying to GitHub Pages
1. Ensure that your `package.json` has the following fields:

```json
"homepage": "https://yourusername.github.io/tripennse",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

2. Run the following command:

```sh
npm run deploy
```

### Common Deployment Issue & Fixes
#### `Error: spawn E2BIG`
If you face this error while deploying:
1. Try clearing the build folder:
   ```sh
   rm -rf build
   ```
2. Rebuild and deploy again:
   ```sh
   npm run build && npm run deploy
   ```

If the issue persists, make sure you have `gh-pages` installed globally:
```sh
npm install -g gh-pages
```

## Technologies Used
- React.js
- Tailwind CSS
- Framer Motion (for animations)

## Contribution
Feel free to contribute by submitting a pull request. Ensure your changes align with the project's goals.

## License
This project is open-source and available under the Indian License.

