# TRACALORIE APP
An app that tracks meal and calorie content, written in pure Javascript, using the Javascript module pattern. MaterializeCSS is used for the UI, which requires jQuery and is the sole reason for its inclusion in the project. Tracalorie is a browser-based app that uses local storage to persist the data from session to session. The app permits items to be edited/updated based upon a changed state.

The controller schema for the app:
* Storage Controller
* Item Controller - ItemCtrl() IIFE
* UI Controller - UICtrl() IIFE
* Main App Controller - App(ItemCtrl, UICtrl) IIFE
