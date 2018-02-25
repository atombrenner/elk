# ELK Test Stack

An ELK Stack based on [docker-compose](https://docs.docker.com/compose/)
to easily test Filebeat and Logstash configurations.
It uses the the official docker containers from [Elastic](https://www.docker.elastic.co/).

For convenience, security for Kibana is disabled.
No Login into Kibana is require.
Remember that this is a test environment intended for local machines.

## Usage

Clone this repository, specify the version in the .env file and fire it up
with `docker-compose up`. You can access Kibana via http://localhost:5601.
T

## ELK Version
Put the version you want to use in the `.env` file. Don't forget to remove
your data volume when switching between major versions, e.g.
`docker volume rm elk_esdata` because usually are not compatible.

- 5.6.7
- 6.2.1
