# Yoga App

The yoga app is an online platform where you can enrol for yoga classes for just rupees 500.

## Approach
- #### Fur user registration
    Users can log in to this app using Google, facebook or email. If the user is logged in for the first time then we will ask him his age and ensure that his age is between 18-65
- #### For Subscription
    Users can book a slot by buying a subscription. If a user wishes to change the slot he/she can do that but the change will be affected from the next cycle. But if a user wnat to change then slot of future subscription he/she can do for that subscription.
- #### For Payment
    Users can pay anytime.
- #### Cnacel
    They can also cancel their subscription.   

## Requirements

For development, you will only need Node.js and a node global package,NPM/Yarn, installed in your environment.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v16.13.2

    $ npm --version
    8.19.2

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

### Yarn installation

    This is optional you can use npm

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/AnkitNayan83/flexmoney-assignment
    $ cd flexmoney-assignment
    $ npm install

## Configure app

create a .env file and add your

- DATABASE Url;
- AUTH KEYS;

## Running the project

    $ npm run dev

