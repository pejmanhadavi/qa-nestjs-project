FROM mhart/alpine-node:12
RUN mkdir -p code
WORKDIR /code
COPY . /code

RUN yarn install
RUN yarn build
CMD ["yarn" ,"start"]