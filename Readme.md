# Angular Solution

## Pre-requisites
### Set up Postges SQL
1.- Install Postgres SQL in your env https://www.postgresql.org/download/

2.- Install a Postgres SQL DB Manager https://www.pgadmin.org/download/

### Install dotnet on your CLI

- Install <code>dotnet</code> command:
https://learn.microsoft.com/en-us/dotnet/core/install/windows?tabs=net60

- Install <code>dotnet ef</code> command:
https://learn.microsoft.com/en-us/ef/core/cli/dotnet

### Install ng on your CLI
- Install <code>ng</code> command: https://angular.io/cli
<hr>

### Connect project to your postgres
1. Open the project on your favorite IDE editor:
    - https://visualstudio.microsoft.com/es/downloads/
    - https://code.visualstudio.com/
2. Locate <code>appsettings.json</code> file and open it.
3. Update the string named <code>PostgresSQLConnection</code> with your own connection settings.
    - >Host={host};Port={port};Database={database};User Id={user};Password={password};
4. Done

### Run Migrations
In order to create your db and tables we need to run the migrations. Run the commands below:

<code>dotnet build</code>

<code>dotnet ef database update</code>

>**Note**: if there are others migrations to syncronize just re-run the command above. 

<hr>

### Run project
If you are using **Visual Studio** as your IDE just click over play button on top, if not, you can run it with the following command:

<code>dotnet run</code>