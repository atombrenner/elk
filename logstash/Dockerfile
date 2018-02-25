ARG ELK_VERSION

FROM docker.elastic.co/logstash/logstash:${ELK_VERSION}

RUN bin/logstash-plugin install logstash-filter-truncate
