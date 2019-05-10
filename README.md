# InClass

![Preview](https://i.imgur.com/NTzSr6M.png)

## Requirements
- Ruby 2.6.0
- Rails 5.2.2
- Angular 7

## Setup
1. Install nodejs
    * Windows: [Download](https://nodejs.org/en)
    * macOS: `brew install node`
    * Linux: `apt install nodejs`

2. Install Angular 7: `npm install -g @angular/cli`

3. Install Ruby 2.6:
    * Windows: [Download](https://github.com/oneclick/rubyinstaller2/releases/download/RubyInstaller-2.6.0-1/rubyinstaller-devkit-2.6.0-1-x64.exe)
    * macOS/Linux:
        - You can install certain versions of ruby with [rvm](https://rvm.io/rvm/install).
        - `rvm install 2.6`
        - `rvm use 2.6`

4. Install postgres server:
    - Windows: [Download](https://www.postgresql.org/download/windows/)
    - macOS: `brew install postgres`
    - Linux: `apt install postgresql postgresql-contrib`

5. Configure the database in `config/database.yml`

6. Install dependencies:
    - `bundle install`
    - `npm install`

## Run
- Backend: `rails s`
- Frontend: `ng serve`

The site be be up at `localhost:4200`
