---
title: Wyverion Discord & JSONCloud
---

<style>
  /* Set background color to dark theme */
  body {
    background-color: #1e1e1e; /* Dark background */
    color: #dcdcdc; /* Light text color */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #fff; /* White headings */
  }

  a {
    color: #1e90ff; /* Blue links like in VS */
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  code, pre {
    background-color: #2d2d2d; /* Dark background for code */
    color: #dcdcdc; /* Light color for code */
    padding: 5px;
    border-radius: 4px;
  }

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
  }
</style>

# **Wyverion Discord & JSONCloud**
**Publisher**: Wyverion 2025 (c)<br>
<small>**Developer**: Wyvern</small>
---

<img src="../assets/icon.png" alt="Discord Logo" style="display: block; margin-left: auto; margin-right: auto; margin-top: -25px; margin-bottom: -50px" />

## 📋 **Requirements**:
1. **Node.js**: Ensure you have Node.js installed to run the Discord bot on your server.
2. **npm** (Node Package Manager): This will help you install the required dependencies for your bot.
3. **TypeScript**: Since this is a 100% TypeScript project, make sure to install TypeScript globally or as a dev dependency:
```bash
npm install -g typescript
```
or
```bash
npm install --save-dev typescript
```

## 🚀 **Dependencies**:
- **[discord.js](https://discord.js.org/)**: The powerful JavaScript library to interact with Discord's API.
- **[axios](https://axios-http.com/)**: A promise-based HTTP client to make API requests from your bot.
- **[express](https://expressjs.com/)**: A minimal and flexible Node.js web application framework to create APIs or serve web pages.
- **[yaml](https://github.com/eemeli/yaml)**: A YAML parser and stringifier for JavaScript to work with YAML files.

## 🛠️ **Installation**:
if you're using **npm**:
```bash
npm install discord.js axios express yaml
```
or if you're using **pnpm**:
```bash
pnpm install discord.js axios express yaml
```
or if you're using **yarn**:
```bash
yarn add discord.js axios express yaml
```

## ⚙️ **Configuration (configs.yaml)**:
In the `configs.yaml` file, you can customize the bot’s behavior by changing secret keys and the server port.

## 🚀 **Running the Bot**:
To run the bot with **npm**:
```bash
npm start
```
To run the bot with **pnpm**:
```bash
pnpm start
```
To run the bot with **yarn**:
```bash
yarn start
```

---

## **Wyverion Discord** - A Luau-Powered Discord Client Module

**Wyverion Discord** is a revolutionary module designed for developers who wish to create and manage Discord clients using **Luau**, the lightweight scripting language used by Roblox. It simplifies the process of creating Discord bots and integrating them into your server environment, all while maintaining the power and flexibility you need to interact with Discord’s API. With **Wyverion Discord**, you can focus on writing simple and effective code in **Luau** to control your Discord bot without getting lost in the complexities of traditional JavaScript-based libraries.

## **JSONCloud** - A Cloud-Based JSON Management Solution

**JSONCloud** is a versatile tool that allows you to create, delete, write, and read **JSON** files outside of the Roblox environment. This service acts as a bridge for developers who want to work with JSON data on their own cloud infrastructure, making it easier to manage external data and interact with it in their projects. Whether you are building a game, web app, or other software, **JSONCloud** provides an easy way to store and manipulate your JSON data remotely, offering a seamless integration with your existing workflows.