FROM node:onbuild

RUN rm config.json
RUN ln -s /tmp/config/config.json
