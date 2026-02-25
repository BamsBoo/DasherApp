# 📦 DasherApp

**React Native Coding Challenge: "Dasher" Delivery App** — A simple delivery driver app built with React Native, showcasing order listing, order details, and active delivery management. ([github.com](https://github.com/BamsBoo/DasherApp.git))

---

## 🚀 Features

✔ View available delivery orders
✔ Tap an order to see full details
✔ Accept an order and start a delivery
✔ Active delivery screen with status progression
✔ Confirm pickup and complete delivery
✔ Global state managed (Zustand recommended)
✔ Clean, adaptive UI for mobile devices

---

## 📁 Project Structure

```
/android              — Android native project files
/ios                  — iOS native project files
/src
  /components         — Reusable UI components
  /screens            — App screens (Available, Details, Active)
  /services           — API / order handlers
  /store              — Global state (orders)
package.json          — Dependencies & scripts
App.jsx               — App entry & navigation
```

---

## 🛠️ Prerequisites

Make sure you have React Native set up on your machine:

- Node.js
- React Native CLI
- Android SDK / iOS Xcode tools

React Native environment setup guide: [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)

---

## 📥 Installation

Clone the repo:

```bash
git clone https://github.com/BamsBoo/DasherApp.git
cd DasherApp
```

Install dependencies:

```bash
npm install
# or
yarn
```

---

## 📱 Running the App

### 🟢 Start Metro

```bash
npm start
# or
yarn start
```

### 📱 Android

```bash
npm run android
# or
yarn android
```

### 🍏 iOS

```bash
cd ios
pod install
cd ..
npm run ios
# or
yarn ios
```

> Make sure CocoaPods is installed for iOS builds.

---

## 🎯 App Flow

1. **Available Orders Screen**
   Browse all pending orders.

2. **Order Details Screen**
   See order info, pickup & drop-off addresses, customer name, items, and total.

3. **Accept Order**
   Accept to begin delivery.

4. **Active Delivery Screen**
   Displays active order with a primary action to confirm pickup or complete delivery.

5. On completion, returns back to available orders.

---

## 🧠 State Management

This project uses a simple global store (Zustand recommended) to manage:

✔ List of available orders
✔ Current active delivery

Only one active delivery is allowed at a time.

---

## 📦 Dependencies

- React Native
- React Navigation
- Zustand or Context API (for global state)
- Other typical RN dependencies

_(Check `package.json` for full list.)_

---

## 🧪 Testing

Basic tests (if any) are located in:

```
__tests__/
```

Use Jest or your preferred test runner.

---

## 📌 Contribution

Contributions, improvements, and bug fixes are welcome!
Feel free to open issues or submit pull requests.

---

## 📜 License

This project is released under the **MIT License**.
