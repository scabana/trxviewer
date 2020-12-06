FROM node:12-alpine3.12 AS build-env
COPY . ./app

WORKDIR /app/src/frontend
RUN npm ci && \
    npm run lint && \
    npm run webpack:prod && \
    mkdir /app/out && \
    cp -r /app/src/frontend/wwwroot /app/out/media && \
    ( (npm run test:unit && echo "0" >> /app/out/testExitCode) || echo "1" >> /app/out/testExitCode )

WORKDIR /app/src/vscode-trxviewer
RUN npm ci && \
    npm run lint && \
    npm run compile && \
    npm run linux:install:out

WORKDIR /app/out
RUN npm run vsce

FROM node:12-alpine3.12

COPY --from=build-env /app/out/*.vsix /app/out/testExitCode /app/out/testresults.xml /out/

ENTRYPOINT cp /out/* /extract
