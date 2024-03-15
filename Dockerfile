############################
# @author Elias De Hondt   #
# @see https://eliasdh.com #
# @since 01/03/2024        #
############################
FROM mcr.microsoft.com/dotnet/nightly/aspnet:7.0 AS base
LABEL author="Elias De Hondt <elias.dehondt@outlook.com>" version="1.0"
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://*:8080
EXPOSE 443

FROM mcr.microsoft.com/dotnet/nightly/sdk:7.0 AS build
LABEL author="Elias De Hondt <elias.dehondt@outlook.com>" version="1.0"
WORKDIR /src
COPY . .
# Install wget and apt-utils
RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq wget apt-utils
# Install nodejs, npm and nvm
RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.39.0/install.sh | bash
RUN . ~/.nvm/nvm.sh && nvm install 20.11.1
RUN . ~/.nvm/nvm.sh && node -v
RUN . ~/.nvm/nvm.sh && npm -v
# Change directory to the frontend app and build it
WORKDIR /src/MVC/ClientApp
RUN . ~/.nvm/nvm.sh && npm install && npm run build
# Change directory back to the root of the project and build the backend
WORKDIR /src/MVC
RUN dotnet build

FROM build AS publish
LABEL author="Elias De Hondt <elias.dehondt@outlook.com>" version="1.0"
WORKDIR /src/MVC
RUN dotnet publish "MVC.csproj" -c Release -o /app

FROM base AS final
LABEL author="Elias De Hondt <elias.dehondt@outlook.com>" version="1.0"
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "MVC.dll"]