FROM node:12-alpine3.12 AS build-env
COPY . ./app

WORKDIR /app/src/frontend
RUN npm ci && npm run webpack && mkdir /app/out && cp -r /app/src/frontend/wwwroot /app/out/media

WORKDIR /app/src/vscode-trxviewer
RUN npm ci && npm run compile && npm run linux:install:out

WORKDIR /app/out
RUN npm run vsce

FROM node:12-alpine3.12

COPY --from=build-env /app/out/*.vsix /out/

ENTRYPOINT cp $(find /out/*.vsix) /extract
