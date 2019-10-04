FROM node:onbuild

RUN npm run build
RUN rm config.json
RUN ln -s /tmp/config/config.json
