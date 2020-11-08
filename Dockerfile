FROM node:12-alpine3.12 AS build-env-fontend-node
COPY . ./app

WORKDIR /app/src/TrxViewer.FrontEnd

RUN npm ci && npm run copydependencies

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env-frontend-dotnet

COPY --from=build-env-fontend-node /app /app
WORKDIR /app/src/TrxViewer.FrontEnd

RUN dotnet publish -o /out

FROM node:12-alpine3.12 AS build-env-node

COPY . ./app
WORKDIR /app/src/vscode-trxviewer

RUN npm ci && npm run compile && npm run linux:install:out

COPY --from=build-env-frontend-dotnet /out /app/out/media

WORKDIR /app/out
RUN npm run vsce